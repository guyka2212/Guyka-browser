
import React from 'react';
import { GuykaSite, Language } from '../types';
import { ICONS, TRANSLATIONS } from '../constants';

interface BrowserHomeProps {
  lang: Language;
  featuredSites: GuykaSite[];
  onNavigate: (url: string) => void;
  onPublishClick: () => void;
  onInstallRequest: () => void;
  canInstall: boolean;
}

export const BrowserHome: React.FC<BrowserHomeProps> = ({ 
  lang, 
  featuredSites, 
  onNavigate, 
  onPublishClick,
}) => {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'he';

  return (
    <div className="flex-1 flex flex-col bg-gray-50 overflow-y-auto" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block p-5 bg-blue-600 text-white rounded-[2rem] shadow-xl shadow-blue-200 mb-4 animate-bounce">
            <ICONS.Rocket />
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight">
            {t.hero_title}
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-xl mx-auto">
            {t.hero_subtitle}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button 
              onClick={onPublishClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 transition-all active:scale-95 flex items-center gap-3 text-lg"
            >
              <ICONS.Add />
              {t.publish}
            </button>
            <button 
              onClick={() => onNavigate('guyka://dashboard')}
              className="bg-slate-900 hover:bg-black text-white px-10 py-4 rounded-2xl font-bold shadow-lg transition-all active:scale-95 flex items-center gap-3 text-lg"
            >
              <ICONS.Home />
              {t.dashboard}
            </button>
            <button 
              onClick={() => onNavigate('guyka://settings')}
              className="bg-white border-2 border-gray-100 hover:border-gray-200 text-slate-600 px-6 py-4 rounded-2xl font-bold transition-all flex items-center gap-2"
            >
              <ICONS.Settings />
              {t.settings}
            </button>
          </div>
        </div>
      </section>

      {/* Registry / Featured Sites */}
      <section className="max-w-6xl mx-auto w-full px-6 py-16 space-y-8">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-black text-slate-800">{t.featured_sites}</h2>
          <div className="text-xs font-bold text-blue-500 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
            Live Registry
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredSites.map((site) => (
            <div 
              key={site.id} 
              onClick={() => onNavigate(site.domain)}
              className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:border-blue-200 cursor-pointer transition-all duration-300 flex flex-col overflow-hidden"
            >
              <div className="h-40 overflow-hidden relative">
                <img src={site.thumbnail} alt={site.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-black text-blue-600 uppercase">
                    {site.category}
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {site.name}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-2 h-10 leading-relaxed">
                  {site.description}
                </p>
                <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-blue-400">
                    {site.domain}
                  </span>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-gray-400 uppercase leading-none">{t.visits}</span>
                    <span className="text-sm font-black text-slate-700">{site.visitCount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cloud Info Section */}
      <section className="max-w-6xl mx-auto w-full px-6 pb-20">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 space-y-4 max-w-xl">
            <h3 className="text-3xl font-black">Google Cloud Powered Hosting</h3>
            <p className="text-blue-100 text-lg">
              Every guyka:// site is automatically deployed to a high-performance edge network. 
              Zero configuration, instant global availability, and enterprise-grade security.
            </p>
            <div className="flex gap-4 pt-2">
              <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-xl border border-white/20">
                <div className="text-xl font-black">99.9%</div>
                <div className="text-[10px] uppercase opacity-60 font-bold">Uptime</div>
              </div>
              <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-xl border border-white/20">
                <div className="text-xl font-black">&lt;50ms</div>
                <div className="text-[10px] uppercase opacity-60 font-bold">Global Latency</div>
              </div>
            </div>
          </div>
          <div className="relative z-10">
            <button 
              onClick={onPublishClick}
              className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-black text-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Get Started Free
            </button>
          </div>
          <div className="absolute -bottom-10 -right-10 opacity-10 scale-[2] pointer-events-none">
            <ICONS.Rocket />
          </div>
        </div>
      </section>
    </div>
  );
};
