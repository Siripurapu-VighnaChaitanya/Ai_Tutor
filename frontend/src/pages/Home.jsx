import React from 'react';
import { Sparkles, BookOpen, Globe, Shield, Book, Atom, Calculator, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = ({ onStart }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      transition: { duration: 10, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center p-6 text-center">
      {/* Background Decorative Icons - Pulsing/Floating */}
      <motion.div variants={floatingVariants} animate="animate" className="absolute top-20 left-[10%] opacity-15 text-indigo-300 hidden md:block">
        <Book size={64} />
      </motion.div>
      <motion.div variants={floatingVariants} animate="animate" className="absolute bottom-40 right-[15%] opacity-15 text-indigo-300 hidden md:block" style={{ animationDelay: '2s' }}>
        <Atom size={80} />
      </motion.div>
      <motion.div variants={floatingVariants} animate="animate" className="absolute top-40 right-[10%] opacity-15 text-indigo-200 hidden md:block" style={{ animationDelay: '4s' }}>
        <Calculator size={70} />
      </motion.div>
      <motion.div variants={floatingVariants} animate="animate" className="absolute bottom-20 left-[15%] opacity-15 text-indigo-400 hidden md:block" style={{ animationDelay: '1s' }}>
        <GraduationCap size={75} />
      </motion.div>

      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 glass max-w-5xl w-full p-10 md:p-20 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/10"
      >
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-tr from-indigo-500 to-violet-600 rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.5)] border border-white/20">
            <Sparkles size={48} className="text-white animate-pulse" />
          </div>
        </motion.div>
        
        <motion.h1 
          variants={itemVariants}
          className="text-6xl md:text-9xl font-black text-white mb-6 tracking-tight leading-[0.9] drop-shadow-2xl"
        >
          Master Any <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-violet-300">Subject</span>
        </motion.h1>

        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-10">
          {['Mathematics', 'Science', 'English', 'History'].map((subject) => (
            <span key={subject} className="px-5 py-2 glass rounded-full text-[10px] font-black text-indigo-100 uppercase tracking-widest border-white/10">
              {subject}
            </span>
          ))}
        </motion.div>

        <motion.p 
          variants={itemVariants}
          className="text-xl md:text-2xl text-indigo-100/60 mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          Your personal 24/7 AI Tutor. Smarter learning, localized for you, and built to work anywhere.
        </motion.p>

        <motion.div variants={itemVariants}>
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(99,102,241,0.6)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="group bg-white text-indigo-950 px-16 py-6 rounded-[2rem] font-black text-2xl hover:bg-slate-100 transition-all shadow-2xl flex items-center gap-4 mx-auto"
          >
            Start Learning 
            <BookOpen size={28} className="group-hover:translate-x-1.5 transition-transform text-indigo-600" />
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          <motion.div variants={itemVariants} whileHover={{ y: -12 }} className="glass p-10 rounded-[2.5rem] border-white/10 flex flex-col items-center hover:bg-white/10 transition-all cursor-default group shadow-lg">
            <div className="p-5 bg-white/10 rounded-[1.5rem] mb-6 group-hover:bg-indigo-500/30 transition-all">
              <Globe className="text-indigo-300" size={32} />
            </div>
            <h3 className="font-bold text-white text-xl mb-3 tracking-tight">Hindi/English</h3>
            <p className="text-sm text-indigo-100/50 leading-relaxed font-semibold">Switch languages instantly for better understanding.</p>
          </motion.div>

          <motion.div variants={itemVariants} whileHover={{ y: -12 }} className="glass p-10 rounded-[2.5rem] border-white/10 flex flex-col items-center hover:bg-white/10 transition-all cursor-default group shadow-lg">
            <div className="p-5 bg-white/10 rounded-[1.5rem] mb-6 group-hover:bg-indigo-500/30 transition-all">
              <Shield className="text-indigo-300" size={32} />
            </div>
            <h3 className="font-bold text-white text-xl mb-3 tracking-tight">Offline First</h3>
            <p className="text-sm text-indigo-100/50 leading-relaxed font-semibold">Learn without limits, with local chat history and caching.</p>
          </motion.div>

          <motion.div variants={itemVariants} whileHover={{ y: -12 }} className="glass p-10 rounded-[2.5rem] border-white/10 flex flex-col items-center hover:bg-white/10 transition-all cursor-default group shadow-lg">
            <div className="p-5 bg-white/10 rounded-[1.5rem] mb-6 group-hover:bg-indigo-500/30 transition-all">
              <Sparkles className="text-indigo-300" size={32} />
            </div>
            <h3 className="font-bold text-white text-xl mb-3 tracking-tight">AI Vision</h3>
            <p className="text-sm text-indigo-100/50 leading-relaxed font-semibold">Upload photos of your textbooks for instant analysis.</p>
          </motion.div>
        </div>
      </motion.main>

      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.4 }}
        className="p-12 text-center text-white text-[10px] font-black tracking-[0.3em] uppercase"
      >
        Technology for Transformation • Rural India
      </motion.footer>
    </div>
  );
};

export default Home;
