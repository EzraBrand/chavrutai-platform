import React, { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';

const ChavrutAIChat: React.FC = () => {
  const [minimized, setMinimized] = useState(false);
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 right-0 md:mr-4 md:mb-4 z-10">
      {minimized ? (
        <div className="bg-amber-800 text-amber-50 px-3 py-1.5 rounded-t-lg shadow-lg flex items-center justify-between w-40">
          <h3 className="font-bold text-sm">ChavrutAI</h3>
          <div className="flex items-center">
            <button
              className="mx-1 hover:bg-amber-700 p-1 rounded"
              onClick={() => setMinimized(false)}
            >
              <span className="text-xs leading-none">▲</span>
            </button>
            <button
              onClick={() => setVisible(false)}
              className="hover:bg-amber-700 p-1 rounded"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
      ) : (
        <div className="w-64 md:w-72 h-auto max-h-64 bg-white border border-amber-200 rounded-t-lg shadow-lg flex flex-col">
          <div className="bg-amber-800 text-amber-50 p-1.5 flex items-center justify-between rounded-t-lg">
            <h3 className="font-bold text-sm" style={{ fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif" }}>
              ChavrutAI Assistant
            </h3>
            <div className="flex items-center">
              <button
                className="mx-1 hover:bg-amber-700 p-1 rounded"
                onClick={() => setMinimized(true)}
              >
                <span className="text-lg leading-none">_</span>
              </button>
              <button
                onClick={() => setVisible(false)}
                className="hover:bg-amber-700 p-1 rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex-1 p-2 overflow-y-auto bg-amber-50">
            <div className="bg-amber-100 p-2 rounded-lg mb-2 max-w-xs shadow-sm">
              <p className="text-sm">Shalom! I'm your ChavrutAI study partner. How can I help you understand this passage about resurrection from the Torah?</p>
            </div>
            <div className="bg-amber-100 p-2 rounded-lg mb-2 max-w-xs shadow-sm">
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
                className="flex-1 border border-amber-200 rounded-l p-1 text-xs"
              />
              <button className="bg-amber-700 text-white px-2 rounded-r hover:bg-amber-800 text-xs shadow-sm">
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
