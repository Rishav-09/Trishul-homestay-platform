"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, MessageSquare, X, Send, Bot, CheckCircle2, AlertCircle } from "lucide-react";

export default function AiPlanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [toast, setToast] = useState(null); // { message: string, type: "error" | "success" }
  const [messages, setMessages] = useState([
    {
      id: "m-init",
      sender: "bot",
      text: "Namaste! I am the EcoStay AI Assistant. I can design your Himalayan itinerary, suggest trekking paths, or help you understand eco-guidelines. What would you like to know about Chopta?",
      timestamp: "Just now"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef(null);

  // Auto-scroll to the bottom when messages or typing state changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Handle toast timeout
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const presetQuestions = [
    { q: "Plan a 3-day Chopta itinerary", id: "itinerary" },
    { q: "What should I pack for Tungnath?", id: "packing" },
    { q: "How to travel sustainably in Chopta?", id: "eco" },
    { q: "Tell me about winter snow levels", id: "winter" }
  ];

  const handleSendMessage = async (textToSend) => {
    if (!textToSend.trim() || isTyping) return;

    const userText = textToSend.trim();
    
    // Add user message
    const userMsg = {
      id: "user-" + Date.now(),
      sender: "user",
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update state to include user message and show typing loader
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ messages: updatedMessages })
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Add bot response
      const botMsg = {
        id: "bot-" + Date.now(),
        sender: "bot",
        text: data.text || "I'm sorry, I couldn't generate a response. Please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error("AI service error:", err);
      setToast({
        message: err.message || "Failed to connect to the AI Assistant. Please check your network or API settings.",
        type: "error"
      });
      
      // Append a fallback message in the chat as well
      const errorMsg = {
        id: "bot-err-" + Date.now(),
        sender: "bot",
        text: "⚠️ Connection Failed: I couldn't reach the backend service. Please check if the server is running and GEMINI_API_KEY is configured properly.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 animate-bounce group"
        aria-label="Open AI Planner"
      >
        <Sparkles className="h-6 w-6 group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-600 border-2 border-white text-[8px] items-center justify-center font-bold">AI</span>
        </span>
      </button>

      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed bottom-28 right-6 z-55 flex items-center gap-2 px-4 py-3 bg-red-500 dark:bg-red-600 text-white rounded-xl shadow-2xl animate-fade-in border border-red-400 max-w-[90vw] sm:max-w-[400px]">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p className="text-xs font-semibold">{toast.message}</p>
        </div>
      )}

      {/* Slide-out/Overlay Chat window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[90vw] sm:w-[420px] h-[550px] glass rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-800/80 transition-all duration-300 transform origin-bottom-right flex flex-col ${
          isOpen ? "scale-100 opacity-100 visible translate-y-0" : "scale-75 opacity-0 invisible translate-y-12"
        }`}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-emerald-500 rounded-lg">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Chopta AI Travel Planner</h4>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Eco-Tourism Specialist
              </span>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Message Logs */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-950/20">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 max-w-[85%] ${
                msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              {msg.sender === "bot" && (
                <div className="p-1.5 bg-emerald-500/10 dark:bg-slate-800 rounded-lg text-emerald-600 dark:text-emerald-400 shrink-0">
                  <Bot className="h-4 w-4" />
                </div>
              )}
              <div className="space-y-1">
                <div
                  className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-emerald-600 text-white rounded-tr-none"
                      : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-slate-700/50 rounded-tl-none whitespace-pre-line shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
                <span className={`block text-[9px] text-slate-400 ${msg.sender === "user" ? "text-right" : ""}`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-2.5 mr-auto">
              <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-600 shrink-0">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-none border border-slate-200/50 dark:border-slate-700/50 flex gap-1 items-center shadow-sm">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Preset Quick Actions */}
        <div className="px-4 py-2.5 border-t border-slate-200/50 dark:border-slate-800/50 bg-slate-50/70 dark:bg-slate-900/70 shrink-0">
          <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1.5">Ask AI about Chopta:</span>
          <div className="flex flex-wrap gap-1.5">
            {presetQuestions.map((pq) => (
              <button
                key={pq.id}
                onClick={() => handleSendMessage(pq.q)}
                disabled={isTyping}
                className="text-[10px] font-medium p-1.5 px-2.5 rounded-full border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 text-slate-700 dark:text-slate-300 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {pq.q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Chat Field Form */}
        <form 
          onSubmit={handleFormSubmit}
          className="px-4 py-3 border-t border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shrink-0 flex gap-2 items-center"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isTyping}
            placeholder={isTyping ? "AI is thinking..." : "Type your travel question..."}
            className="flex-grow text-xs px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>

        {/* Info footer */}
        <div className="bg-slate-50 dark:bg-slate-950 px-4 py-2 text-center text-[10px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-900 shrink-0 flex items-center justify-center gap-1">
          <CheckCircle2 className="h-3 w-3 text-emerald-500" />
          <span>Local insights verified by Chopta Eco-Tourism TBI Committee.</span>
        </div>
      </div>
    </>
  );
}
