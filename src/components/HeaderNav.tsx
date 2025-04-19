import React from 'react';
import { BookMarked, Search, Menu, User, SlidersHorizontal } from 'lucide-react';

const HeaderNav: React.FC = () => {
  return (
    <header className="bg-amber-100 text-amber-900 p-4 shadow-lg border-b border-amber-200">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="bg-amber-800 text-amber-100 p-2 rounded mr-3 shadow-md">
              <BookMarked className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif" }}>
              ChavrutAI
            </h1>
          </div>
          <div className="hidden md:flex space-x-4">
            <button className="px-3 py-1 rounded hover:bg-amber-200">Tractates</button>
            <button className="px-3 py-1 rounded hover:bg-amber-200">Topics</button>
            <button className="px-3 py-1 rounded hover:bg-amber-200">Resources</button>
            <button className="px-3 py-1 rounded hover:bg-amber-200">About</button>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="py-1 px-3 rounded text-gray-800 w-32 md:w-48 border border-amber-200 shadow-sm"
            />
            <Search className="absolute right-2 top-1.5 h-4 w-4 text-amber-500" />
          </div>
          <button className="md:hidden">
            <Menu className="h-6 w-6" />
          </button>
          <button className="hidden md:flex items-center space-x-1 px-3 py-1.5 bg-amber-800 text-amber-50 rounded hover:bg-amber-900 shadow-sm">
            <User className="h-4 w-4" />
            <span>Sign In</span>
          </button>
          <button className="hidden md:block text-amber-800 hover:bg-amber-200 p-1.5 rounded">
            <SlidersHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderNav;
