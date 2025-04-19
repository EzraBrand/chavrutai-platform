import React from 'react';
import { Bookmark, Share, MessageCircle, ExternalLink } from 'lucide-react';

interface RightSidebarProps {
  onShowChat: () => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ onShowChat }) => {
  return (
    <aside className="hidden lg:block w-64 bg-amber-50 border-l p-4 overflow-y-auto">
      <h3 className="font-bold mb-2">Tools & References</h3>
      
      <div className="mb-3">
        <button className="w-full py-1 px-2 bg-amber-100 text-amber-800 text-sm rounded mb-2 flex items-center justify-center">
          <Bookmark className="h-3 w-3 mr-1" />
          Bookmark This Page
        </button>
        <button className="w-full py-1 px-2 bg-amber-100 text-amber-800 text-sm rounded mb-2 flex items-center justify-center">
          <Share className="h-3 w-3 mr-1" />
          Share
        </button>
        <button 
          className="w-full py-1 px-2 bg-amber-200 text-amber-800 text-sm rounded flex items-center justify-center"
          onClick={onShowChat}
        >
          <MessageCircle className="h-3 w-3 mr-1" />
          Ask ChavrutAI
        </button>
      </div>
      
      <div className="mb-3 border-t pt-3">
        <h4 className="font-medium text-sm mb-2">Key Terms & Figures</h4>
        <div className="text-xs space-y-2">
          <div className="p-2 bg-amber-100 rounded">
            <span className="font-semibold">תרומה (teruma)</span> - Priestly offering or gift
          </div>
          <div className="p-2 bg-amber-100 rounded">
            <span className="font-semibold">Rabbi Yohanan</span> - Leading scholar of the 3rd century CE
          </div>
        </div>
      </div>
      
      <div className="mb-3 border-t pt-3">
        <h4 className="font-medium text-sm mb-1">Dictionary</h4>
        <p className="text-xs text-gray-600 mb-1">Select any Hebrew word for definition</p>
        <div className="p-1 bg-amber-100 rounded text-xs italic">
          Hover over Hebrew text to highlight words
        </div>
      </div>
      
      <div className="mb-3 border-t pt-3">
        <h4 className="font-medium text-sm mb-1">Related Resources</h4>
        <ul className="text-xs space-y-1">
          <li>
            <a href="#" className="text-blue-600 hover:underline flex items-center">
              <ExternalLink className="h-2 w-2 mr-1" />
              Wikipedia: Resurrection in Judaism
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline flex items-center">
              <ExternalLink className="h-2 w-2 mr-1" />
              Sefaria: Sanhedrin 90a
            </a>
          </li>
        </ul>
      </div>
      
      <div className="border-t pt-3">
        <h4 className="font-medium text-sm mb-1">Display Settings</h4>
        <div className="space-y-2 text-xs">
          <div>
            <label className="flex justify-between items-center">
              <span>Hebrew Font Size</span>
              <select className="border rounded px-1 py-0.5">
                <option>Small</option>
                <option selected>Medium</option>
                <option>Large</option>
              </select>
            </label>
          </div>
          <div>
            <label className="flex justify-between items-center">
              <span>English Font Size</span>
              <select className="border rounded px-1 py-0.5">
                <option>Small</option>
                <option selected>Medium</option>
                <option>Large</option>
              </select>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" className="mr-1" defaultChecked />
              Show Verse Numbers
            </label>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;