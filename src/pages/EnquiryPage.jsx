import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Home, ArrowLeft, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Groq from 'groq-sdk';
import { saveLead } from '../store';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

// Track what info we've collected from the conversation
const extractLeadInfo = (messages) => {
  const text = messages.map((m) => m.content).join(' ').toLowerCase();
  const lead = {};

  // Name extraction - look for patterns like "I'm John", "my name is John", "call me John"
  const namePatterns = [
    /(?:i'?m|my name is|call me|i am)\s+([a-z][a-z\s]{1,30}?)(?:\s*[,.\n]|$)/i,
    /(?:name(?:'?s| is)?)[:\s]+([a-z][a-z\s]{1,30}?)(?:\s*[,.\n]|$)/i,
  ];
  for (const pattern of namePatterns) {
    const match = text.match(pattern);
    if (match) { lead.name = match[1].trim(); break; }
  }

  // Phone extraction
  const phoneMatch = text.match(/(?:\+?234|0)[\s-]?[789]\d[\s-]?\d{4}[\s-]?\d{4}|\b0[789]\d{9}\b|\b\d{11}\b/);
  if (phoneMatch) lead.phone = phoneMatch[0].replace(/[\s-]/g, '');

  // Email extraction
  const emailMatch = text.match(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) lead.email = emailMatch[0];

  // Property interest
  const propertyKeywords = ['villa', 'penthouse', 'duplex', 'apartment', 'lekki', 'ikoyi', 'banana island', 'victoria island', 'abuja', 'maitama', 'jabi'];
  const interests = propertyKeywords.filter(k => text.includes(k));
  if (interests.length > 0) lead.interest = interests.join(', ');

  return lead;
};

const SYSTEM_PROMPT = `You are Leo, a friendly and warm property advisor at Leovin Properties — a premium real estate agency in Nigeria.

Your personality:
- Conversational, genuine, and never robotic. You chat like a trusted friend who happens to know everything about luxury real estate.
- Warm and a little playful, but always professional. Think: knowledgeable friend, not stiff corporate assistant.
- You use casual language where appropriate — "So what kind of place are you dreaming about?" rather than "Please specify your property requirements."
- You're Nigerian-aware — you know locations like Lekki, Ikoyi, Banana Island, Victoria Island (Lagos), Maitama, Asokoro, Jabi (Abuja) very well.
- You gently and naturally collect the client's name, phone number, and email during conversation — not all at once, but woven in naturally as the conversation progresses.
- For example, after a few messages, you might say something like: "By the way, I don't think I caught your name — what do people call you?" 
- And later: "If something comes up that matches what you're looking for, what's the best number to reach you on?"
- Never ask for all info at once in a form-like way. It should feel natural.

Leovin Properties listings (use these to answer questions):
- Ocean View Villa | Lekki Phase 1, Lagos | ₦350M | 5 beds, 6 baths, 750 sqm | Features: ocean views, private pool
- Lakeside Luxury Retreat | Maitama, Abuja | ₦480M | 6 beds, 7 baths, 920 sqm | Features: lake views, gardens, chef's kitchen
- Beachfront Paradise Residence | Banana Island, Lagos | ₦850M | 6 beds, 8 baths, 1,200 sqm | Features: direct ocean access, resort amenities
- Metro Skyline Penthouse | Victoria Island, Lagos | ₦290M | 3 beds, 4 baths, 450 sqm | Features: floor-to-ceiling windows, city views
- Contemporary Golf Estate | Jabi, Abuja | ₦410M | 5 beds, 5 baths, 800 sqm | Features: golf course adjacent, smart home, spa
- Cliffside Modern Smart Home | Ikoyi, Lagos | ₦320M | 4 beds, 4 baths, 520 sqm | Features: smart home automation, rooftop lounge

When relevant, suggest booking a property inspection. If the client wants to book, ask what date works for them.
Keep messages relatively short and conversational — avoid long paragraphs unless explaining something complex.`;

export default function EnquiryPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey there! 👋 Welcome to Leovin Properties. I'm Leo — I help people find their perfect home here in Nigeria. Whether you're looking to buy, invest, or just exploring options, I've got you. So, what brings you here today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [leadSaved, setLeadSaved] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Try to save lead after each exchange if we have enough info
  useEffect(() => {
    if (messages.length < 4) return;
    const lead = extractLeadInfo(messages);
    if ((lead.name || lead.phone || lead.email) && !leadSaved) {
      saveLead({ name: lead.name, phone: lead.phone, email: lead.email, interest: lead.interest });
      setLeadSaved(true);
    }
    if (leadSaved && (lead.name || lead.phone || lead.email)) {
      // Keep updating with new info
      saveLead({ name: lead.name, phone: lead.phone, email: lead.email, interest: lead.interest });
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await groq.chat.completions.create({
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages,
          userMessage,
        ],
        model: 'llama3-8b-8192',
        temperature: 0.85,
        max_tokens: 400,
      });

      const botMessage = {
        role: 'assistant',
        content:
          response.choices[0]?.message?.content ||
          "Hmm, I'm having a bit of trouble on my end right now. Mind trying again in a second?",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Groq API Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Apologies, I seem to be having connection issues. Give it a moment and try again — I'm not going anywhere! 😊",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1f16] flex flex-col">
      {/* Top Bar */}
      <header className="bg-black/60 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-white hover:text-[#d4af37] transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>

        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-emerald-900 border border-[#d4af37]/50 flex items-center justify-center text-[#d4af37]">
            <Home className="w-4 h-4" />
          </div>
          <span className="font-serif text-white font-semibold">
            Leovin <span className="text-[#d4af37] italic font-normal">Properties</span>
          </span>
        </div>

        <div className="w-24" /> {/* Spacer */}
      </header>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full px-4 py-6">
        {/* Chat Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-emerald-900/40 border border-[#d4af37]/30 rounded-full px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <span className="text-xs text-[#d4af37] font-medium uppercase tracking-wider">Property Advisor</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Chat with <span className="text-[#d4af37] italic font-normal">Leo</span>
          </h1>
          <p className="text-emerald-200/60 text-sm mt-2">
            Your personal guide to finding the perfect property in Nigeria
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-4 mb-6 overflow-y-auto">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-emerald-900 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] flex-shrink-0 mb-1 text-xs font-bold">
                  L
                </div>
              )}
              <div
                className={`max-w-[75%] sm:max-w-[65%] px-5 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#d4af37] text-black rounded-br-sm font-medium'
                    : 'bg-emerald-900/60 border border-emerald-800/50 text-emerald-50 rounded-bl-sm'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start items-end gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-900 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] flex-shrink-0 text-xs font-bold">
                L
              </div>
              <div className="bg-emerald-900/60 border border-emerald-800/50 px-5 py-3 rounded-2xl rounded-bl-sm">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#d4af37]/70 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[#d4af37]/70 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[#d4af37]/70 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-emerald-950/80 border border-emerald-800/50 rounded-2xl p-3 backdrop-blur-md shadow-2xl">
          <form onSubmit={handleSend} className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-transparent text-white placeholder-emerald-400/60 text-sm px-2 py-1.5 focus:outline-none"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-10 h-10 rounded-xl bg-[#d4af37] hover:bg-yellow-400 text-black flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        <p className="text-center text-[10px] text-emerald-200/30 mt-3">
          Conversations may be reviewed by our team to improve service quality.
        </p>
      </div>
    </div>
  );
}
