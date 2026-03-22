import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    language: 'English',
    subject: 'General',
    simpleExplain: false
  });

  const API_BASE = 'http://localhost:8001/api';

  useEffect(() => {
    // Load conversations from backend on mount
    fetchConversations();
    
    // Check localStorage for offline cache
    const cached = localStorage.getItem('chat_history');
    if (cached) {
      setMessages(JSON.parse(cached));
    }
  }, []);

  const clearChat = () => {
    setMessages([]);
    setCurrentConversationId(null);
    localStorage.removeItem('chat_history');
  };

  const fetchConversations = async () => {
    try {
      const res = await axios.get(`${API_BASE}/conversations`);
      setConversations(res.data);
    } catch (err) {
      console.error("Error fetching conversations:", err);
    }
  };

  const sendMessage = async (text, image = null) => {
    const userMsg = { role: 'user', content: text, image, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/chat`, {
        message: text,
        conversation_id: currentConversationId,
        subject: settings.subject,
        language: settings.language,
        image
      });

      const aiMsg = { 
        role: 'assistant', 
        content: res.data.response, 
        timestamp: new Date().toISOString() 
      };
      
      setMessages(prev => [...prev, aiMsg]);
      setCurrentConversationId(res.data.conversation_id);
      
      // Update local storage for offline access
      const updatedHistory = [...messages, userMsg, aiMsg];
      localStorage.setItem('chat_history', JSON.stringify(updatedHistory.slice(-20)));

    } catch (err) {
      console.error("Error sending message:", err);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm sorry, I'm having trouble connecting to my brain right now. Please check if Ollama is running.",
        isError: true 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatContext.Provider value={{ 
      messages, setMessages, sendMessage, loading, settings, setSettings, clearChat,
      conversations, currentConversationId, setCurrentConversationId 
    }}>
      {children}
    </ChatContext.Provider>
  );
};
