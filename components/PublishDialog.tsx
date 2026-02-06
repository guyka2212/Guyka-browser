
import React, { useState } from 'react';
import { ICONS } from '../constants';
import { getSiteSummary } from '../services/geminiService';
import { GuykaSite } from '../types';

interface PublishDialogProps {
  onClose: () => void;
  onPublish: (site: GuykaSite) => void;
}

export const PublishDialog: React.FC<PublishDialogProps> = ({ onClose, onPublish }) => {
  const [step, setStep] = useState(1);
  const [pagesUrl, setPagesUrl] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [showRepo, setShowRepo] = useState(true);
  const [domain, setDomain] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedInfo, setSuggestedInfo] = useState({ name: '', description: '' });

  const handleNext = async () => {
    if (step === 1) {
      if (!pagesUrl.includes('.github.io')) {
        alert('Please provide a valid GitHub Pages URL (e.g., username.github.io/project).');
        return;
      }
      setIsLoading(true);
      // We use the repo name extraction from the pages URL for AI analysis
      const siteRef = pagesUrl.split('/').pop() || pagesUrl;
      const info = await getSiteSummary(siteRef);
      setSuggestedInfo(info);
      setStep(2);
      setIsLoading(false);
    } else {
      if (!domain.match(/^[a-z0-9-]+$/)) {
        alert('Domain name must be lowercase alphanumeric characters and hyphens only.');
        return;
      }
      
      const newSite: GuykaSite = {
        id: Math.random().toString(36).substring(7),
        domain: `guyka://${domain}`,
        pagesUrl: pagesUrl,
        repoUrl: repoUrl || undefined,
        showRepo: showRepo,
        name: suggestedInfo.name,
        description: suggestedInfo.description,
        author: 'Current User',
        category: 'Personal',
        lastUpdated: new Date().toISOString().split('T')[0],
        thumbnail: `https://picsum.photos/seed/${domain}/400/300`,
        visitCount: 0
      };
      
      onPublish(newSite);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="bg-blue-600 p-8 text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors">
            <ICONS.Close />
          </button>
          <div className="flex items-center gap-3 mb-2 text-right justify-end" dir="rtl">
            <ICONS.Rocket />
            <h2 className="text-2xl font-bold">פרסום אתר חדש ברשת Guyka</h2>
          </div>
          <p className="text-blue-100 text-sm text-right" dir="rtl">הפוך את ה-GitHub Pages שלך לאתר רשמי בפורמול guyka://</p>
        </div>

        <div className="p-8 space-y-6" dir="rtl">
          <div className="flex gap-2">
            <div className={`h-2 flex-1 rounded-full ${step >= 1 ? 'bg-blue-600' : 'bg-gray-200'}`} />
            <div className={`h-2 flex-1 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
          </div>

          {step === 1 ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">כתובת ה-GitHub Pages שלך</label>
                <input
                  type="text"
                  value={pagesUrl}
                  onChange={(e) => setPagesUrl(e.target.value)}
                  placeholder="username.github.io/project"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-left"
                  dir="ltr"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">לינק ל-Repository (אופציונלי)</label>
                <input
                  type="text"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/user/repo"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-left"
                  dir="ltr"
                />
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <input 
                  type="checkbox" 
                  id="showRepo" 
                  checked={showRepo} 
                  onChange={(e) => setShowRepo(e.target.checked)}
                  className="w-4 h-4 text-blue-600"
                />
                <label htmlFor="showRepo" className="text-xs text-slate-600 font-bold cursor-pointer">אפשר לאחרים לראות את קוד המקור (Repository)</label>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">בחר שם דומיין (guyka://...)</label>
                <div className="flex items-center gap-2" dir="ltr">
                  <span className="bg-gray-100 border border-gray-200 px-3 py-3 rounded-xl text-gray-400 font-mono text-sm">guyka://</span>
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="my-site"
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <h4 className="text-[10px] uppercase tracking-wider font-bold text-blue-400">תצוגה מקדימה (Gemini AI)</h4>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black">{suggestedInfo.name.charAt(0)}</div>
                  <div>
                    <h5 className="font-bold text-slate-900">{suggestedInfo.name}</h5>
                    <p className="text-[10px] text-slate-500 leading-tight">{suggestedInfo.description}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              onClick={() => step === 2 ? setStep(1) : onClose()}
              className="flex-1 px-6 py-3 rounded-xl border border-gray-200 text-slate-700 font-bold hover:bg-gray-50 transition-all"
            >
              {step === 1 ? 'ביטול' : 'חזור'}
            </button>
            <button
              onClick={handleNext}
              disabled={isLoading}
              className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                step === 1 ? 'המשך להגדרת דומיין' : 'פרסם אתר'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
