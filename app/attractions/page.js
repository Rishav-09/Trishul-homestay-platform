"use client";

import React, { useState } from "react";
import { attractions } from "@/data/attractions";
import AiPlanner from "@/components/AiPlanner";
import { MapPin, Compass, ArrowUpRight, Flame, CloudSun, Calendar } from "lucide-react";

export default function Attractions() {
  const [selectedAttraction, setSelectedAttraction] = useState(null);

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 font-sans">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">Adventure & Pilgrimage</span>
        <h1 className="text-4xl font-extrabold text-slate-800 dark:text-white sm:text-5xl tracking-tight">
          Explore Chopta Valley
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-light leading-relaxed">
          Chopta is the starting base for some of the most beautiful and spiritually rich trails in the Garhwal Himalayas. Download route guidelines and trek responsibly.
        </p>
      </div>

      {/* Chopta Altitude Elevation Visual (High-value design block) */}
      <div className="glass p-6 sm:p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 bg-white/40 dark:bg-slate-900/40 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Compass className="h-5 w-5 text-emerald-500" />
            <span>Elevation Profile & Trek Difficulty Guide</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-light">Acclimatization is essential. Here is the relative altitude scaling of local destinations.</p>
        </div>
        
        {/* Simple responsive CSS bar chart */}
        <div className="space-y-4 pt-2">
          {/* Chandrashila */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-700 dark:text-slate-300">Chandrashila Peak (Summit)</span>
              <span className="text-emerald-600 dark:text-emerald-400">4,000 meters (Extreme Peak)</span>
            </div>
            <div className="w-full bg-slate-200/50 dark:bg-slate-800 rounded-full h-3">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full w-full" />
            </div>
          </div>
          {/* Tungnath */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-700 dark:text-slate-300">Tungnath Temple (Highest Shiva Shrine)</span>
              <span className="text-emerald-600 dark:text-emerald-400">3,680 meters</span>
            </div>
            <div className="w-full bg-slate-200/50 dark:bg-slate-800 rounded-full h-3">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full w-[92%]" />
            </div>
          </div>
          {/* Chopta Base */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-700 dark:text-slate-300">Chopta Meadows (Base Village/Homestays)</span>
              <span className="text-slate-500">2,680 meters</span>
            </div>
            <div className="w-full bg-slate-200/50 dark:bg-slate-800 rounded-full h-3">
              <div className="bg-gradient-to-r from-emerald-500 to-slate-400 dark:to-slate-600 h-3 rounded-full w-[67%]" />
            </div>
          </div>
          {/* Deoria Tal */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-700 dark:text-slate-300">Deoria Tal Lake (Reflective Alpine Water)</span>
              <span className="text-emerald-500">2,438 meters</span>
            </div>
            <div className="w-full bg-slate-200/50 dark:bg-slate-800 rounded-full h-3">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-3 rounded-full w-[61%]" />
            </div>
          </div>
        </div>
      </div>

      {/* Attractions Grid List */}
      <div className="space-y-16">
        {attractions.map((attraction, idx) => (
          <div
            key={attraction.id}
            className={`flex flex-col lg:flex-row gap-8 lg:gap-12 items-center ${
              idx % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div className="w-full lg:w-1/2 relative h-80 sm:h-96 rounded-3xl overflow-hidden glass border border-slate-200/50 dark:border-slate-800/50 shadow-lg">
              <img
                src={attraction.image}
                alt={attraction.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3.5 py-1.5 bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold rounded-full flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3 text-emerald-400" />
                  {attraction.altitude}
                </span>
                <span className="px-3.5 py-1.5 bg-emerald-600/90 backdrop-blur-md text-white text-xs font-semibold rounded-full">
                  {attraction.difficulty}
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1.5">
                  {attraction.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white font-sans">{attraction.title}</h2>
              </div>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                {attraction.description}
              </p>

              <div className="p-4 bg-slate-100/50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl text-xs space-y-2 text-slate-700 dark:text-slate-300">
                <div className="font-semibold text-emerald-600 dark:text-emerald-400 text-sm flex items-center gap-1.5 mb-1">
                  <Flame className="h-4 w-4" /> Key Highlight:
                </div>
                <div>{attraction.highlight}</div>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 gap-4 border-t border-slate-200 dark:border-slate-800 pt-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Trek Distance</span>
                  <div className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                    <Compass className="h-4 w-4 text-emerald-500" />
                    <span>{attraction.distance}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Best Visiting Months</span>
                  <div className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-emerald-500" />
                    <span>{attraction.bestTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sustainable Trekking Guidelines advisory banner */}
      <section className="glass p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-transparent flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl text-left">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <CloudSun className="h-5 w-5 text-emerald-500 animate-pulse" />
            <span>Need a Local Wilderness Guide?</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed">
            Himalayan weather changes rapidly. We coordinate with registered village youths who act as safety guides. Supports rural livelihoods and guarantees safety.
          </p>
        </div>
        <a
          href="/contact"
          className="px-6 py-3.5 bg-slate-900 hover:bg-emerald-600 dark:bg-slate-800 dark:hover:bg-emerald-500 text-white font-semibold rounded-2xl text-sm transition-all shadow-md shrink-0"
        >
          Hire Local Guide
        </a>
      </section>

      {/* Chat Bot */}
      <AiPlanner />
    </div>
  );
}
