import Layout from '@/components/Layout';
import { ExternalLink } from 'lucide-react';

const Agents = () => {
  const agents = [
    { name: 'Midjourney', url: 'https://www.midjourney.com', desc: 'AI image generation' },
    { name: 'Lovable', url: 'https://lovable.dev', desc: 'AI web development' },
    { name: 'OpenAI Chat', url: 'https://chat.openai.com', desc: 'ChatGPT assistant' },
    { name: 'Perplexity', url: 'https://www.perplexity.ai', desc: 'AI search engine' },
    { name: 'Grok / xAI', url: 'https://grok.x.ai', desc: 'X AI assistant' },
    { name: 'Gemini', url: 'https://gemini.google.com', desc: 'Google AI' },
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-4">
        <h2 className="text-2xl font-bold font-mono mb-6 text-foreground">AI Agents Library</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map(agent => (
            <a
              key={agent.name}
              href={agent.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 rounded-2xl border border-border bg-card hover:bg-muted/30 hover:border-primary/50 transition-all group"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-mono text-lg text-foreground">{agent.name}</h3>
                <ExternalLink size={16} className="text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <p className="text-sm text-muted-foreground">{agent.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Agents;
