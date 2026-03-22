import React from 'react';
import { useChat } from '../context/ChatContext';
import { ChevronLeft, Globe, Book, MessageSquare, Shield, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Settings = ({ onBack }) => {
  const { settings, setSettings } = useChat();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, duration: 0.5 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b glass flex items-center gap-6 sticky top-0 z-30 rounded-b-[2rem] shadow-2xl">
        <motion.button 
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
          whileTap={{ scale: 0.9 }}
          onClick={onBack} 
          className="p-3 rounded-2xl text-white transition-all shadow-lg"
        >
          <ChevronLeft size={24} />
        </motion.button>
        <h2 className="font-black text-white text-2xl tracking-tight leading-none drop-shadow-sm text-left">Settings</h2>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 overflow-y-auto p-6 space-y-8 pb-24"
      >
        {/* Language Selection */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center gap-3 text-indigo-200 ml-2">
            <Globe size={20} className="glow-indigo" />
            <label className="font-black text-[10px] uppercase tracking-[0.3em] font-black">Preferred Language</label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {['English', 'Hindi'].map((lang) => (
              <motion.button
                key={lang}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSettings({ ...settings, language: lang })}
                className={`p-5 rounded-3xl border-2 transition-all flex items-center justify-center gap-2 group ${
                  settings.language === lang 
                    ? 'border-indigo-400 bg-indigo-500/30 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] backdrop-blur-3xl' 
                    : 'border-white/10 bg-white/5 text-indigo-100/60 hover:bg-white/10'
                } font-black text-sm tracking-widest uppercase transition-all`}
              >
                {lang}
                {settings.language === lang && <Sparkles size={14} className="animate-pulse" />}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Subject Selection */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center gap-3 text-indigo-200 ml-2">
            <Book size={20} className="glow-indigo" />
            <label className="font-black text-[10px] uppercase tracking-[0.3em] font-black">Default Subject</label>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Math', 'Science', 'English', 'General'].map((sub) => (
              <motion.button
                key={sub}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSettings({ ...settings, subject: sub })}
                className={`p-5 rounded-3xl border-2 transition-all flex items-center justify-center gap-2 group ${
                  settings.subject === sub 
                    ? 'border-indigo-400 bg-indigo-500/30 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] backdrop-blur-3xl' 
                    : 'border-white/10 bg-white/5 text-indigo-100/60 hover:bg-white/10'
                } font-black text-xs tracking-widest uppercase transition-all`}
              >
                {sub}
                {settings.subject === sub && <Sparkles size={12} className="animate-pulse" />}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* AI Preferences */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center gap-3 text-indigo-200 ml-2">
            <Shield size={20} className="glow-indigo" />
            <label className="font-black text-[10px] uppercase tracking-[0.3em] font-black">AI Guardrails</label>
          </div>
          <div className="glass p-8 rounded-[2.5rem] border-white/10 shadow-xl group">
            <div className="flex items-center justify-between gap-6">
              <div className="space-y-1">
                <p className="font-black text-white text-lg tracking-tight">Explain Simply</p>
                <p className="text-xs text-indigo-100/50 font-medium leading-relaxed">Tailor vocabulary for younger students or beginners.</p>
              </div>
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={() => setSettings({...settings, simpleExplain: !settings.simpleExplain})}
                className={`w-16 h-8 rounded-full transition-all relative shadow-inner p-1 ${
                  settings.simpleExplain ? 'bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.5)]' : 'bg-white/10'
                }`}
              >
                <motion.div 
                  initial={false}
                  animate={{ x: settings.simpleExplain ? 32 : 0 }}
                  className="w-6 h-6 bg-white rounded-full shadow-lg" 
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        className="p-8 text-center text-white text-[9px] font-black tracking-[0.4em] uppercase"
      >
        Settings Updated Locally • Rural India Edition
      </motion.p>
    </div>
  );
};

export default Settings;
