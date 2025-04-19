import React, { useState } from 'react';

interface DictionaryEntry {
  term: string;
  transliteration: string;
  definition: string;
}

interface SugyaViewerProps {
  hebrewText: string[];
  englishText: React.ReactNode[];
  highlightedSection: number;
  onHighlight: (index: number) => void;
}

const SugyaViewer: React.FC<SugyaViewerProps> = ({ hebrewText, englishText, highlightedSection, onHighlight }) => {
  const [hoveredWord, setHoveredWord] = useState<DictionaryEntry | null>(null);

  const handleHebrewWordHover = (word: string) => {
    // This would typically fetch from a dictionary service
    // For now using mock data
    const mockDictionary: { [key: string]: DictionaryEntry } = {
      'תרומה': {
        term: 'תרומה',
        transliteration: 'teruma',
        definition: 'Portion set aside as a gift for the priests'
      },
      'תחיית': {
        term: 'תחיית',
        transliteration: 'techiyat',
        definition: 'resurrection of'
      },
      'המתים': {
        term: 'המתים',
        transliteration: 'hametim',
        definition: 'the dead'
      }
    };

    setHoveredWord(mockDictionary[word] || null);
  };

  return (
    <div>
      <div className="mb-6 border rounded-md p-4">
        <h3 className="font-bold mb-2">Argument Structure</h3>
        <div className="bg-white p-2 rounded border">
          <div className="flex flex-col items-center">
            {['Question', 'Proof Text', 'Difficulty', 'Resolution', 'Conclusion'].map((step, i) => (
              <React.Fragment key={i}>
                <div className={`bg-amber-${i % 2 ? '50' : '100'} p-2 rounded text-center w-64 mb-2 text-xs`}>
                  <strong>{step}:</strong> {englishText[i]}
                </div>
                {i < 4 && <div className="h-6 border-l-2 border-amber-300"></div>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {hebrewText.map((hebrew, index) => {
          // Split Hebrew text into words for dictionary hover
          const words = hebrew.split(' ');
          const processedHebrew = (
            <span className="font-bold">
              {words.map((word, wordIndex) => (
                <span
                  key={wordIndex}
                  className="hover:bg-amber-200 cursor-help"
                  onMouseEnter={() => handleHebrewWordHover(word)}
                  onMouseLeave={() => setHoveredWord(null)}
                >
                  {word}{' '}
                </span>
              ))}
            </span>
          );

          return (
            <div
              key={index}
              className={`flex flex-row gap-3 p-3 rounded-md ${
                index === highlightedSection ? 'bg-amber-50 border border-amber-200 shadow-sm' : 'hover:bg-amber-50'
              }`}
              onClick={() => onHighlight(index)}
            >
              <div className="w-1/2 text-sm">
                <span className="text-gray-500 mr-2">{index + 1}.</span>
                {englishText[index]}
              </div>
              <div className="w-1/2 text-right text-lg relative" dir="rtl" style={{ fontFamily: "Calibri, 'Open Sans Hebrew', Arial, sans-serif" }}>
                <span className="text-gray-500 ml-2">{index + 1}.</span>
                {processedHebrew}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dictionary Tooltip */}
      {hoveredWord && (
        <div className="fixed bg-white p-2 rounded shadow-lg border border-amber-200 text-sm max-w-xs">
          <div className="font-bold">{hoveredWord.term}</div>
          <div className="italic text-gray-600">{hoveredWord.transliteration}</div>
          <div className="text-gray-800">{hoveredWord.definition}</div>
        </div>
      )}
    </div>
  );
};

export default SugyaViewer;
