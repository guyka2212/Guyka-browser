
import React from 'react';
import { GuykaSite } from './types';

export const INITIAL_SITES: GuykaSite[] = [
  {
    id: 'init-0',
    domain: 'guyka://community',
    repoUrl: 'https://github.com/guyka/community',
    pagesUrl: 'guyka.github.io/community',
    name: 'Guyka Community Hub',
    description: 'The central gathering place for all Guyka users. Find news, updates, and chat with other creators.',
    author: 'Admin',
    category: 'Social',
    lastUpdated: '2024-05-20',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=2426',
    visitCount: 1250,
    showRepo: true
  },
  {
    id: 'init-1',
    domain: 'guyka://docs',
    repoUrl: 'https://github.com/guyka/docs',
    pagesUrl: 'guyka.github.io/docs',
    name: 'Guyka Documentation',
    description: 'Learn how to build and host your own sites using the guyka:// protocol. Full API reference.',
    author: 'Dev Team',
    category: 'Education',
    lastUpdated: '2024-05-18',
    thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=2426',
    visitCount: 840,
    showRepo: true
  }
];

export const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    home: 'Home',
    dashboard: 'Creator Dashboard',
    settings: 'Settings',
    publish: 'Publish New Site',
    search_placeholder: 'Search Google or enter guyka:// domain',
    hero_title: 'Guyka Browser Pro',
    hero_subtitle: 'The custom protocol for hosted web apps.',
    host_btn: 'Host Website',
    personal_dashboard: 'My Dashboard',
    featured_sites: 'Network Registry',
    visits: 'Visits',
    language: 'Language',
    account: 'Account',
    login_google: 'Sign in with Google',
    logout: 'Logout',
    active_sites: 'Deployments',
    total_visits: 'Network Traffic'
  },
  he: {
    home: 'בית',
    dashboard: 'לוח בקרה',
    settings: 'הגדרות',
    publish: 'פרסום אתר',
    search_placeholder: 'חפש ב-Google או הזן דומיין guyka://',
    hero_title: 'Guyka Extension',
    hero_subtitle: 'הפרוטוקול המותאם לאפליקציות אינטרנט מאוחסנות.',
    host_btn: 'העלאת אתר',
    personal_dashboard: 'החשבון שלי',
    featured_sites: 'מאגר האתרים',
    visits: 'צפיות',
    language: 'שפה',
    account: 'חשבון',
    login_google: 'התחבר עם Google',
    logout: 'התנתק',
    active_sites: 'אתרים פעילים',
    total_visits: 'תנועת רשת'
  }
};

export const ICONS = {
  Back: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>,
  Forward: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>,
  Refresh: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" /></svg>,
  Home: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>,
  Search: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>,
  Add: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>,
  Close: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>,
  Rocket: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>,
  Settings: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>
};
