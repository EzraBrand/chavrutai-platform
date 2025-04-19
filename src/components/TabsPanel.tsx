import React from 'react';
import { BookOpen, GraduationCap, Lightbulb } from 'lucide-react';

interface TabsPanelProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsPanel: React.FC<TabsPanelProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex mb-3 border-b border-amber-200">
      <button
        className={`px-4 py-1.5 ${activeTab === 'text' ? 'border-b-2 border-amber-700 font-medium' : ''}`}
        onClick={() => setActiveTab('text')}
      >
        <div className="flex items-center">
          <BookOpen className="h-4 w-4 mr-1.5" />
          <span>Text & Translation</span>
        </div>
      </button>
      <button
        className={`px-4 py-1.5 ${activeTab === 'commentaries' ? 'border-b-2 border-amber-700 font-medium' : ''}`}
        onClick={() => setActiveTab('commentaries')}
      >
        <div className="flex items-center">
          <GraduationCap className="h-4 w-4 mr-1.5" />
          <span>Summaries & Key Terms</span>
        </div>
      </button>
      <button
        className={`px-4 py-1.5 ${activeTab === 'analysis' ? 'border-b-2 border-amber-700 font-medium' : ''}`}
        onClick={() => setActiveTab('analysis')}
      >
        <div className="flex items-center">
          <Lightbulb className="h-4 w-4 mr-1.5" />
          <span>Broader Analysis</span>
        </div>
      </button>
    </div>
  );
};

export default TabsPanel;
