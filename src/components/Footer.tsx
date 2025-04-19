import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-amber-100 text-amber-800 p-1 text-xs border-t border-amber-200">
      <div className="flex justify-between items-center">
        <div>
          <p>ChavrutAI - Making the Talmud more accessible for contemporary study | Data provided by Sefaria | Open-source project</p>
        </div>
        <div>
          <a href="#" className="text-amber-900 hover:underline mr-2">About</a>
          <a href="#" className="text-amber-900 hover:underline mr-2">GitHub</a>
          <a href="#" className="text-amber-900 hover:underline">Feedback</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;