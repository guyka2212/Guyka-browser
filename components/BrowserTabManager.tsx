
import React from 'react';
import { BrowserTab, ViewType } from '../types';
import { ICONS } from '../constants';

interface TabManagerProps {
  tabs: BrowserTab[];
  activeTabId: string;
  onTabClick: (id: string) => void;
  onTabClose: (id: string) => void;
  onAddTab: () => void;
}

export const BrowserTabManager: React.FC<TabManagerProps> = ({
  tabs,
  activeTabId,
  onTabClick,
  onTabClose,
  onAddTab
}) => {
  return (
    <div className="flex items-end px-2 pt-2 bg-gray-100 border-b border-gray-200 overflow-x-auto no-scrollbar gap-1 h-12">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;
        return (
          <div
            key={tab.id}
            onClick={() => onTabClick(tab.id)}
            className={`
              relative flex items-center gap-2 px-3 py-1.5 min-w-[120px] max-w-[200px] rounded-t-lg transition-all cursor-pointer group
              ${isActive ? 'bg-white text-blue-600 shadow-sm' : 'bg-transparent text-gray-500 hover:bg-gray-200'}
            `}
          >
            <span className="text-xs font-medium truncate flex-1">{tab.title}</span>
            <button
              onClick={(e) => { e.stopPropagation(); onTabClose(tab.id); }}
              className={`p-1 rounded-full hover:bg-gray-300 opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'opacity-100' : ''}`}
            >
              <ICONS.Close />
            </button>
            {isActive && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />}
          </div>
        );
      })}
      <button
        onClick={onAddTab}
        className="mb-1.5 p-1.5 rounded-full text-gray-500 hover:bg-gray-200 hover:text-blue-500 transition-all"
      >
        <ICONS.Add />
      </button>
    </div>
  );
};
