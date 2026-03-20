import React from 'react';
import { useChat } from '../context/ChatContext';
import { ChevronLeft, Globe, Book, MessageSquare } from 'lucide-react';

const Settings = ({ onBack }) => {
  const { settings, setSettings } = useChat();

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="p-4 border-b bg-white flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full">
          <ChevronLeft size={20} />
        </button>
        <h2 className="font-bold text-slate-800 text-lg text-left">Settings</h2>
      </div>

      <div className="p-4 space-y-6">
        {/* Language Selection */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-600">
            <Globe size={18} />
            <label className="font-semibold text-sm uppercase tracking-wider">Preferred Language</label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {['English', 'Hindi'].map((lang) => (
              <button
                key={lang}
                onClick={() => setSettings({ ...settings, language: lang })}
                className={`p-3 rounded-xl border-2 transition-all ${
                  settings.language === lang 
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                    : 'border-white bg-white text-slate-600'
                } font-medium`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Subject Selection */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-600">
            <Book size={18} />
            <label className="font-semibold text-sm uppercase tracking-wider">Default Subject</label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {['Math', 'Science', 'English', 'General'].map((sub) => (
              <button
                key={sub}
                onClick={() => setSettings({ ...settings, subject: sub })}
                className={`p-3 rounded-xl border-2 transition-all ${
                  settings.subject === sub 
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                    : 'border-white bg-white text-slate-600'
                } font-medium`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* AI Preferences */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-600">
            <MessageSquare size={18} />
            <label className="font-semibold text-sm uppercase tracking-wider">AI Preferences</label>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-800">Explain Simply</p>
                <p className="text-xs text-slate-500">Use easier vocabulary</p>
              </div>
              <button 
                onClick={() => setSettings({...settings, simpleExplain: !settings.simpleExplain})}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  settings.simpleExplain ? 'bg-indigo-600' : 'bg-slate-300'
                }`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.simpleExplain ? 'translate-x-6' : ''
                }`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
