
export enum ViewType {
  HOME = 'HOME',
  SEARCH = 'SEARCH',
  GUYKA_SITE = 'GUYKA_SITE',
  EXTERNAL = 'EXTERNAL',
  DASHBOARD = 'DASHBOARD',
  SETTINGS = 'SETTINGS'
}

export type Language = 'en' | 'he';

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
}

export interface GuykaSite {
  id: string;
  domain: string; // guyka://domain
  repoUrl?: string;
  pagesUrl: string; // username.github.io/project
  name: string;
  description: string;
  author: string;
  category: string;
  lastUpdated: string;
  thumbnail: string;
  visitCount: number;
  showRepo: boolean;
}

export interface BrowserTab {
  id: string;
  title: string;
  url: string;
  type: ViewType;
  siteData?: GuykaSite;
}

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  source: 'INTERNAL' | 'GOOGLE';
}
