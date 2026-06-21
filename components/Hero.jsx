"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, Users, MapPin, Search, ArrowRight } from "lucide-react";

export default function Hero() {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState({
    dates: "",
    guests: "2 Guests",
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Simulate booking query params and navigate to /rooms
    router.push(`/rooms?guests=${encodeURIComponent(searchParams.guests)}`);
  };

  return (
    <div className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Background Mountain Image & Gradient Overlays */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 transform scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80')`,
        }}
      />
      <div className="absolute inset-0 hero-overlay" />

      {/* Decorative Floating Alpine Elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white mt-8 md:mt-0">
        {/* Startup Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-6 animate-fade-in">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          Next-Gen Sustainable Homestays
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4 font-sans leading-tight">
          Experience Himalayan <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
            Village Life
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto font-sans font-light mb-10 leading-relaxed">
          Stay in the Heart of Chopta. Direct booking, zero commissions, and immersive local tourism powered by EcoStay AI.
        </p>

        {/* Hero Actions */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
          <Link
            href="/rooms"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:scale-[1.02]"
          >
            <span>Explore Rooms</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/attractions"
            className="px-8 py-4 bg-white/10 hover:bg-white/25 backdrop-blur-md text-white font-semibold rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-[1.02]"
          >
            Guide to Chopta
          </Link>
        </div>

        {/* Floating Search Widget (Airbnb / Booking style) */}
        <form
          onSubmit={handleSearchSubmit}
          className="w-full max-w-4xl mx-auto glass p-3 sm:p-4 rounded-3xl border border-white/10 shadow-2xl flex flex-col md:flex-row items-center gap-4 text-left"
        >
          {/* Location details (Chopta, fixed) */}
          <div className="flex items-center gap-3 w-full md:w-1/3 px-4 py-2 border-b md:border-b-0 md:border-r border-slate-200/20">
            <MapPin className="h-6 w-6 text-emerald-400 shrink-0" />
            <div className="flex-grow">
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Destination</label>
              <span className="block text-sm font-semibold text-white">Chopta Valley, Himalayas</span>
            </div>
          </div>

          {/* Date Picker Selector */}
          <div className="flex items-center gap-3 w-full md:w-1/3 px-4 py-2 border-b md:border-b-0 md:border-r border-slate-200/20">
            <Calendar className="h-6 w-6 text-emerald-400 shrink-0" />
            <div className="flex-grow">
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Select Dates</label>
              <input
                type="text"
                placeholder="Choose travel dates"
                value={searchParams.dates}
                onChange={(e) => setSearchParams({ ...searchParams, dates: e.target.value })}
                className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none placeholder-slate-400 mt-0.5"
                onFocus={(e) => e.target.type = "date"}
                onBlur={(e) => {
                  if (!e.target.value) e.target.type = "text";
                }}
              />
            </div>
          </div>

          {/* Guest Selector */}
          <div className="flex items-center gap-3 w-full md:w-1/4 px-4 py-2">
            <Users className="h-6 w-6 text-emerald-400 shrink-0" />
            <div className="flex-grow">
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Guests</label>
              <select
                value={searchParams.guests}
                onChange={(e) => setSearchParams({ ...searchParams, guests: e.target.value })}
                className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer mt-0.5"
              >
                <option value="1 Guest" className="text-slate-800">1 Guest</option>
                <option value="2 Guests" className="text-slate-800">2 Guests</option>
                <option value="3 Guests" className="text-slate-800">3 Guests</option>
                <option value="4+ Guests" className="text-slate-800">4+ Guests</option>
              </select>
            </div>
          </div>

          {/* Search CTA */}
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl flex items-center justify-center gap-2 font-semibold transition-all duration-300 md:ml-auto"
          >
            <Search className="h-5 w-5" />
            <span className="md:hidden lg:inline">Find Stays</span>
          </button>
        </form>
      </div>
    </div>
  );
}
