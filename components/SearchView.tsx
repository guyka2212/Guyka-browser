
import React, { useState, useEffect } from 'react';
import { SearchResult, GuykaSite } from '../types';
import { searchInternalSites } from '../services/geminiService';
import { ICONS } from '../constants';

interface SearchViewProps {
  query: string;
  allSites: GuykaSite[];
  onNavigate: (url: string) => void;
}

export const SearchView: React.FC<SearchViewProps> = ({ query, allSites, onNavigate }) => {
  const [internalResults, setInternalResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchMode, setSearchMode] = useState<'INTERNAL' | 'GOOGLE'>('INTERNAL');

  useEffect(() => {
    const performSearch = async () => {
      setIsLoading(true);
      const results = await searchInternalSites(query, allSites);
      setInternalResults(results);
      setIsLoading(false);
    };

    if (query) {
      performSearch();
    }
  }, [query, allSites]);

  // Refactored to avoid early returns, fixing the "no overlap" TypeScript error and improving navigation UX
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      <div className="p-6 md:px-12 md:pt-12 md:pb-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 pb-4 gap-4">
          <h2 className="text-xl font-bold text-slate-800">
            Search results for "<span className="text-blue-600">{query}</span>"
          </h2>
          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200">
            <button 
              onClick={() => setSearchMode('INTERNAL')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${searchMode === 'INTERNAL' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              Registry
            </button>
            <button 
              onClick={() => setSearchMode('GOOGLE')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${searchMode === 'GOOGLE' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              Google Search
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:px-12 md:pb-12">
        <div className="max-w-4xl mx-auto h-full">
          {searchMode === 'GOOGLE' ? (
            <iframe
              src={`https://www.google.com/search?q=${encodeURIComponent(query)}&igu=1`}
              className="w-full h-full min-h-[500px] border-none rounded-2xl shadow-lg bg-white"
              title="Google Search"
            />
          ) : isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-pulse space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                  <div className="h-2 bg-gray-50 rounded w-full" />
                </div>
              ))}
            </div>
          ) : internalResults.length > 0 ? (
            <div className="space-y-4">
              {internalResults.map((res, i) => (
                <div 
                  key={i} 
                  onClick={() => onNavigate(res.url)}
                  className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 cursor-pointer transition-all space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <ICONS.Rocket />
                    </div>
                    <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{res.title}</h3>
                  </div>
                  <div className="text-xs text-blue-500 font-mono font-bold">{res.url}</div>
                  <p className="text-sm text-slate-500 leading-relaxed">{res.snippet}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 space-y-4">
              <div className="text-gray-300 flex justify-center scale-150"><ICONS.Search /></div>
              <h3 className="text-xl font-bold text-slate-400">No Registry results found</h3>
              <p className="text-slate-400 text-sm">Try searching on Google instead.</p>
              <button 
                onClick={() => setSearchMode('GOOGLE')}
                className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold"
              >
                Search on Google
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
