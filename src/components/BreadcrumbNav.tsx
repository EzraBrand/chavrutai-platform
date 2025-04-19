import React from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';

const BreadcrumbNav: React.FC = () => {
  return (
    <div className="bg-amber-50 px-4 py-2 flex items-center text-sm text-amber-800 border-b border-amber-200">
      <BookOpen className="h-4 w-4 mr-2" />
      <span>Talmud Bavli</span>
      <ChevronRight className="h-4 w-4 mx-1" />
      <span>Sanhedrin</span>
      <ChevronRight className="h-4 w-4 mx-1" />
      <span className="font-semibold">Chapter 11 (Perek Chelek)</span>
      <ChevronRight className="h-4 w-4 mx-1" />
      <span>90a</span>
    </div>
  );
};

export default BreadcrumbNav;