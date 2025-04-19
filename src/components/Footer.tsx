import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-amber-100 text-amber-800 p-2 text-xs border-t border-amber-200 bg-blend-soft-light bg-parchment-texture shadow-inner">
      <div className="flex flex-wrap md:flex-nowrap justify-between items-center max-w-7xl mx-auto px-2">
        <div className="w-full md:w-auto text-center md:text-left mb-2 md:mb-0">
          <p>ChavrutAI - Making the Talmud more accessible for contemporary study | Data provided by Sefaria | Open-source project</p>
        </div>
        <div className="w-full md:w-auto flex justify-center md:justify-end space-x-4">
          <a href="#" className="text-amber-900 hover:text-amber-700 hover:underline transition-colors">About</a>
          <a href="#" className="text-amber-900 hover:text-amber-700 hover:underline transition-colors">GitHub</a>
          <a href="#" className="text-amber-900 hover:text-amber-700 hover:underline transition-colors">Feedback</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;