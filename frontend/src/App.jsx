import React, { useState } from 'react';
import { ChatProvider } from './context/ChatContext';
import Home from './pages/Home';
import ChatInterface from './components/Chat/ChatInterface';
import Settings from './pages/Settings';
import { Settings as SettingsIcon, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const [view, setView] = useState('home'); // 'home', 'chat', 'settings'

  const renderView = () => {
    switch(view) {
      case 'home':
        return <Home onStart={() => setView('chat')} />;
      case 'chat':
        return <ChatInterface />;
      case 'settings':
        return <Settings onBack={() => setView('chat')} />;
      default:
        return <Home onStart={() => setView('chat')} />;
    }
  };

  return (
    <ChatProvider>
      <div className="h-screen flex flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden relative">
          {renderView()}
          
          {/* Bottom Navigation (Only in Chat view) */}
          {view !== 'home' && (
            <div className="absolute bottom-0 left-0 right-0 h-20 glass border-t border-white/10 flex items-center justify-around px-6 md:px-24 z-50 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.4)]">
              <motion.button 
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setView('chat')}
                className={`flex flex-col items-center gap-1.5 transition-all ${view === 'chat' ? 'text-white' : 'text-indigo-100/40 hover:text-indigo-100'}`}
              >
                <div className={`p-2 rounded-xl transition-all ${view === 'chat' ? 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]' : ''}`}>
                  <MessageSquare size={22} />
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.2em]">Chat</span>
              </motion.button>
              <motion.button 
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setView('settings')}
                className={`flex flex-col items-center gap-1.5 transition-all ${view === 'settings' ? 'text-white' : 'text-indigo-100/40 hover:text-indigo-100'}`}
              >
                <div className={`p-2 rounded-xl transition-all ${view === 'settings' ? 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]' : ''}`}>
                  <SettingsIcon size={22} />
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.2em]">Settings</span>
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </ChatProvider>
  );
}

export default App;
