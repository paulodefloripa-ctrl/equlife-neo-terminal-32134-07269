import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Project } from '@/lib/types';
import { listProjects, createProject, updateProject } from '@/lib/projectsRepo';
import { Plus, RefreshCw } from 'lucide-react';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

const projectSchema = z.object({
  name: z.string().trim().min(1, 'Project name is required').max(100, 'Project name must be less than 100 characters'),
  agent: z.string().trim().min(1, 'Agent is required').max(50, 'Agent name must be less than 50 characters'),
});

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<Project['status'] | 'ALL'>('ALL');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', agent: 'Neo' });
  const { toast } = useToast();

  useEffect(() => {
    loadProjects();
    initializeExampleProjects();
  }, []);

  const initializeExampleProjects = async () => {
    try {
      const existingProjects = await listProjects();
      if (existingProjects.length === 0) {
        // Add 3 example projects
        const examples = [
          {
            name: 'Organización Tareas Domésticas',
            agent: 'Neo',
            status: 'EN_CURSO' as const,
            progress_percent: 30,
            capital_invested: 0,
            time_estimated_days: 7,
          },
          {
            name: 'Proyecto Creativo: App Musical',
            agent: 'Neo',
            status: 'EN_CURSO' as const,
            progress_percent: 15,
            capital_invested: 2500,
            time_estimated_days: 45,
          },
          {
            name: 'Startup: Plataforma E-learning',
            agent: 'Neo',
            status: 'EN_CURSO' as const,
            progress_percent: 60,
            capital_invested: 15000,
            time_estimated_days: 90,
          },
        ];

        for (const example of examples) {
          await createProject(example);
        }
        
        loadProjects();
      }
    } catch (e: any) {
      console.error('Failed to initialize example projects:', e);
    }
  };

  const loadProjects = async () => {
    try {
      const data = await listProjects();
      setProjects(data);
    } catch (e: any) {
      console.error('Failed to load projects:', e);
    }
  };

  const handleCreate = async () => {
    // Validate input
    const result = projectSchema.safeParse(newProject);
    if (!result.success) {
      const firstError = result.error.errors[0];
      toast({
        title: 'Validation Error',
        description: firstError.message,
        variant: 'destructive',
      });
      return;
    }

    try {
      await createProject({
        name: result.data.name,
        agent: result.data.agent,
        status: 'EN_CURSO',
        progress_percent: 0,
      });
      setShowModal(false);
      setNewProject({ name: '', agent: 'Neo' });
      loadProjects();
    } catch (e: any) {
      console.error('Failed to create project:', e);
      toast({
        title: 'Error',
        description: 'Failed to create project',
        variant: 'destructive',
      });
    }
  };

  const cycleStatus = async (project: Project) => {
    const statusCycle: Project['status'][] = ['EN_CURSO', 'PAUSADO', 'COMPLETADO'];
    const currentIndex = statusCycle.indexOf(project.status);
    const nextStatus = statusCycle[(currentIndex + 1) % statusCycle.length];
    
    try {
      await updateProject(project.id, { status: nextStatus });
      loadProjects();
    } catch (e: any) {
      console.error('Failed to update status:', e);
    }
  };

  const filtered = projects
    .filter(p => filter === 'ALL' || p.status === filter)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-mono text-foreground">Projects</h2>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 border border-border rounded-lg font-mono text-sm transition-colors"
          >
            <Plus size={16} />
            New
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name..."
            className="flex-1 px-4 py-2 bg-muted/50 border border-border rounded-lg text-foreground outline-none focus:border-primary transition-colors"
          />
          
          <div className="flex gap-2">
            {['ALL', 'EN_CURSO', 'PAUSADO', 'COMPLETADO'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status as any)}
                className={`px-4 py-2 rounded-lg font-mono text-sm transition-colors ${
                  filter === status
                    ? 'bg-primary/20 text-foreground border border-border'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border overflow-hidden bg-card">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr className="text-left font-mono text-sm text-foreground">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Agent</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Progress</th>
                <th className="px-4 py-3">Capital</th>
                <th className="px-4 py-3">Days</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="font-mono text-sm">
              {filtered.map(project => (
                <tr key={project.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-foreground">{project.name}</td>
                  <td className="px-4 py-3 text-accent">{project.agent || '-'}</td>
                  <td className="px-4 py-3 text-foreground">{project.status}</td>
                  <td className="px-4 py-3 text-foreground">{project.progress_percent || 0}%</td>
                  <td className="px-4 py-3 text-foreground">{project.capital_invested || 0}</td>
                  <td className="px-4 py-3 text-foreground">{project.time_estimated_days || '-'}</td>
                  <td className="px-4 py-3 text-muted-foreground">{new Date(project.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => cycleStatus(project)}
                      className="p-2 hover:bg-muted rounded transition-colors"
                      title="Cycle status"
                    >
                      <RefreshCw size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl">
              <h3 className="text-xl font-mono mb-4 text-foreground">New Project</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-mono mb-2 text-foreground">Name</label>
                  <input
                    type="text"
                    value={newProject.name}
                    onChange={e => setNewProject({ ...newProject, name: e.target.value })}
                    className="w-full px-4 py-2 bg-muted/50 border border-border rounded-lg text-foreground outline-none focus:border-primary transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-mono mb-2 text-foreground">Agent</label>
                  <input
                    type="text"
                    value={newProject.agent}
                    onChange={e => setNewProject({ ...newProject, agent: e.target.value })}
                    className="w-full px-4 py-2 bg-muted/50 border border-border rounded-lg text-foreground outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg font-mono transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  className="flex-1 px-4 py-2 bg-primary/20 hover:bg-primary/30 border border-border rounded-lg font-mono transition-colors"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Projects;
