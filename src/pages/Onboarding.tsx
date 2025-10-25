import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/hooks/useLanguage';
import { getTranslation } from '@/lib/i18n';

const Onboarding = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = getTranslation(language);
  
  const [formData, setFormData] = useState({
    objetivo_principal: '',
    objetivo_principal_otro: '',
    perfil_usuario: '',
    frecuencia_digital: '',
    experiencia_IA: '',
    areas_interes: '',
    areas_interes_otro: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store form data in localStorage or send to backend
    localStorage.setItem('eql-onboarding', JSON.stringify(formData));
    navigate('/console');
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="text-center mb-8">
          <Brain className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2 whitespace-pre-line">
            {t.onboarding.welcome.split('\n')[0]}
          </h1>
          <p className="text-muted-foreground">
            {t.onboarding.welcome.split('\n')[1]}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-card border border-border rounded-lg p-6">
          {/* Objetivo Principal */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              ✅ {t.onboarding.objetivo}
            </Label>
            <RadioGroup value={formData.objetivo_principal} onValueChange={(val) => updateField('objetivo_principal', val)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="productividad" id="obj1" />
                <Label htmlFor="obj1" className="font-normal cursor-pointer">{t.onboarding.objetivo_opciones[0]}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="automatizar" id="obj2" />
                <Label htmlFor="obj2" className="font-normal cursor-pointer">{t.onboarding.objetivo_opciones[1]}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="aprender" id="obj3" />
                <Label htmlFor="obj3" className="font-normal cursor-pointer">{t.onboarding.objetivo_opciones[2]}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="crear" id="obj4" />
                <Label htmlFor="obj4" className="font-normal cursor-pointer">{t.onboarding.objetivo_opciones[3]}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="otro" id="obj5" />
                <Label htmlFor="obj5" className="font-normal cursor-pointer">{t.onboarding.objetivo_opciones[4]}</Label>
              </div>
            </RadioGroup>
            {formData.objetivo_principal === 'otro' && (
              <Input
                placeholder="Especificá tu objetivo..."
                value={formData.objetivo_principal_otro}
                onChange={(e) => updateField('objetivo_principal_otro', e.target.value)}
                className="mt-2"
              />
            )}
          </div>

          {/* Perfil Usuario */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              ✅ {t.onboarding.situacion}
            </Label>
            <RadioGroup value={formData.perfil_usuario} onValueChange={(val) => updateField('perfil_usuario', val)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="estudiante" id="perfil1" />
                <Label htmlFor="perfil1" className="font-normal cursor-pointer">{t.onboarding.situacion_opciones[0]}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="emprendedor" id="perfil2" />
                <Label htmlFor="perfil2" className="font-normal cursor-pointer">{t.onboarding.situacion_opciones[1]}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="profesional" id="perfil3" />
                <Label htmlFor="perfil3" className="font-normal cursor-pointer">{t.onboarding.situacion_opciones[2]}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="empresa" id="perfil4" />
                <Label htmlFor="perfil4" className="font-normal cursor-pointer">{t.onboarding.situacion_opciones[3]}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="busqueda" id="perfil5" />
                <Label htmlFor="perfil5" className="font-normal cursor-pointer">{t.onboarding.situacion_opciones[4]}</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Frecuencia Digital */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              ✅ {t.onboarding.frecuencia}
            </Label>
            <RadioGroup value={formData.frecuencia_digital} onValueChange={(val) => updateField('frecuencia_digital', val)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="diario" id="freq1" />
                <Label htmlFor="freq1" className="font-normal cursor-pointer">{t.onboarding.frecuencia_opciones[0]}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="semanal" id="freq2" />
                <Label htmlFor="freq2" className="font-normal cursor-pointer">{t.onboarding.frecuencia_opciones[1]}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="raro" id="freq3" />
                <Label htmlFor="freq3" className="font-normal cursor-pointer">{t.onboarding.frecuencia_opciones[2]}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nunca" id="freq4" />
                <Label htmlFor="freq4" className="font-normal cursor-pointer">{t.onboarding.frecuencia_opciones[3]}</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Experiencia IA */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              ✅ {t.onboarding.experiencia}
            </Label>
            <RadioGroup value={formData.experiencia_IA} onValueChange={(val) => updateField('experiencia_IA', val)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="experto" id="exp1" />
                <Label htmlFor="exp1" className="font-normal cursor-pointer">{t.onboarding.experiencia_opciones[0]}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="intermedio" id="exp2" />
                <Label htmlFor="exp2" className="font-normal cursor-pointer">{t.onboarding.experiencia_opciones[1]}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="principiante" id="exp3" />
                <Label htmlFor="exp3" className="font-normal cursor-pointer">{t.onboarding.experiencia_opciones[2]}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nunca" id="exp4" />
                <Label htmlFor="exp4" className="font-normal cursor-pointer">{t.onboarding.experiencia_opciones[3]}</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Áreas de Interés */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              ✅ {t.onboarding.areas_interes}
            </Label>
            <RadioGroup value={formData.areas_interes} onValueChange={(val) => updateField('areas_interes', val)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="automatizacion" id="area1" />
                <Label htmlFor="area1" className="font-normal cursor-pointer">{t.onboarding.areas_interes_opciones[0]}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="marketing" id="area2" />
                <Label htmlFor="area2" className="font-normal cursor-pointer">{t.onboarding.areas_interes_opciones[1]}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="finanzas" id="area3" />
                <Label htmlFor="area3" className="font-normal cursor-pointer">{t.onboarding.areas_interes_opciones[2]}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="escritura" id="area4" />
                <Label htmlFor="area4" className="font-normal cursor-pointer">{t.onboarding.areas_interes_opciones[3]}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="educacion" id="area5" />
                <Label htmlFor="area5" className="font-normal cursor-pointer">{t.onboarding.areas_interes_opciones[4]}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="otro" id="area6" />
                <Label htmlFor="area6" className="font-normal cursor-pointer">{t.onboarding.areas_interes_opciones[5]}</Label>
              </div>
            </RadioGroup>
            {formData.areas_interes === 'otro' && (
              <Input
                placeholder="Especificá el área..."
                value={formData.areas_interes_otro}
                onChange={(e) => updateField('areas_interes_otro', e.target.value)}
                className="mt-2"
              />
            )}
          </div>

          <Button type="submit" size="lg" className="w-full">
            {t.onboarding.boton_activar}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default Onboarding;
