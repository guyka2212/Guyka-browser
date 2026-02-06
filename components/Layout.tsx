
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-full w-full bg-white text-slate-800">
      <main className="flex-1 flex flex-col overflow-hidden">
        {children}
      </main>
      <footer className="h-6 bg-gray-50 border-t border-gray-200 px-3 flex items-center justify-between text-[10px] text-gray-400 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          <span>Guyka Protocol v1.0.4</span>
        </div>
        <span>Powered by Google Cloud</span>
      </footer>
    </div>
  );
};
