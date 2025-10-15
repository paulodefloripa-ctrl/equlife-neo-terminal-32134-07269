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
          <div className="p-6 rounded-2xl border border-border bg-card">
            <h3 className="font-mono text-lg mb-4 text-foreground">Console Background</h3>
            <label className="block text-sm font-mono mb-2 text-foreground">Image URL</label>
            <input
              type="text"
              value={form.backgroundImageUrl}
              onChange={e => setForm({ ...form, backgroundImageUrl: e.target.value })}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 bg-muted/50 border border-border rounded-lg text-foreground outline-none focus:border-primary"
            />
            <p className="text-xs text-muted-foreground mt-2 font-mono">
              This image will be shown as a semi-transparent background in the console.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card">
            <h3 className="font-mono text-lg mb-4 text-foreground">Stripe Checkout Links</h3>
            <p className="text-sm text-muted-foreground mb-4">
              These links will be displayed as buttons in the console and projects page. No actual integration.
            </p>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-mono mb-2 text-foreground">Starter Plan</label>
                <input
                  type="text"
                  value={form.stripeLinks.starter}
                  onChange={e => setForm({ ...form, stripeLinks: { ...form.stripeLinks, starter: e.target.value } })}
                  placeholder="https://buy.stripe.com/..."
                  className="w-full px-4 py-2 bg-muted/50 border border-border rounded-lg text-foreground outline-none focus:border-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-mono mb-2 text-foreground">Pro Plan</label>
                <input
                  type="text"
                  value={form.stripeLinks.pro}
                  onChange={e => setForm({ ...form, stripeLinks: { ...form.stripeLinks, pro: e.target.value } })}
                  placeholder="https://buy.stripe.com/..."
                  className="w-full px-4 py-2 bg-muted/50 border border-border rounded-lg text-foreground outline-none focus:border-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-mono mb-2 text-foreground">Enterprise Plan</label>
                <input
                  type="text"
                  value={form.stripeLinks.enterprise}
                  onChange={e => setForm({ ...form, stripeLinks: { ...form.stripeLinks, enterprise: e.target.value } })}
                  placeholder="https://buy.stripe.com/..."
                  className="w-full px-4 py-2 bg-muted/50 border border-border rounded-lg text-foreground outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card">
            <h3 className="font-mono text-lg mb-4 text-foreground">Supabase Configuration</h3>
            
            <div className="space-y-3 font-mono text-sm">
              <div>
                <span className="text-muted-foreground">URL: </span>
                <span className="text-accent">{supabaseUrl || 'Not configured'}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Anon Key: </span>
                <span className="text-accent">{supabaseKey ? '••••••••' : 'Not configured'}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Mode: </span>
                <span className={useMock ? 'text-yellow-400' : 'text-accent'}>
                  {useMock ? 'MOCK (Local)' : 'LIVE (Supabase)'}
                </span>
              </div>
            </div>

            {useMock && (
              <div className="mt-4 flex items-start gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <AlertCircle size={16} className="text-yellow-400 mt-0.5" />
                <p className="text-xs text-yellow-400 font-mono">
                  Currently using MOCK mode. To switch to Supabase, set VITE_USE_MOCK=false in .env and restart dev server.
                </p>
              </div>
            )}
          </div>

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
