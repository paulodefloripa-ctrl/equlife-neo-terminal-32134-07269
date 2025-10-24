import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { getTranslation } from '@/lib/i18n';

const Settings = () => {
  const { language } = useLanguage();
  const t = getTranslation(language);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold font-mono mb-8">{t.navigation.settings}</h1>
        
        <div className="space-y-6">
          <Button>{t.settings.save}</Button>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
