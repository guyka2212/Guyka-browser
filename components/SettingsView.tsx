
import React from 'react';
import { Language, UserProfile } from '../types';
import { TRANSLATIONS, ICONS } from '../constants';

interface SettingsViewProps {
  lang: Language;
  setLang: (lang: Language) => void;
  user: UserProfile | null;
  onLogin: () => void;
  onLogout: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ lang, setLang, user, onLogin, onLogout }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-6 md:p-12" dir={lang === 'he' ? 'rtl' : 'ltr'}>
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-black text-slate-900">{t.settings}</h1>

        {/* Account Section */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ICONS.Home /> {t.account}
          </h2>
          {user ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={user.avatar} className="w-16 h-16 rounded-full" alt="Avatar" />
                <div>
                  <div className="font-bold text-slate-900">{user.name}</div>
                  <div className="text-sm text-slate-500">{user.email}</div>
                </div>
              </div>
              <button 
                onClick={onLogout}
                className="px-6 py-2 border border-red-100 text-red-600 rounded-xl hover:bg-red-50 font-bold transition-all"
              >
                {t.logout}
              </button>
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <p className="text-slate-500">Sign in to sync your guyka:// domains and preferences across devices.</p>
              <button 
                onClick={onLogin}
                className="flex items-center gap-3 mx-auto px-8 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-bold shadow-sm"
              >
                <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="G" />
                {t.login_google}
              </button>
            </div>
          )}
        </div>

        {/* Language Section */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ICONS.Search /> {t.language}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setLang('en')}
              className={`p-4 rounded-2xl border-2 transition-all font-bold text-center ${lang === 'en' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-100 hover:bg-gray-50'}`}
            >
              English (US)
            </button>
            <button 
              onClick={() => setLang('he')}
              className={`p-4 rounded-2xl border-2 transition-all font-bold text-center ${lang === 'he' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-100 hover:bg-gray-50'}`}
            >
              עברית (IL)
            </button>
          </div>
        </div>

        <div className="text-center text-[10px] text-gray-400 font-mono uppercase tracking-widest pt-8">
          Guyka Browser Pro v1.0.4 • Protocol v2.5.4
        </div>
      </div>
    </div>
  );
};
