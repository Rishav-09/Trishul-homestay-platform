"use client";

import React, { useState, useEffect } from "react";
import { X, Calendar, Phone, User, Mail, ShieldAlert, BadgeCheck } from "lucide-react";

export default function BookingModal({ isOpen, onClose, room }) {
  const [formData, setFormData] = useState({
    guestName: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
  });
  
  const [step, setStep] = useState(1); // 1: Form, 2: Success
  const [nights, setNights] = useState(1);
  const [priceDetails, setPriceDetails] = useState({ base: 0, tax: 0, total: 0 });

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setFormData({
        guestName: "",
        email: "",
        phone: "",
        checkIn: "",
        checkOut: "",
        guests: "2",
      });
    }
  }, [isOpen]);

  // Recalculate nights and prices whenever dates change
  useEffect(() => {
    if (formData.checkIn && formData.checkOut && room) {
      const inDate = new Date(formData.checkIn);
      const outDate = new Date(formData.checkOut);
      const diffTime = Math.abs(outDate - inDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      const calculatedNights = diffDays > 0 ? diffDays : 1;
      setNights(calculatedNights);
      
      const base = room.price * calculatedNights;
      const tax = Math.round(base * 0.05); // 5% eco-tourism local tax
      const total = base + tax;
      
      setPriceDetails({ base, tax, total });
    } else if (room) {
      setPriceDetails({ base: room.price, tax: Math.round(room.price * 0.05), total: room.price + Math.round(room.price * 0.05) });
      setNights(1);
    }
  }, [formData.checkIn, formData.checkOut, room]);

  if (!isOpen || !room) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new simulated booking request
    const newRequest = {
      id: "bk-" + Date.now(),
      guestName: formData.guestName,
      email: formData.email,
      phone: formData.phone,
      roomTitle: room.title,
      roomPrice: room.price,
      checkIn: formData.checkIn || new Date().toISOString().split('T')[0],
      checkOut: formData.checkOut || new Date(Date.now() + 86400000).toISOString().split('T')[0],
      guests: formData.guests,
      nights: nights,
      totalAmount: priceDetails.total,
      status: "Pending Approval",
      createdAt: new Date().toLocaleString(),
    };

    // Store in localStorage so the Admin Dashboard can load it
    const existing = JSON.parse(localStorage.getItem("bookingRequests") || "[]");
    localStorage.setItem("bookingRequests", JSON.stringify([newRequest, ...existing]));

    setStep(2);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 transition-all transform duration-300 z-10 font-sans max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">
              {step === 1 ? "Confirm Direct Booking" : "Booking Request Sent"}
            </h3>
            {step === 1 && (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                Direct Booking via EcoStay AI (0% Commission)
              </span>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6 space-y-6">
            
            {/* Homestay details summary */}
            <div className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
              <img 
                src={room.image} 
                alt={room.title}
                className="w-24 h-20 object-cover rounded-xl shrink-0"
              />
              <div>
                <h4 className="font-bold text-slate-800 dark:text-white">{room.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{room.capacity} · {room.viewType}</p>
                <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-1">₹{room.price} / night</div>
              </div>
            </div>

            {/* Inputs grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.guestName}
                    onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-emerald-500 text-slate-800 dark:text-white transition-colors"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-emerald-500 text-slate-800 dark:text-white transition-colors"
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Mobile Number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-emerald-500 text-slate-800 dark:text-white transition-colors"
                  />
                </div>
              </div>

              {/* Number of Guests */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Number of Guests</label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm rounded-xl py-3 px-4 focus:outline-none focus:border-emerald-500 text-slate-800 dark:text-white transition-colors cursor-pointer"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5 Guests</option>
                </select>
              </div>

              {/* Check-In */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Check-In Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="date"
                    required
                    value={formData.checkIn}
                    onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-emerald-500 text-slate-800 dark:text-white transition-colors cursor-pointer"
                  />
                </div>
              </div>

              {/* Check-Out */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Check-Out Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="date"
                    required
                    value={formData.checkOut}
                    onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-emerald-500 text-slate-800 dark:text-white transition-colors cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Price Calculations */}
            <div className="border-t border-dashed border-slate-200 dark:border-slate-800 pt-5 space-y-2">
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                <span>Room tariff (₹{room.price} x {nights} night{nights > 1 ? "s" : ""})</span>
                <span>₹{priceDetails.base}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                <span>Local Eco-Development Tax (5%)</span>
                <span>₹{priceDetails.tax}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-slate-800 dark:text-white pt-2 border-t border-slate-100 dark:border-slate-800">
                <span>Total Booking Amount</span>
                <span className="text-emerald-600 dark:text-emerald-400">₹{priceDetails.total}</span>
              </div>
            </div>

            {/* Eco Advisory */}
            <div className="flex gap-3 p-4 bg-emerald-500/10 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 rounded-2xl text-xs leading-relaxed border border-emerald-500/20">
              <ShieldAlert className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Eco-Tourism Advisory:</span> Chopta is a plastic-free alpine zone. Please pack responsibly, minimize trash, and support local mountain villagers. Power is solar/micro-hydro, please conserve energy!
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:scale-[1.01]"
            >
              Confirm Booking Request
            </button>
          </form>
        ) : (
          /* Success Screen */
          <div className="flex-grow p-10 flex flex-col items-center justify-center text-center space-y-6">
            <div className="h-20 w-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500">
              <BadgeCheck className="h-12 w-12" />
            </div>
            
            <div className="space-y-2 max-w-md">
              <h4 className="text-2xl font-bold text-slate-800 dark:text-white">Request Sent to Chopta Host!</h4>
              <p className="text-sm font-light text-slate-500 dark:text-slate-400 leading-relaxed">
                Thank you for selecting <span className="font-semibold text-emerald-600 dark:text-emerald-400">{room.title}</span>. Your reservation has been sent directly to the homestay operator in Chopta.
              </p>
            </div>

            <div className="w-full max-w-sm bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 text-left text-xs space-y-2 text-slate-600 dark:text-slate-400">
              <div><span className="font-bold">Guest:</span> {formData.guestName}</div>
              <div><span className="font-bold">Dates:</span> {formData.checkIn} to {formData.checkOut} ({nights} nights)</div>
              <div><span className="font-bold">Amount:</span> ₹{priceDetails.total} (Pay direct to host at check-in)</div>
              <div className="text-emerald-600 dark:text-emerald-400 font-semibold pt-1">★ Live simulation synced with the Admin Portal.</div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-medium rounded-xl transition-colors"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
