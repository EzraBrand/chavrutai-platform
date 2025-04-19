import React from 'react';
import { BookOpen, GraduationCap, Lightbulb } from 'lucide-react';

interface TabsPanelProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsPanel: React.FC<TabsPanelProps> = ({ activeTab, setActiveTab }) => {
  // Inline styles for more immediate styling effect
  const styles = {
    tabContainer: {
      display: 'flex',
      backgroundColor: '#f9f5eb', // parchment-light
      borderTopLeftRadius: '0.375rem',
      borderTopRightRadius: '0.375rem',
    },
    tab: {
      padding: '0.5rem 1rem',
      display: 'flex',
      alignItems: 'center',
      transition: 'all 0.2s',
      cursor: 'pointer',
    },
    activeTab: {
      borderBottom: '2px solid #b45309', // amber-700
      fontWeight: 500,
      color: '#92400e', // amber-800
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
    },
    inactiveTab: {
      color: '#d97706', // amber-600
    },
    icon: {
      marginRight: '0.375rem',
    },
    text: {
      fontFamily: "'Crimson Pro', 'Palatino Linotype', 'Book Antiqua', Palatino, serif",
    }
  };
  
  return (
    <div style={styles.tabContainer}>
      <div 
        onClick={() => setActiveTab('text')}
        style={{
          ...styles.tab,
          ...(activeTab === 'text' ? styles.activeTab : styles.inactiveTab)
        }}
      >
        <BookOpen style={styles.icon} className="h-4 w-4" />
        <span style={styles.text}>Text & Translation</span>
      </div>
      <div 
        onClick={() => setActiveTab('commentaries')}
        style={{
          ...styles.tab,
          ...(activeTab === 'commentaries' ? styles.activeTab : styles.inactiveTab)
        }}
      >
        <GraduationCap style={styles.icon} className="h-4 w-4" />
        <span style={styles.text}>Summaries & Key Terms</span>
      </div>
      <div 
        onClick={() => setActiveTab('analysis')}
        style={{
          ...styles.tab,
          ...(activeTab === 'analysis' ? styles.activeTab : styles.inactiveTab)
        }}
      >
        <Lightbulb style={styles.icon} className="h-4 w-4" />
        <span style={styles.text}>Broader Analysis</span>
      </div>
    </div>
  );
};

export default TabsPanel;
