import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { useFRE } from '@/hooks/useFRE';
import { getTranslation } from '@/lib/i18n';
import { useTypingEffect } from '@/hooks/useTypingEffect';

type Phase = 'waiting' | 'welcome' | 'choice' | 'questions' | 'complete';

export const FRETerminal = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { saveAnswer, nextStep, skipOnboarding, startOnboarding, setPivotExit, completeOnboarding, freState } = useFRE();
  const t = getTranslation(language).fre;
  
  const [phase, setPhase] = useState<Phase>('waiting');
  const [messages, setMessages] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [userInput, setUserInput] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [waitingForInput, setWaitingForInput] = useState(false);
  const [showOtherInput, setShowOtherInput] = useState(false);
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { displayedText, isTyping } = useTypingEffect(currentMessage, 20);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [messages, displayedText]);

  // Focus input when waiting
  useEffect(() => {
    if (waitingForInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [waitingForInput]);

  // Phase: Waiting (5 seconds cursor)
  useEffect(() => {
    if (phase === 'waiting') {
      const timer = setTimeout(() => {
        setPhase('welcome');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Phase: Welcome sequence
  useEffect(() => {
    if (phase === 'welcome') {
      const welcomeSequence = [
        { text: `[AI Console]: ${t.loading}`, delay: 0 },
        { text: `[AI Console]: ${t.protocol}`, delay: 800 },
        { text: `[AI Console]: ${t.welcome_line1}`, delay: 1800 },
        { text: `[AI Console]: ${t.welcome_line2}`, delay: 3000 },
        { text: `[AI Console]: ${t.welcome_line3}`, delay: 4500 },
        { text: `[AI Console]: ${t.choice_prompt}`, delay: 7000 },
        { text: `[AI Console]: ${t.choice_a}`, delay: 7500 },
        { text: `[AI Console]: ${t.choice_b}`, delay: 8000 },
      ];

      welcomeSequence.forEach(({ text, delay }) => {
        setTimeout(() => {
          setMessages(prev => [...prev, text]);
        }, delay);
      });

      setTimeout(() => {
        setPhase('choice');
        setWaitingForInput(true);
      }, 8500);
    }
  }, [phase, t]);

  const handleChoice = (choice: string) => {
    const normalizedChoice = choice.toUpperCase().trim();
    
    setMessages(prev => [...prev, `> ${choice}`]);
    setWaitingForInput(false);
    setUserInput('');

    if (normalizedChoice === 'B') {
      // Skip path
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          `[AI Console]: ${t.skip_response}`,
          `[AI Console]: ${t.skip_note}`,
          `[AI Console]: ${t.how_can_help}`,
        ]);
        skipOnboarding();
      }, 500);
    } else if (normalizedChoice === 'A') {
      // Configure path
      setTimeout(() => {
        setMessages(prev => [...prev, `[AI Console]: ${t.configure_response}`]);
        startOnboarding();
        setPhase('questions');
        setQuestionIndex(0);
      }, 500);
      
      setTimeout(() => {
        askQuestion(0);
      }, 1500);
    } else {
      setTimeout(() => {
        setMessages(prev => [...prev, `[AI Console]: ${t.invalid_option}`]);
        setWaitingForInput(true);
      }, 500);
    }
  };

  const askQuestion = (index: number) => {
    const questions = [
      { text: t.q1_nombre, field: 'nombre', type: 'text' },
      { text: t.q2_edad, field: 'rango_edad', type: 'options', options: t.q2_opciones },
      { text: t.q3_ciudad, field: 'ciudad', type: 'text' },
      { text: t.q4_rol, field: 'rol_principal', type: 'options', options: t.q4_opciones },
      { text: t.q5_equipo, field: 'tamano_equipo', type: 'options', options: t.q5_opciones },
      { text: t.q6_pivot, field: 'objetivo_inmediato', type: 'options', options: t.q6_opciones, pivot: true },
      { text: t.q7_desafio, field: 'desafio_mayor', type: 'options', options: t.q7_opciones },
      { text: t.q8_nivel, field: 'nivel_tecnico', type: 'options', options: t.q8_opciones },
      { text: t.q9_herramientas, field: 'herramientas_vitales', type: 'text' },
    ];

    if (index >= questions.length) {
      completeFlow();
      return;
    }

    const question = questions[index];
    setMessages(prev => [...prev, `[AI Console]: ${question.text}`]);
    
    if (question.type === 'options' && question.options) {
      setTimeout(() => {
        question.options?.forEach((opt: string) => {
          setMessages(prev => [...prev, `[AI Console]: ${opt}`]);
        });
        setWaitingForInput(true);
      }, 500);
    } else {
      setTimeout(() => {
        setWaitingForInput(true);
      }, 500);
    }
  };

  const handleQuestionAnswer = (answer: string) => {
    const questions = [
      { field: 'nombre', type: 'text' },
      { field: 'rango_edad', type: 'options', map: { A: '18-25', B: '26-35', C: '36-45', D: '46-55', E: '56+' } },
      { field: 'ciudad', type: 'text' },
      { field: 'rol_principal', type: 'options', map: { A: 'Fundador', B: 'Manager', C: 'Desarrollador', D: 'Agencia', E: 'Personal' } },
      { field: 'tamano_equipo', type: 'options', map: { A: 'Solo yo', B: '2-10', C: '11-50', D: '51+' } },
      { field: 'objetivo_inmediato', type: 'options', map: { A: 'Proyecto AHORA', B: 'Integrar herramientas', C: 'Explorar IA', D: 'Explorando' }, pivot: true },
      { field: 'desafio_mayor', type: 'options', map: { A: 'Complejidad', B: 'Integración', C: 'Costo', D: 'Tiempo' } },
      { field: 'nivel_tecnico', type: 'options', map: { A: 'Experto/Código', B: 'Power-User/No-Code', C: 'Estratégico' } },
      { field: 'herramientas_vitales', type: 'text' },
    ];

    const currentQ = questions[questionIndex];
    setMessages(prev => [...prev, `> ${answer}`]);
    setWaitingForInput(false);
    setUserInput('');

    let value = answer;
    if (currentQ.type === 'options' && currentQ.map) {
      const key = answer.toUpperCase().trim();
      value = (currentQ.map as any)[key] || answer;
      
      if (!(key in currentQ.map)) {
        setTimeout(() => {
          setMessages(prev => [...prev, `[AI Console]: ${t.invalid_option}`]);
          setWaitingForInput(true);
        }, 500);
        return;
      }
    }

    saveAnswer(currentQ.field as any, value);

    // Q6 Pivot Logic
    if (currentQ.pivot && answer.toUpperCase().trim() === 'A') {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          `[AI Console]: ${t.pivot_exit}`,
          `[AI Console]: ${t.pivot_note}`,
        ]);
        setPivotExit();
      }, 500);
      
      setTimeout(() => {
        navigate('/projects');
      }, 2500);
      return;
    }

    // Continue to next question
    const nextIndex = questionIndex + 1;
    setQuestionIndex(nextIndex);
    nextStep();
    
    setTimeout(() => {
      askQuestion(nextIndex);
    }, 800);
  };

  const completeFlow = () => {
    const nombre = freState.profile?.nombre || 'User';
    const tools = freState.profile?.tools_detected?.join(', ') || 'your tools';
    
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        `[AI Console]: ${t.q10_completion.replace('{nombre}', nombre)}`,
        `[AI Console]: ${t.profile_created}`,
        `[AI Console]: ${t.tools_detected.replace('{tools}', tools)}`,
        `[AI Console]: ${t.modules_enabled}`,
        `[AI Console]: ${t.how_can_help}`,
      ]);
      
      completeOnboarding();
      setPhase('complete');
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    if (phase === 'choice') {
      handleChoice(userInput);
    } else if (phase === 'questions') {
      handleQuestionAnswer(userInput);
    }
  };

  return (
    <div className="h-[calc(100vh-200px)] bg-background border border-border rounded-lg overflow-hidden flex flex-col">
      <div className="bg-secondary/20 px-4 py-2 border-b border-border">
        <p className="text-xs font-mono text-muted-foreground">EQuityLabs Nano Console v1.0</p>
      </div>
      
      <div 
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-sm"
      >
        {phase === 'waiting' && (
          <div className="flex items-center gap-1">
            <span className="text-primary">&gt;</span>
            <span className="animate-pulse text-primary">▌</span>
          </div>
        )}
        
        {phase !== 'waiting' && messages.map((msg, i) => (
          <div key={i} className="mb-2">
            <span className={msg.startsWith('>') ? 'text-primary' : 'text-foreground'}>
              {msg}
            </span>
          </div>
        ))}
        
        {!isTyping && !waitingForInput && phase !== 'waiting' && phase !== 'complete' && (
          <div className="flex items-center gap-1 mt-2">
            <span className="text-primary">&gt;</span>
            <span className="animate-pulse text-primary">▌</span>
          </div>
        )}
      </div>
      
      {waitingForInput && (
        <form onSubmit={handleSubmit} className="border-t border-border p-4 flex gap-2">
          <span className="text-primary font-mono">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="flex-1 bg-transparent outline-none font-mono text-sm text-foreground"
            placeholder={t.enter_text}
            autoFocus
          />
        </form>
      )}
    </div>
  );
};
