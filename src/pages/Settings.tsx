import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { useSettings } from '@/hooks/useSettings';
import { Save, AlertCircle } from 'lucide-react';

const Settings = () => {
  const { settings, saveSettings } = useSettings();
  const [form, setForm] = useState(settings);
  
  useEffect(() => {
    setForm(settings);
  }, [settings]);

  const handleSave = () => {
    saveSettings(form);
    alert('Settings saved!');
  };

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
  const useMock = import.meta.env.VITE_USE_MOCK === 'true';

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-4">
        <h2 className="text-2xl font-bold font-mono mb-6 text-foreground">Settings</h2>

        <div className="space-y-6">
          <button
            onClick={handleSave}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary/20 hover:bg-primary/30 border border-border rounded-lg font-mono transition-colors"
          >
            <Save size={16} />
            Save Settings
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
