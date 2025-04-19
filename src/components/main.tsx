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

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderNav />
      <div className="flex flex-1">
        <SidebarNav />
        <main className="flex-1 flex">
          <div className="flex-1 p-4">
            <TabsPanel activeTab={activeTab} setActiveTab={setActiveTab} />
            <SugyaViewer 
              hebrewText={hebrewText}
              englishText={englishText}
              highlightedSection={highlightedSection}
              onHighlight={setHighlightedSection}
            />
          </div>
          <RightSidebar onShowChat={() => setShowChat(true)} />
        </main>
      </div>
      <Footer />
      {showChat && <ChavrutAIChat onClose={() => setShowChat(false)} />}
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)