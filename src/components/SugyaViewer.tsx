import React from 'react';

interface SugyaViewerProps {
  hebrewText: string[];
  englishText: React.ReactNode[];
  highlightedSection: number;
  onHighlight: (index: number) => void;
}

const SugyaViewer: React.FC<SugyaViewerProps> = ({ hebrewText, englishText, highlightedSection, onHighlight }) => {
  return (
    <div className="space-y-2">
      {hebrewText.map((hebrew, index) => {
        const processedHebrew = <span className="font-bold">{hebrew}</span>;

        return (
          <div
            key={index}
            className={`flex flex-row gap-3 p-3 rounded-md ${index === highlightedSection ? 'bg-amber-50 border border-amber-200 shadow-sm' : 'hover:bg-amber-50'}`}
            onClick={() => onHighlight(index)}
          >
            <div className="w-1/2 text-sm">
              <span className="text-gray-500 mr-2">{index + 1}.</span>
              {englishText[index]}
            </div>
            <div className="w-1/2 text-right text-lg" dir="rtl" style={{ fontFamily: "Calibri, 'Open Sans Hebrew', Arial, sans-serif" }}>
              <span className="text-gray-500 ml-2">{index + 1}.</span>
              {processedHebrew}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SugyaViewer;
