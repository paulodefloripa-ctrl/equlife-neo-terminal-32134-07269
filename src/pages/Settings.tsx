import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IntegrationHub } from '@/components/IntegrationHub';
import { useFRE } from '@/hooks/useFRE';
import { useLanguage } from '@/hooks/useLanguage';
import { getTranslation } from '@/lib/i18n';

const Settings = () => {
  const { language } = useLanguage();
  const { profile } = useFRE();
  const t = getTranslation(language);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold font-mono mb-8">{t.navigation.settings}</h1>
        
        <Tabs defaultValue="integrations" className="w-full">
          <TabsList>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="integrations" className="mt-6">
            <IntegrationHub recommendedTools={profile?.tools_detected || []} />
          </TabsContent>
          
          <TabsContent value="profile" className="mt-6">
            <div className="bg-muted/50 border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-4">Client Profile</h3>
              {profile ? (
                <div className="space-y-2 text-sm">
                  <p><strong>Name:</strong> {profile.nombre}</p>
                  <p><strong>Age:</strong> {profile.rango_edad}</p>
                  <p><strong>City:</strong> {profile.ciudad}</p>
                  <p><strong>Role:</strong> {profile.rol_principal}</p>
                  <p><strong>Team:</strong> {profile.tamano_equipo}</p>
                </div>
              ) : (
                <p className="text-muted-foreground">No profile data available</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
