import Layout from '@/components/Layout';
import ConsoleTerminal from '@/components/ConsoleTerminal';
import StatusBar from '@/components/StatusBar';
import QuickActionButtons from '@/components/QuickActionButtons';
import EnhancedInput from '@/components/EnhancedInput';
import { usePomodoro } from '@/hooks/usePomodoro';
import { useGPS } from '@/hooks/useGPS';
import { ConsoleCommand } from '@/lib/types';
import { listProjects } from '@/lib/projectsRepo';

const Console = () => {
  const { state: pomodoro, startFocus, startBreak, stop } = usePomodoro();
  const { gps, requestLocation } = useGPS();

  const addMessage = (type: 'agent' | 'system', content: string) => {
    if ((window as any).__addConsoleMessage) {
      (window as any).__addConsoleMessage(type, content);
    }
  };

  const commands: ConsoleCommand[] = [
    {
      command: 'help',
      description: 'Show available commands',
      handler: () => {
        const helpText = commands.map(c => `${c.command} - ${c.description}`).join('\n');
        return helpText;
      },
    },
    {
      command: 'time',
      description: 'Show current time',
      handler: () => {
        return new Date().toLocaleString('es-ES');
      },
    },
    {
      command: 'gps',
      description: 'Get GPS location',
      handler: () => {
        requestLocation();
        return 'Requesting GPS location...';
      },
    },
    {
      command: 'focus',
      description: 'Start focus timer (e.g., focus 25)',
      handler: (args) => {
        const minutes = parseInt(args || '25');
        startFocus(minutes);
        return `Focus timer started: ${minutes} minutes`;
      },
    },
    {
      command: 'break',
      description: 'Start break timer (e.g., break 5)',
      handler: (args) => {
        const minutes = parseInt(args || '5');
        startBreak(minutes);
        return `Break timer started: ${minutes} minutes`;
      },
    },
    {
      command: 'stop',
      description: 'Stop Pomodoro timer',
      handler: () => {
        stop();
        return 'Timer stopped';
      },
    },
    {
      command: 'projects',
      description: 'List all projects',
      handler: async () => {
        try {
          const projects = await listProjects();
          const list = projects.map(p => `- ${p.name} (${p.status}) - ${p.progress_percent || 0}%`).join('\n');
          return `Projects:\n${list}`;
        } catch (e: any) {
          return `Error: ${e.message}`;
        }
      },
    },
  ];

  const handleExecute = async (cmd: string, args?: string) => {
    const command = commands.find(c => c.command === cmd);
    if (command) {
      const result = await Promise.resolve(command.handler(args));
      addMessage('agent', result);
    } else {
      addMessage('system', `Unknown command: ${cmd}`);
    }
  };

  const handleEnhancedInput = (text: string, file?: File) => {
    if (file) {
      addMessage('system', `Archivo recibido: ${file.name}`);
    }
    if (text) {
      const [cmd, ...argsParts] = text.trim().split(' ');
      const args = argsParts.join(' ');
      handleExecute(cmd, args);
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-4 flex flex-col h-[calc(100vh-8rem)]">
        <div className="mb-2">
          <QuickActionButtons />
        </div>
        
        <div className="mb-4">
          <StatusBar pomodoro={pomodoro} gps={gps} />
        </div>
        
        <div className="flex-1 rounded-2xl border border-border overflow-hidden shadow-2xl bg-card flex flex-col">
          <ConsoleTerminal commands={commands} onExecute={handleExecute} />
        </div>

        <div className="mt-4">
          <EnhancedInput onSubmit={handleEnhancedInput} />
        </div>
      </div>
    </Layout>
  );
};

export default Console;
