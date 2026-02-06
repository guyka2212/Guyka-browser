
import React, { useState, useEffect } from 'react';
import { ICONS } from '../constants';

interface AddressBarProps {
  url: string;
  onNavigate: (newUrl: string) => void;
  onGoHome: () => void;
  onRefresh: () => void;
}

export const AddressBar: React.FC<AddressBarProps> = ({ url, onNavigate, onGoHome, onRefresh }) => {
  const [inputValue, setInputValue] = useState(url);

  useEffect(() => {
    setInputValue(url);
  }, [url]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onNavigate(inputValue.trim());
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 bg-white border-b border-gray-200 shadow-sm z-20">
      <div className="flex gap-1">
        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 cursor-not-allowed transition-colors"><ICONS.Back /></button>
        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 cursor-not-allowed transition-colors"><ICONS.Forward /></button>
        <button onClick={onRefresh} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"><ICONS.Refresh /></button>
        <button onClick={onGoHome} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"><ICONS.Home /></button>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex items-center bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-xl px-4 py-2 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400">
        <div className="mr-3 text-gray-400">
          <ICONS.Search />
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search Google or enter guyka:// address"
          className="bg-transparent border-none outline-none w-full text-sm text-gray-700 font-medium"
        />
      </form>

      <div className="flex items-center gap-1">
        <button 
          onClick={() => onNavigate('guyka://dashboard')}
          className="p-2 text-slate-600 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2 text-xs font-bold"
          title="Dashboard"
        >
          <ICONS.Home />
        </button>
        <button 
          onClick={() => onNavigate('guyka://settings')}
          className="p-2 text-slate-600 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2 text-xs font-bold"
          title="Settings"
        >
          <ICONS.Settings />
        </button>
        <div className="h-6 w-px bg-gray-200 mx-1" />
        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all flex items-center gap-2 text-xs font-black">
          <ICONS.Rocket />
          <span className="hidden lg:inline uppercase tracking-tighter">Pro Engine</span>
        </button>
      </div>
    </div>
  );
};
