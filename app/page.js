"use client";

import React, { useState } from "react";
import Link from "next/link";
import Hero from "@/components/Hero";
import RoomCard from "@/components/RoomCard";
import BookingModal from "@/components/BookingModal";
import AiPlanner from "@/components/AiPlanner";
import { rooms } from "@/data/rooms";
import { attractions } from "@/data/attractions";
import { Compass, Users, CheckCircle, ShieldCheck, HeartHandshake, Eye } from "lucide-react";

export default function Home() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenBooking = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const featuredRooms = rooms.slice(0, 3); // Display all 3 rooms
  const featuredAttractions = attractions.slice(0, 3); // Display all 3 attractions

  const testimonials = [
    {
      id: 1,
      name: "Aarav Mehta",
      role: "Solo Trekker, Mumbai",
      quote: "Staying at the Deluxe View Room was life-changing. Waking up to the sunrise over Trishul Peak directly from my bed was magical. Direct booking saved me money and went straight to the host family.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 2,
      name: "Elena Rostova",
      role: "Eco-Researcher, Germany",
      quote: "EcoStay AI is highly professional. The homestays are fully green-certified. Conserving energy and eating organic, farm-fresh local food made our family trip sustainable and authentic.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 3,
      name: "Rajesh & Priya Verma",
      role: "Family Travelers, Delhi",
      quote: "The Family Cottage was spacious and clean. The kids loved the woodfire and the host took us on a village walk showing us traditional millet farming. Unforgettable hospitality!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <div className="space-y-24 pb-16">
      {/* Hero Section */}
      <Hero />

      {/* Eco-Impact & Sustainability Statistics (TBI Evaluation Highlight) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass p-8 sm:p-12 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-transparent text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
          <div className="relative z-10 space-y-8">
            <div className="max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl sm:text-4xl font-bold font-sans text-slate-800 dark:text-white">
                Our Sustainable Footprint
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                By booking directly with EcoStay AI, you bypass corporate aggregators and contribute directly to localized, climate-conscious community growth in Chopta.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
              <div className="p-6 bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/20 shadow-sm">
                <div className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">100%</div>
                <div className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-2">Direct Local Revenue</div>
              </div>
              <div className="p-6 bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/20 shadow-sm">
                <div className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">4.2 Tons</div>
                <div className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-2">Carbon Offset (Solar Powered)</div>
              </div>
              <div className="p-6 bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/20 shadow-sm">
                <div className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">12,000+</div>
                <div className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-2">Plastic Bottles Eliminated</div>
              </div>
              <div className="p-6 bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/20 shadow-sm">
                <div className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">₹8.4L+</div>
                <div className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-2">Paid Directly to Villagers</div>
              </div>
            </div>

            {/* Core Values grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-200/30 dark:border-slate-800/30 text-left">
              <div className="flex gap-4">
                <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl shrink-0 h-fit">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800 dark:text-white">Verified Hosts</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-light leading-relaxed">Every listed cottage is verified by the Chopta Village Panchayat for hospitality standards and environment safety.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl shrink-0 h-fit">
                  <Compass className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800 dark:text-white">Offline/Grid Security</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-light leading-relaxed">Integrated safety features with offline GPS trail support downloadable on-site for treks like Tungnath.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl shrink-0 h-fit">
                  <HeartHandshake className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800 dark:text-white">Fair Pricing Policy</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-light leading-relaxed">Fixed seasonal tariffs set transparently. Zero surge pricing, zero service fees, and direct UPI transfers to hosts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-end gap-4 mb-10">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">Sustainable Living</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-sans text-slate-800 dark:text-white">Featured Eco-Homestays</h2>
          </div>
          <Link
            href="/rooms"
            className="group flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
          >
            <span>View All Available Rooms</span>
            <Compass className="h-4 w-4 group-hover:rotate-45 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRooms.map((room) => (
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
      </section>

      {/* Popular Attractions Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-end gap-4 mb-10">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">Adventure Guides</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-sans text-slate-800 dark:text-white">Popular Attractions in Chopta</h2>
          </div>
          <Link
            href="/attractions"
            className="group flex items-center gap-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
          >
            <span>Explore Trekking Guides</span>
            <Eye className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredAttractions.map((attraction) => (
            <div key={attraction.id} className="group glass rounded-3xl overflow-hidden hover-scale border border-slate-200/50 dark:border-slate-800/50 flex flex-col h-full bg-white/40 dark:bg-slate-900/40">
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={attraction.image}
                  alt={attraction.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-slate-900/80 backdrop-blur-md rounded-full text-white text-xs font-semibold">
                  Altitude: {attraction.altitude}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                    {attraction.title}
                  </h3>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-slate-700 shrink-0">
                    {attraction.difficulty}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed line-clamp-3 mb-4">
                  {attraction.description}
                </p>
                <div className="mt-auto pt-4 border-t border-slate-200/50 dark:border-slate-800/50 text-[11px] text-slate-500 dark:text-slate-400 flex justify-between">
                  <span>{attraction.distance}</span>
                  <span className="font-semibold text-slate-600 dark:text-slate-300">{attraction.bestTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">Guest Experiences</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-sans text-slate-800 dark:text-white">Loved by Nature Lovers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="glass p-6 sm:p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col justify-between bg-white/40 dark:bg-slate-900/40 relative">
              <div className="text-emerald-500 text-5xl font-serif absolute top-4 left-4 opacity-15">“</div>
              <p className="text-sm font-light text-slate-600 dark:text-slate-300 leading-relaxed italic mb-6 relative z-10">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 object-cover rounded-full border-2 border-emerald-500/20 shadow-sm"
                />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-white">{t.name}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{t.role}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="text-amber-400 text-sm">★</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        room={selectedRoom}
      />

      {/* Floating AI Travel Assistant */}
      <AiPlanner />
    </div>
  );
}
