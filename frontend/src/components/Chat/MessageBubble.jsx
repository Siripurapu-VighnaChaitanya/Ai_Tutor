import React, { useState } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

const MessageBubble = ({ message }) => {
  const isUser = message.role === 'user';
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = (text) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    
    // Clean text of LaTeX markers before speaking
    const cleanText = text.replace(/\$+[^\$]+\$+/g, (match) => match.replace(/\$+/g, ''));
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const renderContent = (content) => {
    if (isUser) return <p className="text-sm md:text-base whitespace-pre-wrap leading-relaxed">{content}</p>;

    // Split by block math $$...$$ first
    const blocks = content.split(/(\$\$.*?\$\$)/gs);
    
    return blocks.map((block, i) => {
      if (block.startsWith('$$') && block.endsWith('$$')) {
        const math = block.slice(2, -2);
        return (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="math-container my-4"
          >
            <BlockMath math={math} />
          </motion.div>
        );
      }
      
      // Split by inline math $...$
      const inlines = block.split(/(\$.*?\$)/g);
      return inlines.map((part, j) => {
        if (part.startsWith('$') && part.endsWith('$')) {
          const math = part.slice(1, -1);
          return (
            <span key={`${i}-${j}`} className="math-container inline-block px-1">
              <InlineMath math={math} />
            </span>
          );
        }
        return <span key={`${i}-${j}`} className="text-sm md:text-base whitespace-pre-wrap leading-relaxed">{part}</span>;
      });
    });
  };
  
  return (
    <div className={`flex w-full mb-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] rounded-[2rem] px-6 py-4 shadow-2xl relative group transition-all ${
        isUser 
          ? 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white rounded-tr-none shadow-[0_10px_30px_rgba(99,102,241,0.3)] border border-white/20' 
          : message.isError 
            ? 'bg-red-500/10 text-red-200 border border-red-500/20 rounded-tl-none backdrop-blur-xl'
            : 'glass text-indigo-50 rounded-tl-none border-white/10'
      }`}>
        {!isUser && !message.isError && (
          <motion.button 
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
            whileTap={{ scale: 0.9 }}
            onClick={() => speak(message.content)}
            className="absolute -right-14 top-0 p-3 rounded-2xl glass text-indigo-100 shadow-2xl border-white/10 opacity-0 group-hover:opacity-100 transition-all"
            title="Read aloud"
          >
            {isSpeaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </motion.button>
        )}
        <div className="math-container font-medium tracking-wide">
          {renderContent(message.content)}
        </div>
        <div className={`flex items-center gap-1 mt-3 opacity-40 ${isUser ? 'justify-end text-indigo-100' : 'justify-start text-indigo-200'}`}>
          <span className="text-[9px] font-black tracking-widest uppercase">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
