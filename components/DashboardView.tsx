
import React from 'react';
import { GuykaSite } from '../types';
import { ICONS } from '../constants';

interface DashboardViewProps {
  userSites: GuykaSite[];
  onNavigate: (url: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ userSites, onNavigate }) => {
  const totalVisits = userSites.reduce((acc, site) => acc + site.visitCount, 0);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Creator Dashboard</h1>
            <p className="text-slate-500">Manage your Guyka Cloud deployments and track performance.</p>
          </div>
          <div className="flex gap-4">
             <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center min-w-[120px]">
                <div className="text-2xl font-black text-blue-600">{userSites.length}</div>
                <div className="text-[10px] uppercase font-bold text-gray-400">Active Sites</div>
             </div>
             <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center min-w-[120px]">
                <div className="text-2xl font-black text-green-600">{totalVisits}</div>
                <div className="text-[10px] uppercase font-bold text-gray-400">Total Visits</div>
             </div>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-4">
          <h2 className="text-xl font-bold text-slate-800">My Hosted Sites</h2>
          {userSites.length === 0 ? (
            <div className="bg-white rounded-3xl p-20 text-center border border-dashed border-gray-300">
              <div className="text-gray-300 mb-4 flex justify-center scale-150"><ICONS.Rocket /></div>
              <h3 className="text-lg font-bold text-slate-400">No sites published yet</h3>
              <p className="text-slate-400 text-sm">Start your journey by hosting your first site from GitHub Pages.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {userSites.map(site => (
                <div key={site.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:border-blue-300 transition-all">
                  <div className="flex items-center gap-6">
                    <img src={site.thumbnail} className="w-16 h-16 rounded-xl object-cover" alt="" />
                    <div>
                      <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{site.name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs font-mono text-blue-500 bg-blue-50 px-2 py-0.5 rounded">{site.domain}</span>
                        <span className="text-[10px] text-gray-400 italic">Source: {site.pagesUrl}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-12">
                    <div className="text-right">
                       <div className="text-lg font-black text-slate-800">{site.visitCount}</div>
                       <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Visits</div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => onNavigate(site.domain)}
                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                      >
                        <ICONS.Search />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="bg-blue-600 rounded-3xl p-8 text-white relative overflow-hidden">
           <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Guyka Cloud Storage</h3>
                <p className="text-blue-100 text-sm max-w-md">
                  Your sites are cached and served via <strong>Google Cloud edge locations</strong>. 
                  High availability and low latency come standard.
                </p>
              </div>
              <div className="flex gap-4">
                 <div className="text-center px-6 border-r border-white/20">
                    <div className="text-2xl font-black">99.99%</div>
                    <div className="text-[10px] uppercase opacity-60">Uptime</div>
                 </div>
                 <div className="text-center px-6">
                    <div className="text-2xl font-black">24ms</div>
                    <div className="text-[10px] uppercase opacity-60">Latency</div>
                 </div>
              </div>
           </div>
           <div className="absolute top-0 right-0 opacity-10 scale-150 rotate-12"><ICONS.Rocket /></div>
        </section>
      </div>
    </div>
  );
};
