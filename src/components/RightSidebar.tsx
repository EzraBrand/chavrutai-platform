import React from 'react';
import { Bookmark, Share, MessageCircle, ExternalLink, Info } from 'lucide-react';

interface RightSidebarProps {
  onShowChat: () => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ onShowChat }) => {
  return (
    <aside className="hidden lg:block w-64 bg-parchment-light border-l border-amber-200 p-4 overflow-y-auto shadow-inner">
      <h3 className="font-bold mb-2 text-amber-800 font-serif">Tools & References</h3>
      
      <div className="mb-3">
        <button className="w-full py-1.5 px-2 bg-amber-100 text-amber-800 text-sm rounded mb-2 flex items-center justify-center shadow-sm hover:bg-amber-200 transition-colors">
          <Bookmark className="h-3 w-3 mr-1" />
          Bookmark This Page
        </button>
        <button className="w-full py-1.5 px-2 bg-amber-100 text-amber-800 text-sm rounded mb-2 flex items-center justify-center shadow-sm hover:bg-amber-200 transition-colors">
          <Share className="h-3 w-3 mr-1" />
          Share
        </button>
        <button 
          className="w-full py-1.5 px-2 bg-amber-200 text-amber-800 text-sm rounded flex items-center justify-center shadow-sm hover:bg-amber-300 transition-colors"
          onClick={onShowChat}
        >
          <MessageCircle className="h-3 w-3 mr-1" />
          Ask ChavrutAI
        </button>
      </div>
      
      <div className="mb-3 border-t border-amber-200 pt-3">
        <h4 className="font-medium text-sm mb-2 text-amber-900">Key Terms & Figures</h4>
        <div className="text-xs space-y-2">
          <div className="p-2 bg-amber-100 rounded border border-amber-200 shadow-sm">
            <span className="font-semibold font-hebrew">תרומה (teruma)</span> - Priestly offering or gift, one of the 24 gifts given to priests in the Temple period.
          </div>
          <div className="p-2 bg-amber-100 rounded border border-amber-200 shadow-sm">
            <span className="font-semibold">Rabbi Yohanan</span> - Leading scholar of the 3rd century CE, head of the academy at Tiberias.
          </div>
          <div className="p-2 bg-amber-100 rounded border border-amber-200 shadow-sm">
            <span className="font-semibold">Aaron</span> - First High Priest of Israel, brother of Moses, who died before entering the Land of Israel.
          </div>
          <div className="p-2 bg-amber-100 rounded border border-amber-200 shadow-sm">
            <span className="font-semibold font-hebrew">תחיית המתים</span> - Resurrection of the dead, a fundamental Jewish belief discussed in this chapter.
          </div>
        </div>
      </div>
      
      <div className="mb-3 border-t border-amber-200 pt-3">
        <h4 className="font-medium text-sm mb-1 text-amber-900">Dictionary</h4>
        <p className="text-xs text-amber-700 mb-1">Select any Hebrew word for definition</p>
        <div className="p-1.5 bg-amber-100 rounded text-xs italic border border-amber-200 text-amber-800 shadow-sm">
          <Info className="inline h-3 w-3 mr-1 text-amber-600" />
          Hover over Hebrew text to highlight words
        </div>
      </div>
      
      <div className="mb-3 border-t border-amber-200 pt-3">
        <h4 className="font-medium text-sm mb-1 text-amber-900">Related Resources</h4>
        <ul className="text-xs space-y-1">
          <li>
            <a href="#" className="text-amber-800 hover:underline hover:text-amber-600 flex items-center">
              <ExternalLink className="h-2.5 w-2.5 mr-1 text-amber-600" />
              Wikipedia: Resurrection in Judaism
            </a>
          </li>
          <li>
            <a href="#" className="text-amber-800 hover:underline hover:text-amber-600 flex items-center">
              <ExternalLink className="h-2.5 w-2.5 mr-1 text-amber-600" />
              Sefaria: Sanhedrin 90a
            </a>
          </li>
          <li>
            <a href="#" className="text-amber-800 hover:underline hover:text-amber-600 flex items-center">
              <ExternalLink className="h-2.5 w-2.5 mr-1 text-amber-600" />
              Jewish Encyclopedia: Terumah
            </a>
          </li>
        </ul>
      </div>
      
      <div className="border-t border-amber-200 pt-3">
        <h4 className="font-medium text-sm mb-1 text-amber-900">Display Settings</h4>
        <div className="space-y-2 text-xs">
          <div>
            <label className="flex justify-between items-center text-amber-800">
              <span>Hebrew Font Size</span>
              <select className="border border-amber-200 rounded px-1 py-0.5 bg-white shadow-sm">
                <option>Small</option>
                <option selected>Medium</option>
                <option>Large</option>
              </select>
            </label>
          </div>
          <div>
            <label className="flex justify-between items-center text-amber-800">
              <span>English Font Size</span>
              <select className="border border-amber-200 rounded px-1 py-0.5 bg-white shadow-sm">
                <option>Small</option>
                <option selected>Medium</option>
                <option>Large</option>
              </select>
            </label>
          </div>
          <div>
            <label className="flex items-center text-amber-800">
              <input type="checkbox" className="mr-1 border-amber-300" defaultChecked />
              Show Verse Numbers
            </label>
          </div>
          <div>
            <label className="flex items-center text-amber-800">
              <input type="checkbox" className="mr-1 border-amber-300" defaultChecked />
              Highlight Biblical References
            </label>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;