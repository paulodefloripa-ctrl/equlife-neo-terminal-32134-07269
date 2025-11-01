import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Check, AlertCircle } from 'lucide-react';
import { IntegrationCard as IntegrationCardType } from '@/lib/types';

interface IntegrationHubProps {
  recommendedTools?: string[];
}

export const IntegrationHub = ({ recommendedTools = [] }: IntegrationHubProps) => {
  const integrations: IntegrationCardType[] = [
    {
      id: 'google-workspace',
      name: 'Google Workspace',
      icon: '📧',
      description: 'Connect Gmail, Drive, Calendar and more',
      status: 'not_connected',
      docs_url: 'https://developers.google.com/workspace',
    },
    {
      id: 'microsoft-365',
      name: 'Microsoft 365',
      icon: '🔵',
      description: 'Integrate Outlook, Teams, OneDrive',
      status: 'not_connected',
      docs_url: 'https://developer.microsoft.com/en-us/microsoft-365',
    },
    {
      id: 'slack',
      name: 'Slack',
      icon: '💬',
      description: 'Connect your Slack workspace',
      status: 'not_connected',
      docs_url: 'https://api.slack.com',
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      icon: '🎯',
      description: 'Sync CRM data and contacts',
      status: 'not_connected',
      docs_url: 'https://developers.hubspot.com',
    },
    {
      id: 'notion',
      name: 'Notion',
      icon: '📝',
      description: 'Connect your Notion workspace',
      status: 'not_connected',
      docs_url: 'https://developers.notion.com',
    },
    {
      id: 'trello',
      name: 'Trello',
      icon: '📋',
      description: 'Sync boards and cards',
      status: 'not_connected',
      docs_url: 'https://developer.atlassian.com/cloud/trello',
    },
    {
      id: 'asana',
      name: 'Asana',
      icon: '✅',
      description: 'Connect tasks and projects',
      status: 'not_connected',
      docs_url: 'https://developers.asana.com',
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: '🐙',
      description: 'Integrate repositories and issues',
      status: 'not_connected',
      docs_url: 'https://docs.github.com/en/developers',
    },
  ];

  const isRecommended = (tool: IntegrationCardType) => {
    return recommendedTools.some(rec => 
      tool.name.toLowerCase().includes(rec.toLowerCase()) ||
      rec.toLowerCase().includes(tool.name.toLowerCase())
    );
  };

  const sortedIntegrations = [...integrations].sort((a, b) => {
    const aRec = isRecommended(a);
    const bRec = isRecommended(b);
    if (aRec && !bRec) return -1;
    if (!aRec && bRec) return 1;
    return 0;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-mono mb-2">Integration Hub</h2>
        <p className="text-muted-foreground">
          Connect your favorite tools to EQL Commander
        </p>
      </div>

      {recommendedTools.length > 0 && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Recommended Integrations</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Based on your onboarding profile, we've highlighted these integrations for you
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedIntegrations.map((integration) => (
          <Card 
            key={integration.id}
            className={isRecommended(integration) ? 'border-primary shadow-lg' : ''}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{integration.icon}</span>
                  <div>
                    <CardTitle className="text-lg">{integration.name}</CardTitle>
                    {isRecommended(integration) && (
                      <Badge variant="default" className="mt-1">Recommended</Badge>
                    )}
                  </div>
                </div>
                {integration.status === 'connected' && (
                  <Check className="h-5 w-5 text-green-500" />
                )}
              </div>
              <CardDescription>{integration.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button 
                variant={integration.status === 'connected' ? 'outline' : 'default'}
                className="w-full"
                disabled
              >
                {integration.status === 'connected' ? 'Connected' : 'Connect'}
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full"
                asChild
              >
                <a 
                  href={integration.docs_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1"
                >
                  Documentation
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-muted/50 border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-2">Coming Soon</h3>
        <p className="text-sm text-muted-foreground">
          OAuth 2.0 integration flows are currently in development. You'll be able to securely
          connect these services without sharing passwords. Check back soon!
        </p>
      </div>
    </div>
  );
};
