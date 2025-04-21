import React from 'react';
import { BookMarked, Search, Menu, User, SlidersHorizontal, MessageCircle } from 'lucide-react';

interface HeaderNavProps {
  onShowChat: () => void;
}

const HeaderNav: React.FC<HeaderNavProps> = ({ onShowChat }) => {
  // Inline styles for more immediate styling effect
  const styles = {
    header: {
      padding: '1rem',
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    logoBox: {
      backgroundColor: '#92400e', // amber-800
      color: '#fffbeb', // amber-50
      padding: '0.5rem',
      borderRadius: '0.25rem',
      marginRight: '0.75rem',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    logoText: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      fontFamily: "'Crimson Pro', 'Palatino Linotype', 'Book Antiqua', Palatino, serif",
    },
    navLink: {
      padding: '0.25rem 0.75rem',
      borderRadius: '0.25rem',
      transition: 'background-color 0.2s',
    },
    searchContainer: {
      position: 'relative',
    },
    searchInput: {
      padding: '0.25rem 0.75rem',
      paddingRight: '2rem',
      border: '1px solid #fde68a',
      borderRadius: '0.25rem',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    },
    searchIcon: {
      position: 'absolute',
      right: '0.5rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#f59e0b', // amber-500
    },
    signInButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      padding: '0.375rem 0.75rem',
      backgroundColor: '#92400e', // amber-800
      color: '#fffbeb', // amber-50
      borderRadius: '0.25rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      transition: 'background-color 0.2s',
    },
    chatButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      padding: '0.375rem 0.75rem',
      backgroundColor: '#b45309', // amber-700
      color: '#fffbeb', // amber-50
      borderRadius: '0.25rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      transition: 'background-color 0.2s',
      marginRight: '0.75rem',
    },
    settingsButton: {
      color: '#92400e', // amber-800
      padding: '0.375rem',
      borderRadius: '0.25rem',
      transition: 'background-color 0.2s',
    }
  };

  return (
    <header style={styles.header}>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div style={styles.logoContainer}>
            <div style={styles.logoBox}>
              <BookMarked className="h-6 w-6" />
            </div>
            <h1 style={styles.logoText}>
              ChavrutAI
            </h1>
          </div>
          <div className="hidden md:flex space-x-4">
            <button 
              style={styles.navLink} 
              className="hover:bg-amber-200"
            >
              Tractates
            </button>
            <button 
              style={styles.navLink}
              className="hover:bg-amber-200"
            >
              Topics
            </button>
            <button 
              style={styles.navLink}
              className="hover:bg-amber-200"
            >
              Resources
            </button>
            <button 
              style={styles.navLink}
              className="hover:bg-amber-200"
            >
              About
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            style={styles.chatButton}
            className="hidden md:flex hover:bg-amber-800"
            onClick={onShowChat}
          >
            <MessageCircle className="h-4 w-4" />
            <span>Open ChavrutAI Chat</span>
          </button>
          
          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search..."
              style={styles.searchInput}
              className="w-32 md:w-48 focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
            <Search style={styles.searchIcon} className="h-4 w-4" />
          </div>
          <button className="md:hidden">
            <Menu className="h-6 w-6 text-amber-800" />
          </button>
          <button 
            className="hidden md:flex hover:bg-amber-900"
            style={styles.signInButton}
          >
            <User className="h-4 w-4" />
            <span>Sign In</span>
          </button>
          <button 
            className="hidden md:block hover:bg-amber-200"
            style={styles.settingsButton}
          >
            <SlidersHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderNav;
