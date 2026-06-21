"use client";

import React, { useState } from "react";
import { Sparkles, MessageSquare, X, Send, Bot, CheckCircle2 } from "lucide-react";

export default function AiPlanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "m-init",
      sender: "bot",
      text: "Namaste! I am the EcoStay AI Assistant. I can design your Himalayan itinerary, suggest trekking paths, or help you understand eco-guidelines. What would you like to know about Chopta?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const presetQuestions = [
    { q: "Plan a 3-day Chopta itinerary", id: "itinerary" },
    { q: "What should I pack for Tungnath?", id: "packing" },
    { q: "How to travel sustainably in Chopta?", id: "eco" },
    { q: "Tell me about winter snow levels", id: "winter" }
  ];

  const answers = {
    itinerary: "Here is your custom 3-Day Eco-Itinerary for Chopta:\n\n• **Day 1: Arrival & Acclimatization**\nArrive at your EcoStay Homestay in Chopta (2,680m). Walk around the rhododendron forest. Dine on traditional 'Gahat Dal' and hot millet rotis.\n\n• **Day 2: Tungnath & Chandrashila Peak**\nStart early at 6 AM. Trek 3.5 km to Tungnath Shiva Temple. Continue 1.5 km to the Chandrashila Summit (4,000m) for a 360° Himalayan views. Return to homestay for hot local herbal tea.\n\n• **Day 3: Deoria Tal Reflection Lake**\nDrive to Sari Village (45 mins), then hike 2.3 km through pine forests to the lake. Watch Chaukhamba reflect in the emerald lake. Depart in afternoon.",
    packing: "Essential packing guide for Tungnath & Chandrashila:\n\n• **Layering is key:** Windcheater jacket, thermal innerwear, fleece jacket (temperatures dip below 5°C even in summer!).\n• **Footwear:** Waterproof trekking shoes with deep treads.\n• **Eco-kit:** Reusable water bottle (mineral bottles are banned in Chopta meadows) and trash-bag for waste wrappers.\n• **Medical:** Altitude sickness pills, pain sprays, and band-aids.",
    eco: "EcoStay AI is committed to 100% Sustainable Tourism. Here is how you can help:\n\n1. **Zero Single-Use Plastics:** Carry steel bottles. Refill stations are present at all approved homestays.\n2. **Support Village Economy:** Buy local organic farm produce (Himalayan kidney beans, ghee, wild honey).\n3. **Conserve Resources:** Chopta is off-grid; electricity is solar-powered. Turn off lights, heaters, and charge devices only during daylight.",
    winter: "Chopta turns into a white wonderland from December to March:\n\n• **Snowfall:** Frequent snow blockades roads between Chopta and Ukhimath. Drive with caution.\n• **Homestays:** Most homestays utilize fireplace wood heating. Ensure you book a Deluxe room with warm insulation.\n• **Tungnath Trek:** The trek is fully covered in deep snow. Guided trekking with snow spikes is mandatory."
  };

  const handleSelectQuestion = (qText, key) => {
    // Append user query
    const userMsg = {
      id: "user-" + Date.now(),
      sender: "user",
      text: qText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const botMsg = {
        id: "bot-" + Date.now(),
        sender: "bot",
        text: answers[key] || "I'm still learning about that! You can check details with our coordination desk via the Contact Page.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 900);
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
        </div>

        {/* Preset Quick Actions */}
        <div className="px-4 py-3 border-t border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shrink-0">
          <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">Ask AI about Chopta:</span>
          <div className="grid grid-cols-2 gap-2">
            {presetQuestions.map((pq) => (
              <button
                key={pq.id}
                onClick={() => handleSelectQuestion(pq.q, pq.id)}
                className="text-[11px] font-medium text-left p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 text-slate-700 dark:text-slate-300 transition-all text-ellipsis overflow-hidden whitespace-nowrap"
              >
                {pq.q}
              </button>
            ))}
          </div>
        </div>

        {/* Info footer */}
        <div className="bg-slate-50 dark:bg-slate-950 px-4 py-2 text-center text-[10px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-900 shrink-0 flex items-center justify-center gap-1">
          <CheckCircle2 className="h-3 w-3 text-emerald-500" />
          <span>Local insights verified by Chopta Eco-Tourism TBI Committee.</span>
        </div>
      </div>
    </>
  );
}
