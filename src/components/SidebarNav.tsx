import React from 'react';

const SidebarNav: React.FC = () => {
  return (
    <aside className="hidden md:block w-48 lg:w-64 bg-amber-100 shadow-md overflow-y-auto p-2">
      <div className="p-2">
        <h3 className="font-bold text-lg mb-2">Sanhedrin</h3>
        <ul className="space-y-1">
          <li className="px-2 py-1 hover:bg-amber-200 rounded">Chapter 1</li>
          <li className="px-2 py-1 hover:bg-amber-200 rounded">Chapter 2</li>
          <li className="px-2 py-1 hover:bg-amber-200 rounded">Chapter 3</li>
          {/* Add more chapters as needed */}
          <li className="px-2 py-1 bg-amber-200 text-amber-800 rounded font-medium">Chapter 11 (Chelek)</li>
        </ul>

        <h4 className="font-bold mt-4 mb-1">Pages in Chapter 11</h4>
        <ul className="space-y-1 pl-2">
          <li className="px-2 py-1 bg-amber-200 text-amber-800 rounded font-medium">90a</li>
          <li className="px-2 py-1 hover:bg-amber-200 rounded">90b</li>
          <li className="px-2 py-1 hover:bg-amber-200 rounded">91a</li>
          <li className="px-2 py-1 hover:bg-amber-200 rounded">91b</li>
          {/* Add more pages as needed */}
        </ul>
      </div>
    </aside>
  );
};

export default SidebarNav;
