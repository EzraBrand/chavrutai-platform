import React, { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';

interface ChavrutAIChatProps {
  onClose: () => void;
}

const ChavrutAIChat: React.FC<ChavrutAIChatProps> = ({ onClose }) => {
  const [minimized, setMinimized] = useState(false);

  return (
    <div className="fixed bottom-0 right-0 md:mr-4 md:mb-4 z-10">
      {minimized ? (
        <div className="bg-amber-800 text-amber-50 px-3 py-1.5 rounded-t-lg shadow-lg flex items-center justify-between w-40">
          <h3 className="font-bold text-sm font-serif">ChavrutAI</h3>
          <div className="flex items-center">
            <button
              className="mx-1 hover:bg-amber-700 p-1 rounded transition-colors"
              onClick={() => setMinimized(false)}
            >
              <span className="text-xs leading-none">▲</span>
            </button>
            <button
              onClick={onClose}
              className="hover:bg-amber-700 p-1 rounded transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
      ) : (
        <div className="w-64 md:w-72 h-auto max-h-[32rem] bg-white border border-amber-200 rounded-t-lg shadow-lg flex flex-col">
          <div className="bg-amber-800 text-amber-50 p-1.5 flex items-center justify-between rounded-t-lg">
            <h3 className="font-bold text-sm font-serif">
              ChavrutAI Assistant
            </h3>
            <div className="flex items-center">
              <button
                className="mx-1 hover:bg-amber-700 p-1 rounded transition-colors"
                onClick={() => setMinimized(true)}
              >
                <span className="text-lg leading-none">_</span>
              </button>
              <button
                onClick={onClose}
                className="hover:bg-amber-700 p-1 rounded transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex-1 p-2 overflow-y-auto bg-parchment-light">
            <div className="bg-amber-100 p-2 rounded-lg mb-2 max-w-xs shadow-sm border border-amber-200">
              <p className="text-sm">Shalom! I'm your ChavrutAI study partner. How can I help you understand this passage about resurrection from the Torah?</p>
            </div>
            <div className="bg-amber-100 p-2 rounded-lg mb-2 max-w-xs shadow-sm border border-amber-200">
              <p className="text-sm">You can ask me about:</p>
              <ul className="text-xs list-disc pl-4 mt-1">
                <li>The meaning of technical terms</li>
                <li>Historical context of this passage</li>
                <li>The logical structure of the argument</li>
                <li>Related concepts in Jewish thought</li>
              </ul>
            </div>
          </div>
          <div className="p-2 border-t border-amber-200 bg-white">
            <div className="flex">
              <input
                type="text"
                placeholder="Ask about this passage..."
                className="flex-1 border border-amber-200 rounded-l p-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
              <button className="bg-amber-700 text-white px-2.5 py-1 rounded-r hover:bg-amber-800 text-xs shadow-sm transition-colors">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChavrutAIChat;
