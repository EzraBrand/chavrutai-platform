import './styles.css'
import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import HeaderNav from './HeaderNav'
import SidebarNav from './SidebarNav'
import ChavrutAIChat from './ChavrutAIChat'
import TabsPanel from './TabsPanel'
import SugyaViewer from './SugyaViewer'

const App = () => {
  const [highlightedSection, setHighlightedSection] = useState(0);
  const [activeTab, setActiveTab] = useState('text');
  
  // Sample data for SugyaViewer
  const sampleHebrewText = [
    "בראשית ברא אלהים",
    "את השמים ואת הארץ"
  ];
  
  const sampleEnglishText = [
    "In the beginning God created",
    "the heaven and the earth"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderNav />
      <div className="flex flex-1">
        <SidebarNav />
        <main className="flex-1">
          <TabsPanel activeTab={activeTab} setActiveTab={setActiveTab} />
          <SugyaViewer 
            hebrewText={sampleHebrewText}
            englishText={sampleEnglishText}
            highlightedSection={highlightedSection}
            onHighlight={setHighlightedSection}
          />
          <ChavrutAIChat />
        </main>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)