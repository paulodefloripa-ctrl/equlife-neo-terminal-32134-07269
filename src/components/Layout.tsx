import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/hooks/useLanguage';
import { getTranslation } from '@/lib/i18n';

const Layout = ({ children, menuDisabled = false }: { children: ReactNode; menuDisabled?: boolean }) => {
  const location = useLocation();
  const { language, changeLanguage } = useLanguage();
  const t = getTranslation(language);
  
  const tabs = [
    { path: '/console', label: t.navigation.console },
    { path: '/projects', label: t.navigation.projects },
    { path: '/agents', label: t.navigation.agents },
    { path: '/settings', label: t.navigation.settings },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold font-sans text-foreground hover:text-primary transition-colors">
            EQL
          </Link>
          
          <nav className="flex items-center gap-4">
            <div className="flex gap-1">
              {tabs.map(tab => (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={`px-4 py-2 rounded-lg font-mono text-sm transition-colors ${
                    menuDisabled
                      ? 'opacity-50 pointer-events-none text-muted-foreground'
                      : location.pathname === tab.path
                      ? 'bg-primary/20 text-foreground border border-border'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {tab.label}
                </Link>
              ))}
            </div>
            
            <LanguageSwitcher language={language} onLanguageChange={changeLanguage} />
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border py-2">
        <div className="max-w-6xl mx-auto px-4 text-center text-xs text-muted-foreground font-mono">
          {t.footer}
        </div>
      </footer>
    </div>
  );
};

export default Layout;
