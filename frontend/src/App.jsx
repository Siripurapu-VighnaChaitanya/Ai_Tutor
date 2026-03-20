import React, { useState } from 'react';
import { ChatProvider } from './context/ChatContext';
import Home from './pages/Home';
import ChatInterface from './components/Chat/ChatInterface';
import Settings from './pages/Settings';
import { Settings as SettingsIcon, MessageSquare } from 'lucide-react';

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
      <div className="h-screen flex flex-col overflow-hidden bg-slate-50">
        <div className="flex-1 overflow-hidden relative">
          {renderView()}
          
          {/* Bottom Navigation (Only in Chat view) */}
          {view !== 'home' && (
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t flex items-center justify-around px-12 z-20">
              <button 
                onClick={() => setView('chat')}
                className={`flex flex-col items-center gap-1 ${view === 'chat' ? 'text-indigo-600' : 'text-slate-400'}`}
              >
                <MessageSquare size={20} />
                <span className="text-[10px] font-bold uppercase tracking-tighter">Chat</span>
              </button>
              <button 
                onClick={() => setView('settings')}
                className={`flex flex-col items-center gap-1 ${view === 'settings' ? 'text-indigo-600' : 'text-slate-400'}`}
              >
                <SettingsIcon size={20} />
                <span className="text-[10px] font-bold uppercase tracking-tighter">Settings</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </ChatProvider>
  );
}

export default App;
