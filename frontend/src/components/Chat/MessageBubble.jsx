import React from 'react';
import { useChat } from '../../context/ChatContext';

const MessageBubble = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
        isUser 
          ? 'bg-indigo-600 text-white rounded-tr-none' 
          : message.isError 
            ? 'bg-red-50 text-red-600 border border-red-100 rounded-tl-none'
            : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
      }`}>
        <p className="text-sm md:text-base whitespace-pre-wrap">{message.content}</p>
        <span className={`text-[10px] block mt-1 opacity-60 ${isUser ? 'text-right' : 'text-left'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
