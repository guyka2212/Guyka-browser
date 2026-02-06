
import React, { useState, useCallback, useMemo } from 'react';
import { Layout } from './components/Layout.tsx';
import { BrowserTabManager } from './components/BrowserTabManager.tsx';
import { AddressBar } from './components/AddressBar.tsx';
import { BrowserHome } from './components/BrowserHome.tsx';
import { SearchView } from './components/SearchView.tsx';
import { GuykaSiteView } from './components/GuykaSiteView.tsx';
import { DashboardView } from './components/DashboardView.tsx';
import { SettingsView } from './components/SettingsView.tsx';
import { PublishDialog } from './components/PublishDialog.tsx';
import { ViewType, BrowserTab, GuykaSite, Language, UserProfile } from './types.ts';
import { INITIAL_SITES, TRANSLATIONS } from './constants.tsx';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('he');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [tabs, setTabs] = useState<BrowserTab[]>([
    { id: '1', title: 'בית', url: 'guyka://home', type: ViewType.HOME }
  ]);
  const [activeTabId, setActiveTabId] = useState('1');
  const [registry, setRegistry] = useState<GuykaSite[]>(INITIAL_SITES);
  const [isPublishing, setIsPublishing] = useState(false);
  
  const activeTab = useMemo(() => {
    return tabs.find(t => t.id === activeTabId) || tabs[0];
  }, [tabs, activeTabId]);

  const t = TRANSLATIONS[lang];

  const updateTab = useCallback((id: string, updates: Partial<BrowserTab>) => {
    setTabs(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  }, []);

  const handleNavigate = useCallback((newUrl: string) => {
    if (!newUrl) return;
    const normalizedUrl = newUrl.trim().toLowerCase();

    if (normalizedUrl.startsWith('guyka://')) {
      if (normalizedUrl === 'guyka://home') {
        updateTab(activeTabId, { url: 'guyka://home', title: t.home, type: ViewType.HOME });
      } else if (normalizedUrl === 'guyka://dashboard') {
        updateTab(activeTabId, { url: 'guyka://dashboard', title: t.dashboard, type: ViewType.DASHBOARD });
      } else if (normalizedUrl === 'guyka://settings') {
        updateTab(activeTabId, { url: 'guyka://settings', title: t.settings, type: ViewType.SETTINGS });
      } else {
        const site = registry.find(s => s.domain.toLowerCase() === normalizedUrl);
        if (site) {
          updateTab(activeTabId, { url: newUrl, title: site.name, type: ViewType.GUYKA_SITE, siteData: site });
        } else {
          updateTab(activeTabId, { url: newUrl, title: `חיפוש`, type: ViewType.SEARCH });
        }
      }
    } else if (normalizedUrl.includes('.') || normalizedUrl.startsWith('http')) {
      const targetUrl = normalizedUrl.startsWith('http') ? newUrl : `https://${newUrl}`;
      updateTab(activeTabId, { url: targetUrl, title: 'Web', type: ViewType.EXTERNAL });
    } else {
      updateTab(activeTabId, { url: newUrl, title: `חיפוש`, type: ViewType.SEARCH });
    }
  }, [activeTabId, registry, t, updateTab]);

  const handleAddTab = () => {
    const newId = Math.random().toString(36).substring(7);
    setTabs(prev => [...prev, { id: newId, title: 'טאב חדש', url: 'guyka://home', type: ViewType.HOME }]);
    setActiveTabId(newId);
  };

  const handleCloseTab = (id: string) => {
    if (tabs.length === 1) return;
    const newTabs = tabs.filter(t => t.id !== id);
    setTabs(newTabs);
    if (activeTabId === id) setActiveTabId(newTabs[newTabs.length - 1].id);
  };

  const renderContent = () => {
    switch (activeTab.type) {
      case ViewType.HOME:
        return (
          <BrowserHome 
            lang={lang} 
            featuredSites={registry} 
            onNavigate={handleNavigate} 
            onPublishClick={() => setIsPublishing(true)} 
            onInstallRequest={() => {}} 
            canInstall={false} 
          />
        );
      case ViewType.SEARCH:
        return <SearchView query={activeTab.url} allSites={registry} onNavigate={handleNavigate} />;
      case ViewType.GUYKA_SITE:
        return activeTab.siteData ? <GuykaSiteView site={activeTab.siteData} /> : <div className="p-20 text-center text-gray-400">האתר לא נמצא</div>;
      case ViewType.DASHBOARD:
        return <DashboardView userSites={registry} onNavigate={handleNavigate} />;
      case ViewType.SETTINGS:
        return <SettingsView lang={lang} setLang={setLang} user={user} onLogin={() => {}} onLogout={() => {}} />;
      case ViewType.EXTERNAL:
        return <iframe src={activeTab.url} className="w-full h-full border-none" title="Web" />;
      default:
        return <div className="p-20 text-center text-gray-400">404 - לא נמצא</div>;
    }
  };

  return (
    <Layout>
      <div className="flex flex-col h-full bg-white">
        <BrowserTabManager tabs={tabs} activeTabId={activeTabId} onTabClick={setActiveTabId} onTabClose={handleCloseTab} onAddTab={handleAddTab} />
        <AddressBar url={activeTab.url} onNavigate={handleNavigate} onGoHome={() => handleNavigate('guyka://home')} onRefresh={() => handleNavigate(activeTab.url)} />
        <div className="flex-1 overflow-hidden relative flex flex-col">
          {renderContent()}
        </div>
      </div>
      {isPublishing && <PublishDialog onClose={() => setIsPublishing(false)} onPublish={(site) => { setRegistry(prev => [...prev, site]); setIsPublishing(false); handleNavigate(site.domain); }} />}
    </Layout>
  );
};

export default App;
