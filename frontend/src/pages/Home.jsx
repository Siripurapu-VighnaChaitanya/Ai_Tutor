import React from 'react';
import { Sparkles, BookOpen, Globe, Shield } from 'lucide-react';

const Home = ({ onStart }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-4xl mx-auto">
        <div className="mb-8 animate-bounce">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles size={32} className="text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Your Personal <span className="text-indigo-600">AI Tutor</span>
        </h1>
        <p className="text-lg text-slate-600 mb-8 max-w-xl">
          Learn anywhere, even with low internet. Simple explanations for Math, Science, and English.
        </p>

        <button 
          onClick={onStart}
          className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl hover:shadow-indigo-200 active:scale-95 flex items-center gap-2"
        >
          Start Learning <BookOpen size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
            <Globe className="text-indigo-600 mb-4" size={24} />
            <h3 className="font-bold text-slate-800">Hindi/English</h3>
            <p className="text-sm text-slate-500">Toggle between languages easily.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
            <Shield className="text-indigo-600 mb-4" size={24} />
            <h3 className="font-bold text-slate-800">Offline Access</h3>
            <p className="text-sm text-slate-500">Cache conversations for later.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
            <Sparkles className="text-indigo-600 mb-4" size={24} />
            <h3 className="font-bold text-slate-800">Context Memory</h3>
            <p className="text-sm text-slate-500">I remember what we discussed.</p>
          </div>
        </div>
      </main>

      <footer className="p-8 text-center text-slate-400 text-sm">
        Built for Rural India with ❤️
      </footer>
    </div>
  );
};

export default Home;
