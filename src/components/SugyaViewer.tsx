import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, Info } from 'lucide-react';

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

  // Inline styles for more immediate styling
  const styles = {
    container: {
      borderRadius: '0.375rem',
      padding: '1.5rem',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      border: '1px solid #fde68a', // amber-200
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
    },
    title: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      fontFamily: "'Crimson Pro', 'Palatino Linotype', 'Book Antiqua', Palatino, serif",
      color: '#78350f', // amber-900
    },
    sefaria: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '0.875rem',
      color: '#92400e', // amber-800
      textDecoration: 'none',
    },
    infoBox: {
      backgroundColor: '#fffbeb', // amber-50
      padding: '0.75rem',
      marginBottom: '1rem',
      borderRadius: '0.375rem',
      border: '1px solid #fde68a', // amber-200
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      alignItems: 'flex-start',
    },
    infoIcon: {
      marginRight: '0.5rem',
      marginTop: '0.125rem', 
      flexShrink: 0,
      color: '#d97706', // amber-600
    },
    infoText: {
      fontSize: '0.75rem',
      fontFamily: "'Roboto', 'Segoe UI', Arial, sans-serif",
      color: '#92400e', // amber-800
    },
    verseContainer: {
      padding: '0.75rem',
      borderRadius: '0.375rem',
      display: 'flex',
      gap: '0.75rem',
      transition: 'background-color 0.2s',
      cursor: 'pointer',
    },
    verseHighlighted: {
      backgroundColor: '#fffbeb', // amber-50
      border: '1px solid #fde68a', // amber-200
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    },
    verseNumber: {
      color: '#9ca3af', // gray-400
      marginRight: '0.5rem',
      fontFamily: "'Crimson Pro', serif",
    },
    englishText: {
      width: '50%',
      fontSize: '0.875rem',
      fontFamily: "'Roboto', 'Segoe UI', Arial, sans-serif",
    },
    hebrewText: {
      width: '50%',
      fontSize: '1.125rem',
      textAlign: 'right',
      direction: 'rtl',
      fontFamily: "'Open Sans Hebrew', Calibri, Arial, sans-serif",
    },
    pagination: {
      display: 'flex', 
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTop: '1px solid #fde68a', // amber-200
      paddingTop: '1rem',
      marginTop: '1.5rem',
    },
    pageButton: {
      display: 'flex',
      alignItems: 'center',
      color: '#92400e', // amber-800
      padding: '0.375rem 0.75rem',
      borderRadius: '0.375rem',
      transition: 'background-color 0.2s',
    },
    tooltip: {
      position: 'fixed',
      backgroundColor: 'white',
      padding: '0.5rem',
      borderRadius: '0.375rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      border: '1px solid #fde68a', // amber-200
      fontSize: '0.75rem',
      maxWidth: '12rem',
      zIndex: 50,
    },
  };

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
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Sanhedrin 90a - Resurrection of the Dead</h2>
        <a 
          href="https://www.sefaria.org/Sanhedrin.90a" 
          target="_blank"
          rel="noopener noreferrer"
          style={styles.sefaria}
        >
          <ExternalLink size={14} style={{ marginRight: '0.25rem' }} />
          <span>View on Sefaria</span>
        </a>
      </div>
      
      <div style={styles.infoBox}>
        <Info size={16} style={styles.infoIcon} />
        <p style={styles.infoText}>
          This passage from Perek Chelek discusses how the concept of resurrection of the dead is derived 
          from the Torah through textual interpretation.
        </p>
      </div>
      
      <div style={{ marginTop: '1.5rem' }}>
        {hebrewText.map((hebrew, index) => {
          // Split Hebrew text into words for dictionary hover
          const words = hebrew.split(' ');
          const processedHebrew = (
            <span style={{ fontWeight: 'bold' }}>
              {words.map((word, wordIndex) => (
                <span
                  key={wordIndex}
                  style={{ 
                    cursor: 'help',
                    transition: 'background-color 0.2s',
                  }}
                  className="hover:bg-amber-200"
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
              onClick={() => onHighlight(index)}
              style={{
                ...styles.verseContainer,
                ...(index === highlightedSection ? styles.verseHighlighted : {})
              }}
              className={index !== highlightedSection ? "hover:bg-amber-50" : ""}
            >
              <div style={styles.englishText}>
                <span style={styles.verseNumber}>{index + 1}.</span>
                {englishText[index]}
              </div>
              <div style={styles.hebrewText}>
                <span style={styles.verseNumber}>{index + 1}.</span>
                {processedHebrew}
              </div>
            </div>
          );
        })}
      </div>
      
      <div style={styles.pagination}>
        <button 
          style={styles.pageButton} 
          className="hover:bg-amber-100"
        >
          <ArrowLeft size={16} style={{ marginRight: '0.25rem' }} />
          <span>Previous Page (89b)</span>
        </button>
        <button 
          style={styles.pageButton}
          className="hover:bg-amber-100"
        >
          <span>Next Page (90b)</span>
          <ArrowRight size={16} style={{ marginLeft: '0.25rem' }} />
        </button>
      </div>

      {/* Dictionary Tooltip */}
      {hoveredWord && (
        <div 
          style={{
            ...styles.tooltip,
            top: typeof window !== 'undefined' ? window.event?.clientY + 10 : 0,
            left: typeof window !== 'undefined' ? window.event?.clientX + 10 : 0,
          }}
        >
          <div style={{ fontWeight: 'bold', fontFamily: "'Open Sans Hebrew', Calibri, Arial, sans-serif" }}>
            {hoveredWord.term}
          </div>
          <div style={{ fontStyle: 'italic', color: '#92400e', fontSize: '0.7rem' }}>
            {hoveredWord.transliteration}
          </div>
          <div style={{ color: '#1f2937', marginTop: '0.25rem' }}>
            {hoveredWord.definition}
          </div>
        </div>
      )}
    </div>
  );
};

export default SugyaViewer;
