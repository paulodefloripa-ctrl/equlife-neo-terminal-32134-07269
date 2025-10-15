import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import { useTheme } from '@/hooks/useTheme';

const Layout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { theme, changeTheme } = useTheme();
  
  const tabs = [
    { path: '/console', label: 'Console' },
    { path: '/projects', label: 'Projects' },
    { path: '/agents', label: 'Agents' },
    { path: '/settings', label: 'Settings' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold font-mono text-foreground hover:text-primary transition-colors">
            EquityLabs
          </Link>
          
          <nav className="flex items-center gap-4">
            <div className="flex gap-1">
              {tabs.map(tab => (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={`px-4 py-2 rounded-lg font-mono text-sm transition-colors ${
                    location.pathname === tab.path
                      ? 'bg-primary/20 text-foreground border border-border'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {tab.label}
                </Link>
              ))}
            </div>
            
            <ThemeSwitcher theme={theme} onThemeChange={changeTheme} />
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border py-2">
        <div className="max-w-6xl mx-auto px-4 text-center text-xs text-muted-foreground font-mono">
          EquityLabs Nano Console v1.0
        </div>
      </footer>
    </div>
  );
};

export default Layout;
