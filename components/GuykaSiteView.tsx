
import React, { useEffect } from 'react';
import { GuykaSite } from '../types';
import { ICONS } from '../constants';

interface GuykaSiteViewProps {
  site: GuykaSite;
  onVisit?: (id: string) => void;
}

export const GuykaSiteView: React.FC<GuykaSiteViewProps> = ({ site, onVisit }) => {
  useEffect(() => {
    if (onVisit) onVisit(site.id);
  }, [site.id, onVisit]);

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Site Header Bar */}
      <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between shadow-md z-10">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center font-bold">
            {site.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-sm font-bold leading-none">{site.name}</h1>
            <span className="text-[10px] text-blue-400 font-mono">{site.domain}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {site.showRepo && site.repoUrl && (
            <a 
              href={site.repoUrl} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-md text-xs transition-all"
            >
              <ICONS.Search /> {/* Using search icon as placeholder for code icon */}
              View Source
            </a>
          )}
          <div className="h-4 w-px bg-white/20 mx-2" />
          <div className="text-[10px] text-slate-400">
            Powered by <span className="text-white font-bold">Guyka Cloud</span>
          </div>
        </div>
      </div>

      {/* Main Content Area - Iframe to GitHub Pages */}
      <div className="flex-1 relative bg-gray-100">
        <iframe 
          src={`https://${site.pagesUrl.replace(/^https?:\/\//, '')}`}
          className="w-full h-full border-none"
          title={site.name}
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
        
        {/* Overlay if URL looks invalid */}
        {!site.pagesUrl.includes('.github.io') && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-50 p-12 text-center">
            <div className="max-w-md space-y-4">
              <div className="text-6xl">🌐</div>
              <h2 className="text-2xl font-bold text-slate-800">Site Preview</h2>
              <p className="text-slate-500">
                This site is configured to <strong>{site.pagesUrl}</strong>. 
                In a production environment, Guyka Browser routes this directly via Google Cloud DNS.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
