import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Loader2, Mic, MicOff, Paperclip, Plus, Settings2, Book } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '../../context/ChatContext';
import MessageBubble from './MessageBubble';

const ChatInterface = () => {
  const { messages, sendMessage, loading, settings, setSettings, clearChat } = useChat();
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [image, setImage] = useState(null);
  const [showSubjectMenu, setShowSubjectMenu] = useState(false);
  const scrollRef = useRef(null);
  const recognitionRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = settings.language === 'Hindi' ? 'hi-IN' : 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => prev + (prev ? ' ' : '') + transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [settings.language]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if ((!input.trim() && !image) || loading) return;
    sendMessage(input, image);
    setInput('');
    setImage(null);
  };

  const subjects = ['Math', 'Science', 'English', 'General'];

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto relative pb-28 md:pb-32 px-2 md:px-0">
      {/* Header - Glassmorphism */}
      <div className="mt-4 p-4 md:p-6 border-b glass flex items-center justify-between sticky top-0 z-40 rounded-[2rem] shadow-2xl mx-1 md:mx-0">
        <div className="flex items-center gap-3 md:gap-4 relative">
          <motion.div 
            whileHover={{ rotate: 15 }}
            className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)] border border-white/20"
          >
            <Sparkles size={22} className="text-white" />
          </motion.div>
          <div className="cursor-pointer group" onClick={() => setShowSubjectMenu(!showSubjectMenu)}>
            <div className="flex items-center gap-2">
              <h2 className="font-black text-white tracking-tight text-lg md:text-xl drop-shadow-sm">{settings.subject} Tutor</h2>
              <Book size={16} className="text-indigo-300 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.5)]"></span>
              <p className="text-[10px] md:text-[11px] text-indigo-100/70 uppercase tracking-[0.2em] font-black">
                 {settings.language} MODE
              </p>
            </div>
          </div>

          {/* Quick Subject Switcher Dropdown */}
          <AnimatePresence>
            {showSubjectMenu && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-16 left-0 w-48 glass rounded-3xl p-3 shadow-2xl z-50 border border-white/10 backdrop-blur-3xl overflow-hidden"
              >
                <p className="text-[9px] font-black text-indigo-300 uppercase tracking-widest mb-2 ml-2">Switch Tutor</p>
                {subjects.map(s => (
                  <button 
                    key={s}
                    onClick={() => {
                      setSettings({ ...settings, subject: s });
                      setShowSubjectMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                      settings.subject === s ? 'bg-indigo-500 text-white' : 'text-indigo-100/60 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2">
          <motion.button 
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.9 }}
            onClick={clearChat}
            className="p-3 md:p-4 rounded-2xl glass text-white shadow-xl group border-white/10"
            title="Start New Chat"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform" />
          </motion.button>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scroll-smooth pt-8"
      >
        <AnimatePresence initial={false}>
          {messages.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-full flex flex-col items-center justify-center text-center px-6 md:px-10"
            >
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="p-8 md:p-10 rounded-[3rem] bg-gradient-to-tr from-white/10 to-indigo-500/10 backdrop-blur-3xl mb-8 border border-white/10 shadow-2xl"
              >
                <Sparkles size={64} className="text-indigo-300 opacity-80" />
              </motion.div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight leading-tight">Ready to Learn?</h3>
              <p className="text-sm md:text-base text-indigo-100/60 max-w-sm leading-relaxed font-medium">
                Ask me any {settings.subject} question, upload a photo, or just speak your mind!
              </p>
            </motion.div>
          ) : (
            messages.map((msg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <MessageBubble message={msg} />
                {msg.image && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`flex mb-4 px-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="p-1.5 glass rounded-2xl shadow-xl">
                      <img src={msg.image} alt="Upload" className="max-w-[280px] rounded-xl border border-white/10" />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>

        {loading && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start mb-8"
          >
            <div className="glass rounded-3xl rounded-tl-none p-6 shadow-2xl space-y-3 w-64 border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <Loader2 size={14} className="animate-spin text-indigo-400" />
                <span className="text-[10px] text-indigo-100/50 font-black tracking-widest uppercase">Analyzing...</span>
              </div>
              <div className="space-y-2">
                <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                  <motion.div 
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent"
                  />
                </div>
                <div className="h-2.5 w-[85%] bg-white/5 rounded-full overflow-hidden relative">
                  <motion.div 
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.2 }}
                    className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area - Glassmorphism */}
      <div className="p-6 glass border-t border-white/10 sticky bottom-0 z-30 rounded-t-[2.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.3)]">
        {image && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="mb-4 relative inline-block p-1.5 glass rounded-2xl shadow-2xl"
          >
            <img src={image} alt="Preview" className="w-28 h-28 object-cover rounded-xl border border-white/10" />
            <button 
              onClick={() => setImage(null)}
              className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg shadow-2xl hover:bg-red-600 transition-colors border-2 border-white/20 font-bold"
            >
              ×
            </button>
          </motion.div>
        )}
        
        <form onSubmit={handleSend} className="relative flex items-center gap-4">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            accept="image/*" 
            className="hidden" 
          />
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="p-4 glass rounded-full text-indigo-100 hover:text-white transition-all shadow-lg"
            title="Attach Image"
          >
            <Paperclip size={24} />
          </motion.button>
          
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={image ? "Explain this photo..." : `Ask your ${settings.subject} question...`}
              className={`w-full bg-white/5 backdrop-blur-3xl rounded-[1.5rem] px-8 py-5 pr-32 text-base text-white placeholder:text-indigo-100/40 focus:outline-none focus:ring-2 transition-all border border-white/10 shadow-inner ${
                isListening ? 'ring-2 ring-red-500 bg-red-500/10' : 'focus:ring-indigo-500/50'
              }`}
              disabled={loading}
            />
            
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={toggleListening}
                className={`p-3 rounded-full transition-all shadow-xl ${
                  isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-white/10 text-indigo-200 hover:text-white hover:bg-white/20'
                }`}
                title={isListening ? "Stop listening" : "Voice input"}
              >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, x: 2, backgroundColor: '#4f46e5' }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading || (!input.trim() && !image)}
                className="p-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-xl shadow-indigo-950/50"
              >
                <Send size={20} />
              </motion.button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
