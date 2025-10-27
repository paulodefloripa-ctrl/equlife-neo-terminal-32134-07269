import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import { useLanguage } from '@/hooks/useLanguage';
import { getTranslation } from '@/lib/i18n';
import { Input } from '@/components/ui/input';

type Phase = 'waiting' | 'intro' | 'questions' | 'complete';

interface FormData {
  objetivo_principal: string;
  objetivo_principal_otro: string;
  perfil_usuario: string;
  frecuencia_digital: string;
  experiencia_IA: string;
  areas_interes: string;
  areas_interes_otro: string;
}

const NeoOnboardingTerminal = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = getTranslation(language);
  const terminalRef = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState<Phase>('waiting');
  const [currentIntroIndex, setCurrentIntroIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [showOtroInput, setShowOtroInput] = useState(false);
  const [otroInputValue, setOtroInputValue] = useState('');
  
  const [formData, setFormData] = useState<FormData>({
    objetivo_principal: '',
    objetivo_principal_otro: '',
    perfil_usuario: '',
    frecuencia_digital: '',
    experiencia_IA: '',
    areas_interes: '',
    areas_interes_otro: '',
  });

  const [messages, setMessages] = useState<Array<{ text: string; isTyping: boolean }>>([]);

  // Intro messages
  const introMessages = [
    t.onboarding.welcome.split('\n')[0].replace('🧠 ', ''),
    t.onboarding.neo_intro_1,
    t.onboarding.neo_intro_2,
    t.onboarding.neo_intro_3,
  ];

  // Questions data
  const questions = [
    {
      key: 'objetivo_principal',
      text: t.onboarding.objetivo,
      options: t.onboarding.objetivo_opciones,
      hasOtro: true,
    },
    {
      key: 'perfil_usuario',
      text: t.onboarding.situacion,
      options: t.onboarding.situacion_opciones,
      hasOtro: false,
    },
    {
      key: 'frecuencia_digital',
      text: t.onboarding.frecuencia,
      options: t.onboarding.frecuencia_opciones,
      hasOtro: false,
    },
    {
      key: 'experiencia_IA',
      text: t.onboarding.experiencia,
      options: t.onboarding.experiencia_opciones,
      hasOtro: false,
    },
    {
      key: 'areas_interes',
      text: t.onboarding.areas_interes,
      options: t.onboarding.areas_interes_opciones,
      hasOtro: true,
    },
  ];

  const currentMessage = messages[messages.length - 1];
  const { displayedText, isTyping } = useTypingEffect(
    currentMessage?.isTyping ? currentMessage.text : '',
    50,
    () => {
      if (phase === 'intro') {
        setTimeout(() => {
          if (currentIntroIndex < introMessages.length - 1) {
            setCurrentIntroIndex(prev => prev + 1);
          } else {
            setPhase('questions');
            setShowOptions(false);
          }
        }, currentIntroIndex === 0 ? 1500 : currentIntroIndex === 1 ? 2000 : 1000);
      } else if (phase === 'questions') {
        setTimeout(() => {
          setShowOptions(true);
        }, 300);
      } else if (phase === 'complete') {
        setTimeout(() => {
          localStorage.setItem('eql-onboarding', JSON.stringify(formData));
          navigate('/console');
        }, 2000);
      }
    }
  );

  // Phase 1: Initial wait with cursor
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('intro');
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Phase 2: Intro sequence
  useEffect(() => {
    if (phase === 'intro') {
      setMessages(prev => [...prev, { text: introMessages[currentIntroIndex], isTyping: true }]);
    }
  }, [phase, currentIntroIndex]);

  // Phase 3: Questions
  useEffect(() => {
    if (phase === 'questions' && currentQuestionIndex < questions.length) {
      const question = questions[currentQuestionIndex];
      setMessages(prev => [...prev, { text: `✅ ${question.text}`, isTyping: true }]);
    }
  }, [phase, currentQuestionIndex]);

  // Auto-scroll
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [messages, displayedText, showOptions]);

  const handleOptionSelect = (value: string, isOtro: boolean) => {
    const question = questions[currentQuestionIndex];
    
    if (isOtro) {
      setShowOtroInput(true);
      setFormData(prev => ({ ...prev, [question.key]: 'otro' }));
    } else {
      setFormData(prev => ({ ...prev, [question.key]: value }));
      setShowOptions(false);
      setShowOtroInput(false);
      
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
        } else {
          setPhase('complete');
          setMessages(prev => [...prev, { text: t.onboarding.completion, isTyping: true }]);
        }
      }, 500);
    }
  };

  const handleOtroSubmit = () => {
    const question = questions[currentQuestionIndex];
    setFormData(prev => ({ 
      ...prev, 
      [`${question.key}_otro`]: otroInputValue 
    }));
    setShowOptions(false);
    setShowOtroInput(false);
    setOtroInputValue('');
    
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setPhase('complete');
        setMessages(prev => [...prev, { text: t.onboarding.completion, isTyping: true }]);
      }
    }, 500);
  };

  return (
    <div className="neo-terminal min-h-screen" ref={terminalRef}>
      <div className="neo-terminal-content">
        {/* Phase 1: Waiting - just cursor */}
        {phase === 'waiting' && (
          <span className="neo-cursor"></span>
        )}

        {/* Phase 2 & 3: Messages */}
        {phase !== 'waiting' && messages.map((msg, idx) => (
          <div key={idx} className="neo-line">
            {idx === messages.length - 1 && msg.isTyping ? (
              <>
                {displayedText}
                {isTyping && <span className="neo-cursor"></span>}
              </>
            ) : (
              msg.text
            )}
          </div>
        ))}

        {/* Options display */}
        {showOptions && phase === 'questions' && currentQuestionIndex < questions.length && (
          <div className="neo-options">
            {questions[currentQuestionIndex].options.map((option, idx) => {
              const isOtro = idx === questions[currentQuestionIndex].options.length - 1 && 
                            questions[currentQuestionIndex].hasOtro;
              return (
                <div
                  key={idx}
                  className="neo-option"
                  onClick={() => handleOptionSelect(
                    isOtro ? 'otro' : ['productividad', 'automatizar', 'aprender', 'crear', 'otro'][idx] || 
                    ['estudiante', 'emprendedor', 'profesional', 'empresa', 'busqueda'][idx] ||
                    ['diario', 'semanal', 'raro', 'nunca'][idx] ||
                    ['experto', 'intermedio', 'principiante', 'nunca'][idx] ||
                    ['automatizacion', 'marketing', 'finanzas', 'escritura', 'educacion', 'otro'][idx],
                    isOtro
                  )}
                >
                  ○ {option}
                </div>
              );
            })}
          </div>
        )}

        {/* Otro input */}
        {showOtroInput && (
          <div className="neo-otro-input">
            <Input
              value={otroInputValue}
              onChange={(e) => setOtroInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && otroInputValue.trim()) {
                  handleOtroSubmit();
                }
              }}
              placeholder=">"
              className="bg-transparent border-primary text-primary font-mono"
              autoFocus
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NeoOnboardingTerminal;
