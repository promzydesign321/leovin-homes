import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import { sendChatMessage } from './chatApi';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Welcome to Elite Estates Nigeria. How may I assist you in finding your luxury property today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const reply = await sendChatMessage([
          {
            role: 'system',
            content: 'You are a luxury real estate AI assistant for Elite Estates in Nigeria. You help clients find high-end residential properties in places like Ikoyi, Victoria Island, Banana Island, and Maitama. Be extremely polite, professional, and concise. Your goal is to guide high-net-worth individuals towards finding their dream home or investment property.'
          },
          ...messages,
          userMessage
        ]);

      const botMessage = {
        role: 'assistant',
        content: reply || 'I apologize, but I am having trouble connecting right now.'
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Groq API Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'I apologize, but I am currently unavailable. Please ensure your API key is properly configured.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 bg-gold-500 text-emerald-950 p-4 rounded-full shadow-2xl z-50 flex items-center justify-center hover:bg-gold-400 transition-colors"
          >
            <MessageSquare size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-96 h-[500px] bg-emerald-900 border border-emerald-800 rounded-2xl shadow-2xl overflow-hidden z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-emerald-950 p-4 border-b border-emerald-800 flex justify-between items-center">
              <div>
                <h3 className="font-serif font-semibold text-gold-500 text-lg">Elite Concierge</h3>
                <p className="text-emerald-200 text-xs">Always at your service</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-emerald-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.role === 'user' 
                        ? 'bg-gold-500 text-emerald-950 rounded-br-none' 
                        : 'bg-emerald-800 text-emerald-50 rounded-bl-none'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-emerald-800 text-emerald-50 p-3 rounded-2xl rounded-bl-none">
                    <Loader2 className="animate-spin" size={16} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-emerald-950 border-t border-emerald-800">
              <form onSubmit={handleSend} className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about properties..."
                  className="flex-1 bg-emerald-900 text-emerald-50 placeholder-emerald-400 border border-emerald-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-gold-500 transition-colors"
                />
                <button 
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-gold-500 text-emerald-950 p-2 rounded-full hover:bg-gold-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
