"use client";

import React, { useState, useEffect } from "react";
import RouteGuard from "@/components/RouteGuard";
import { User, Calendar, Mail, Phone, ChevronRight, BookOpen, AlertCircle, Clock } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileAndBookings = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        
        if (!storedUser || !token) return;
        
        const user = JSON.parse(storedUser);
        setProfile(user);

        // Fetch all bookings (since we protect bookings endpoint, we fetch all and filter by user email)
        const res = await fetch("/api/bookings", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        
        if (res.ok) {
          const allBookings = await res.json();
          // Filter bookings matching this user's email
          const userBookings = allBookings.filter(
            (b) => b.email.toLowerCase() === user.email.toLowerCase()
          );
          setBookings(userBookings);
        }
      } catch (error) {
        console.error("Failed to load profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndBookings();
  }, []);

  return (
    <RouteGuard>
      <div className="min-h-screen bg-slate-950 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 text-white font-sans">
        {/* Profile Card */}
        {profile && (
          <div className="glass border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-6">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-400" />
            
            {/* Avatar */}
            <div className="h-24 w-24 rounded-full bg-emerald-500/20 border-2 border-emerald-400/50 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <User className="h-12 w-12 text-emerald-400" />
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-grow space-y-2 text-center md:text-left">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full">
                {profile.role === "admin" ? "Administrator" : "Traveler Account"}
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight mt-1">{profile.name}</h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-slate-400 font-light mt-2">
                <span className="flex items-center gap-1.5">
                  <Mail className="h-4 w-4 text-emerald-400" />
                  {profile.email}
                </span>
              </div>
            </div>
            
            {profile.role === "admin" && (
              <Link
                href="/admin"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-xl transition-all duration-300 shadow-lg shadow-emerald-600/25"
              >
                Admin Control Center
              </Link>
            )}
          </div>
        )}

        {/* Bookings Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Calendar className="h-6 w-6 text-emerald-400" />
              My Reservations
            </h2>
            <span className="text-sm font-light text-slate-400">{bookings.length} reservations found</span>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="h-8 w-8 border-4 border-emerald-500 border-t-transparent/20 rounded-full animate-spin mx-auto"></div>
              <p className="text-slate-400 text-sm mt-3 animate-pulse">Loading booking history...</p>
            </div>
          ) : bookings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookings.map((booking) => (
                <div
                  key={booking._id || booking.id}
                  className="glass border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col justify-between hover:scale-[1.01] transition-transform duration-300 relative overflow-hidden"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-white leading-tight">{booking.roomTitle}</h3>
                        <p className="text-xs text-slate-400 mt-1">Confirmed guest: {booking.guestName}</p>
                      </div>
                      <span className={`px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        booking.status === "Approved" 
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                          : booking.status === "Rejected"
                          ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}>
                        {booking.status}
                      </span>
                    </div>

                    <div className="h-[1px] bg-white/15" />

                    <div className="grid grid-cols-2 gap-4 text-xs font-light text-slate-300">
                      <div>
                        <span className="text-slate-500 block mb-1">Check-in / Check-out</span>
                        <p className="font-semibold text-white">
                          {new Date(booking.checkIn).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </p>
                        <p className="text-slate-400">to {new Date(booking.checkOut).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                      </div>
                      <div>
                        <span className="text-slate-500 block mb-1">Stay Details</span>
                        <p className="font-semibold text-white">{booking.nights} Nights</p>
                        <p className="text-slate-400">{booking.guests} Guests</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center bg-slate-900/50 p-3 rounded-2xl border border-white/5">
                      <span className="text-xs text-slate-400">Total Charged:</span>
                      <span className="text-base font-extrabold text-emerald-400">₹{booking.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass border border-white/15 rounded-3xl p-12 text-center text-slate-400 font-light">
              <BookOpen className="h-12 w-12 text-slate-500 mx-auto mb-4" />
              <p className="mb-6">You have no active or completed bookings yet.</p>
              <Link
                href="/rooms"
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-emerald-600/20"
              >
                Browse Rooms & Book
              </Link>
            </div>
          )}
        </div>
      </div>
    </RouteGuard>
  );
}
