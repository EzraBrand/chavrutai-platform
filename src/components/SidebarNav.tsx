import React from 'react';
import { Book } from 'lucide-react';

const SidebarNav: React.FC = () => {
  return (
    <aside className="hidden md:block w-48 lg:w-64 bg-amber-100 shadow-md overflow-y-auto p-2 border-r border-amber-200">
      <div className="p-2">
        <div className="flex items-center mb-3">
          <Book className="h-4 w-4 text-amber-800 mr-1.5" />
          <h3 className="font-bold text-lg text-amber-900 font-serif">Sanhedrin</h3>
        </div>
        
        <ul className="space-y-1">
          <li className="px-2 py-1 hover:bg-amber-200 rounded text-amber-800 transition-colors cursor-pointer">Chapter 1</li>
          <li className="px-2 py-1 hover:bg-amber-200 rounded text-amber-800 transition-colors cursor-pointer">Chapter 2</li>
          <li className="px-2 py-1 hover:bg-amber-200 rounded text-amber-800 transition-colors cursor-pointer">Chapter 3</li>
          {/* Add more chapters as needed */}
          <li className="px-2 py-1 bg-amber-200 text-amber-800 rounded font-medium shadow-sm border border-amber-300">
            Chapter 11 (Chelek)
          </li>
        </ul>

        <h4 className="font-bold mt-4 mb-1 text-amber-800">Pages in Chapter 11</h4>
        <ul className="space-y-1 pl-2">
          <li className="px-2 py-1 bg-amber-200 text-amber-800 rounded font-medium shadow-sm border border-amber-300">90a</li>
          <li className="px-2 py-1 hover:bg-amber-200 rounded text-amber-800 transition-colors cursor-pointer">90b</li>
          <li className="px-2 py-1 hover:bg-amber-200 rounded text-amber-800 transition-colors cursor-pointer">91a</li>
          <li className="px-2 py-1 hover:bg-amber-200 rounded text-amber-800 transition-colors cursor-pointer">91b</li>
          {/* Add more pages as needed */}
        </ul>
        
        <div className="mt-6 pt-4 border-t border-amber-200">
          <h4 className="text-sm font-medium text-amber-800 mb-2">Quick Navigation</h4>
          <select className="w-full text-sm border border-amber-200 rounded py-1 px-2 bg-white shadow-sm text-amber-800">
            <option>Jump to chapter...</option>
            <option>Chapter 1 - Dinei Mamonot</option>
            <option>Chapter 2 - Kohen Gadol</option>
            <option>Chapter 11 - Chelek</option>
          </select>
        </div>
      </div>
    </aside>
  );
};

export default SidebarNav;
