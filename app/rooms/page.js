"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import RoomCard from "@/components/RoomCard";
import BookingModal from "@/components/BookingModal";
import AiPlanner from "@/components/AiPlanner";
import { rooms } from "@/data/rooms";
import { Sparkles, Calendar, Coffee, Sun, ThermometerSun, ShieldCheck } from "lucide-react";

function RoomsList() {
  const searchParams = useSearchParams();
  const guestQuery = searchParams.get("guests");
  
  const [filter, setFilter] = useState("all");
  const [filteredRooms, setFilteredRooms] = useState(rooms);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Set default filter based on query params if they came from search widget
  useEffect(() => {
    if (guestQuery) {
      if (guestQuery.includes("4+") || guestQuery.includes("3")) {
        setFilter("family");
      } else {
        setFilter("all");
      }
    }
  }, [guestQuery]);

  useEffect(() => {
    let result = rooms;
    if (filter === "budget") {
      result = rooms.filter(r => r.price <= 2500);
    } else if (filter === "premium") {
      result = rooms.filter(r => r.price > 2500 && r.price < 5000);
    } else if (filter === "family") {
      result = rooms.filter(r => r.price >= 5000);
    }
    setFilteredRooms(result);
  }, [filter]);

  const handleOpenBooking = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 font-sans">
      
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Zero Commissions · Direct Booking</span>
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 dark:text-white sm:text-5xl tracking-tight">
          Himalayan Eco-Homestays
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-light leading-relaxed">
          Select standard, view, or family suites built entirely using traditional techniques and powered by solar/hydro energy in Chopta.
        </p>
      </div>

      {/* Dynamic Filters Bar */}
      <div className="flex flex-wrap items-center justify-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
            filter === "all"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
              : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700"
          }`}
        >
          All Rooms
        </button>
        <button
          onClick={() => setFilter("budget")}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
            filter === "budget"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
              : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700"
          }`}
        >
          Budget Eco-Rooms (≤ ₹2500)
        </button>
        <button
          onClick={() => setFilter("premium")}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
            filter === "premium"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
              : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700"
          }`}
        >
          Premium Peak View (₹2500 - ₹4500)
        </button>
        <button
          onClick={() => setFilter("family")}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
            filter === "family"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
              : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700"
          }`}
        >
          Family Cottages (₹5000+)
        </button>
      </div>

      {/* Search info alert */}
      {guestQuery && (
        <div className="p-4 bg-emerald-50 dark:bg-slate-800/40 border border-emerald-100 dark:border-slate-800 rounded-2xl flex items-center justify-between text-xs sm:text-sm text-slate-700 dark:text-slate-300 max-w-2xl mx-auto shadow-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-emerald-500" />
            <span>Showing options suited for: <strong className="text-emerald-600 dark:text-emerald-400">{guestQuery}</strong> in Chopta Valley.</span>
          </div>
          <button 
            onClick={() => setFilter("all")} 
            className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRooms.map((room) => (
          <RoomCard
            key={room.id}
            image={room.image}
            title={room.title}
            description={room.description}
            price={room.price}
            capacity={room.capacity}
            rating={room.rating}
            reviewsCount={room.reviewsCount}
            amenities={room.amenities}
            onBookNow={() => handleOpenBooking(room)}
          />
        ))}
      </div>

      {/* Grid Features advisories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-slate-200 dark:border-slate-800">
        <div className="glass p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white/40 dark:bg-slate-900/40">
          <div className="p-2.5 bg-amber-500/10 text-amber-600 rounded-xl w-fit mb-4">
            <ThermometerSun className="h-5 w-5" />
          </div>
          <h4 className="font-bold text-sm text-slate-800 dark:text-white">Alpine Insulation</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-light leading-relaxed">
            All rooms utilize local timber insulation and double blankets to block severe mountain chills. Heaters are fueled by eco-pellets.
          </p>
        </div>
        <div className="glass p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white/40 dark:bg-slate-900/40">
          <div className="p-2.5 bg-emerald-500/10 text-emerald-600 rounded-xl w-fit mb-4">
            <Sun className="h-5 w-5" />
          </div>
          <h4 className="font-bold text-sm text-slate-800 dark:text-white">100% Solar Powered</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-light leading-relaxed">
            Homestays are powered by localized solar power grids. USB chargers and hot water showers are solar-thermal based.
          </p>
        </div>
        <div className="glass p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white/40 dark:bg-slate-900/40">
          <div className="p-2.5 bg-teal-500/10 text-teal-600 rounded-xl w-fit mb-4">
            <Coffee className="h-5 w-5" />
          </div>
          <h4 className="font-bold text-sm text-slate-800 dark:text-white">Farm-To-Table Dining</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-light leading-relaxed">
            We serve organic meals made of local hill pulses, finger millets, potatoes, and direct herbal tea blends prepared fresh by local hosts.
          </p>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        room={selectedRoom}
      />

      {/* Assistant */}
      <AiPlanner />
    </div>
  );
}

export default function Rooms() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center font-sans">
        <div className="text-center space-y-3">
          <div className="h-8 w-8 border-4 border-emerald-500 border-t-transparent/20 rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-500 dark:text-slate-400 font-light text-sm animate-pulse">Loading Himalayan homestays...</p>
        </div>
      </div>
    }>
      <RoomsList />
    </Suspense>
  );
}
