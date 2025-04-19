import './styles.css'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import HeaderNav from './HeaderNav'
import SidebarNav from './SidebarNav'
import ChavrutAIChat from './ChavrutAIChat'
import TabsPanel from './TabsPanel'
import SugyaViewer from './SugyaViewer'
import RightSidebar from './RightSidebar'
import Footer from './Footer'
import BreadcrumbNav from './BreadcrumbNav'

// CSS styles for direct application
const styles = {
  app: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    backgroundColor: '#fffbeb', // amber-50
    backgroundImage: "url('https://www.transparenttextures.com/patterns/parchment.png')",
    backgroundRepeat: 'repeat',
    backgroundBlendMode: 'soft-light' as const,
  },
  header: {
    backgroundColor: '#fef3c7', // amber-100
    borderBottom: '1px solid #fde68a', // amber-200
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  breadcrumb: {
    backgroundColor: '#fffbeb', // amber-50
    borderBottom: '1px solid #fde68a', // amber-200
    padding: '0.5rem 1rem',
    color: '#92400e', // amber-800
  },
  sidebar: {
    backgroundColor: '#fef3c7', // amber-100
    borderRight: '1px solid #fde68a', // amber-200
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.05)',
  },
  content: {
    padding: '1rem',
  },
  footer: {
    backgroundColor: '#fef3c7', // amber-100
    borderTop: '1px solid #fde68a', // amber-200
    padding: '0.5rem',
    fontSize: '0.75rem',
    color: '#92400e', // amber-800
  },
  tabsPanel: {
    borderBottom: '1px solid #fde68a', // amber-200
    marginBottom: '1rem',
    display: 'flex',
  },
  activeTab: {
    borderBottom: '2px solid #b45309', // amber-700
    fontWeight: '500',
    color: '#92400e', // amber-800
  },
  tab: {
    padding: '0.5rem 1rem',
    display: 'flex',
    alignItems: 'center',
  },
  sugyaViewer: {
    backgroundColor: 'white',
    backgroundImage: "url('https://www.transparenttextures.com/patterns/parchment.png')",
    backgroundBlendMode: 'soft-light' as const,
    border: '1px solid #fde68a', // amber-200
    borderRadius: '0.375rem',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  }
};

interface DisplaySettings {
  hebrewFontSize: 'small' | 'medium' | 'large';
  englishFontSize: 'small' | 'medium' | 'large';
  showVerseNumbers: boolean;
}

const App = () => {
  const [highlightedSection, setHighlightedSection] = useState(0);
  const [activeTab, setActiveTab] = useState('text');
  const [showChat, setShowChat] = useState(false);
  const [displaySettings, setDisplaySettings] = useState<DisplaySettings>({
    hebrewFontSize: 'medium',
    englishFontSize: 'medium',
    showVerseNumbers: true
  });

  // Load text from sanhedrin.90a.json
  const [hebrewText, setHebrewText] = useState<string[]>([]);
  const [englishText, setEnglishText] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    // In a real app, this would be properly imported
    import('./sugyot/sanhedrin.90a.json').then(data => {
      setHebrewText(data.hebrew);
      setEnglishText(data.english);
    });
  }, []);

  // Custom styles for the font families
  useEffect(() => {
    // Add Google Fonts for Palatino, Roboto, and Hebrew fonts if not already in the head
    if (!document.getElementById('google-fonts')) {
      const link = document.createElement('link');
      link.id = 'google-fonts';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Crimson+Pro:wght@400;600;700&family=Open+Sans+Hebrew:wght@300;400;700&display=swap';
      document.head.appendChild(link);
    }

    // Add default font styles
    const style = document.createElement('style');
    style.textContent = `
      body { 
        font-family: 'Roboto', 'Segoe UI', Arial, sans-serif; 
        color: #1a202c;
      }
      h1, h2, h3, h4, h5, h6 {
        font-family: 'Crimson Pro', 'Palatino Linotype', 'Book Antiqua', Palatino, serif;
      }
      [dir="rtl"] {
        font-family: 'Open Sans Hebrew', Calibri, Arial, sans-serif;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <HeaderNav />
      </div>
      
      <div style={styles.breadcrumb}>
        <BreadcrumbNav />
      </div>
      
      <div className="flex flex-1">
        <div style={styles.sidebar} className="hidden md:block w-48 lg:w-64 overflow-y-auto p-2">
          <SidebarNav />
        </div>
        
        <main className="flex-1 flex">
          <div style={styles.content} className="flex-1">
            <div style={styles.tabsPanel}>
              <TabsPanel activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
            
            <div style={styles.sugyaViewer}>
              <SugyaViewer 
                hebrewText={hebrewText}
                englishText={englishText}
                highlightedSection={highlightedSection}
                onHighlight={setHighlightedSection}
              />
            </div>
          </div>
          
          <RightSidebar onShowChat={() => setShowChat(true)} />
        </main>
      </div>
      
      <div style={styles.footer}>
        <Footer />
      </div>
      
      {showChat && <ChavrutAIChat onClose={() => setShowChat(false)} />}
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)