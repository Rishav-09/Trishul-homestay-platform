"use client";

import React, { useState, useEffect } from "react";
import AiPlanner from "@/components/AiPlanner";
import { 
  Home, 
  BookOpen, 
  Percent, 
  TrendingUp, 
  Check, 
  X, 
  RefreshCw, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle
} from "lucide-react";
import Button from "@/components/ui/Button";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [activeTab, setActiveTab] = useState("bookings"); // "bookings" | "inquiries"
  const [filterStatus, setFilterStatus] = useState("all");

  // Load and Seed Data on Mounting
  useEffect(() => {
    // 1. Booking Seed
    const savedBookings = localStorage.getItem("bookingRequests");
    if (!savedBookings) {
      const seedBookings = [
        {
          id: "bk-seed-1",
          guestName: "Rohit Sharma",
          email: "rohit@gmail.com",
          phone: "+91 9988776655",
          roomTitle: "Deluxe Himalayan View Suite",
          roomPrice: 3500,
          checkIn: "2026-06-21",
          checkOut: "2026-06-24",
          guests: "2",
          nights: 3,
          totalAmount: 11025, // with 5% tax
          status: "Pending Approval",
          createdAt: "2026-06-19, 10:15:30 AM"
        },
        {
          id: "bk-seed-2",
          guestName: "Meera Nair",
          email: "meera@outlook.com",
          phone: "+91 8877665544",
          roomTitle: "Family Eco-Cottage",
          roomPrice: 5000,
          checkIn: "2026-06-25",
          checkOut: "2026-06-27",
          guests: "4",
          nights: 2,
          totalAmount: 10500,
          status: "Approved",
          createdAt: "2026-06-18, 04:30:12 PM"
        },
        {
          id: "bk-seed-3",
          guestName: "David Cole",
          email: "david@yahoo.com",
          phone: "+1 415-888-0099",
          roomTitle: "Standard Eco-Room",
          roomPrice: 2500,
          checkIn: "2026-07-02",
          checkOut: "2026-07-06",
          guests: "1",
          nights: 4,
          totalAmount: 10500,
          status: "Rejected",
          createdAt: "2026-06-17, 11:20:45 AM"
        }
      ];
      localStorage.setItem("bookingRequests", JSON.stringify(seedBookings));
      setBookings(seedBookings);
    } else {
      setBookings(JSON.parse(savedBookings));
    }

    // 2. Inquiries Seed
    const savedInquiries = localStorage.getItem("contactInquiries");
    if (!savedInquiries) {
      const seedInquiries = [
        {
          id: "inq-seed-1",
          name: "Sanjay Dutta",
          email: "sanjay.d@live.com",
          phone: "+91 9944332211",
          subject: "Trekking Guide Request",
          message: "Need a certified local guide for Chandrashila Peak trek on June 22. We are a group of 3 hikers. Let us know guide rates.",
          createdAt: "2026-06-19, 09:45:00 AM"
        },
        {
          id: "inq-seed-2",
          name: "Alice Johnson",
          email: "alice@gmail.com",
          phone: "+44 7700 900077",
          subject: "Winter Road Conditions",
          message: "We plan to drive from Rishikesh to Chopta in mid-January. Are snow chains required for tires? Let us know.",
          createdAt: "2026-06-18, 02:10:00 PM"
        }
      ];
      localStorage.setItem("contactInquiries", JSON.stringify(seedInquiries));
      setInquiries(seedInquiries);
    } else {
      setInquiries(JSON.parse(savedInquiries));
    }
  }, []);

  // Update a booking status in localStorage
  const handleUpdateStatus = (id, newStatus) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status: newStatus } : b);
    setBookings(updated);
    localStorage.setItem("bookingRequests", JSON.stringify(updated));
  };

  // Reset simulated state completely
  const handleResetData = () => {
    localStorage.removeItem("bookingRequests");
    localStorage.removeItem("contactInquiries");
    window.location.reload();
  };

  // Calculate dynamic dashboard stats
  const totalRooms = 3;
  const totalBookingsCount = bookings.length;
  
  const approvedBookings = bookings.filter(b => b.status === "Approved");
  const pendingBookings = bookings.filter(b => b.status === "Pending Approval");
  
  // Calculate simulated occupancy rate: (approved bookings / total rooms * 100%) or standard metrics
  const occupancyRate = totalBookingsCount > 0 
    ? Math.min(Math.round((approvedBookings.length / totalRooms) * 100), 100) 
    : 0;

  // Calculate dynamic revenue estimate (sum of totalAmounts for approved bookings)
  const revenueEstimate = approvedBookings.reduce((sum, b) => sum + b.totalAmount, 0);

  // Filtered booking requests
  const filteredBookings = bookings.filter(b => {
    if (filterStatus === "all") return true;
    return b.status.toLowerCase().includes(filterStatus.split(' ')[0].toLowerCase());
  });

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 font-sans">
      
      {/* Header with Control Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">Rural Management Portal</span>
          <h1 className="text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight">Admin Control Center</h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-light">
            Manage Chopta homestay inventories, approve booking requests, and respond to traveler guide queries.
          </p>
        </div>
        <Button
          onClick={handleResetData}
          variant="secondary"
          size="sm"
          icon={<RefreshCw className="h-3.5 w-3.5" />}
        >
          Reset Simulation State
        </Button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Rooms */}
        <div className="glass p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white/40 dark:bg-slate-900/40 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Total Homestays</span>
            <div className="text-3xl font-extrabold text-slate-800 dark:text-white">{totalRooms}</div>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">100% active</span>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
            <Home className="h-6 w-6" />
          </div>
        </div>

        {/* Total Bookings / Requests */}
        <div className="glass p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white/40 dark:bg-slate-900/40 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Booking Requests</span>
            <div className="text-3xl font-extrabold text-slate-800 dark:text-white">{totalBookingsCount}</div>
            <span className="text-[10px] text-amber-500 font-medium flex items-center gap-1">
              <Clock className="h-3 w-3" /> {pendingBookings.length} pending approval
            </span>
          </div>
          <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-xl">
            <BookOpen className="h-6 w-6" />
          </div>
        </div>

        {/* Occupancy Rate */}
        <div className="glass p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white/40 dark:bg-slate-900/40 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Occupancy Rate</span>
            <div className="text-3xl font-extrabold text-slate-800 dark:text-white">{occupancyRate}%</div>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Approved rooms occupancy</span>
          </div>
          <div className="p-3 bg-teal-500/10 text-teal-500 rounded-xl">
            <Percent className="h-6 w-6" />
          </div>
        </div>

        {/* Revenue Estimate */}
        <div className="glass p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white/40 dark:bg-slate-900/40 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Revenue (Est.)</span>
            <div className="text-3xl font-extrabold text-slate-800 dark:text-white">₹{revenueEstimate.toLocaleString()}</div>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Bypasses middleman commission</span>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl">
            <TrendingUp className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Tabs Selector */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6">
        <button
          onClick={() => setActiveTab("bookings")}
          className={`pb-4 text-sm font-semibold transition-all relative ${
            activeTab === "bookings"
              ? "text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-500"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          }`}
        >
          Booking Requests ({bookings.length})
        </button>
        <button
          onClick={() => setActiveTab("inquiries")}
          className={`pb-4 text-sm font-semibold transition-all relative ${
            activeTab === "inquiries"
              ? "text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-500"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          }`}
        >
          Traveler Inquiries ({inquiries.length})
        </button>
      </div>

      {/* Bookings Request Management Tab */}
      {activeTab === "bookings" && (
        <div className="space-y-6">
          {/* Internal filters */}
          <div className="flex flex-wrap gap-2">
            {["all", "pending", "approved", "rejected"].map((status) => (
              <Button
                key={status}
                onClick={() => setFilterStatus(status)}
                variant={filterStatus === status ? "primary" : "secondary"}
                size="sm"
                className="rounded-full px-4 py-1.5 uppercase tracking-wider text-[10px]"
              >
                {status}
              </Button>
            ))}
          </div>

          {/* List/Table */}
          <div className="glass rounded-3xl overflow-hidden border border-slate-200/50 dark:border-slate-800/50 bg-white/40 dark:bg-slate-900/40">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100 dark:bg-slate-850 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold text-[10px] border-b border-slate-200/50 dark:border-slate-800/50">
                  <tr>
                    <th className="px-6 py-4">Guest Details</th>
                    <th className="px-6 py-4">Homestay / Cost</th>
                    <th className="px-6 py-4">Stay Dates</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/50 dark:divide-slate-800/50">
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-100/30 dark:hover:bg-slate-800/20">
                        {/* Guest info */}
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-850 dark:text-white">{b.guestName}</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">{b.email} · {b.phone}</div>
                          <div className="text-[9px] text-slate-400 mt-1">Submitted: {b.createdAt}</div>
                        </td>
                        
                        {/* Room info */}
                        <td className="px-6 py-4">
                          <div className="font-semibold text-slate-800 dark:text-slate-200">{b.roomTitle}</div>
                          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-1">₹{b.totalAmount} ({b.guests} guests)</div>
                        </td>

                        {/* Stay Dates */}
                        <td className="px-6 py-4">
                          <div className="font-semibold text-slate-800 dark:text-slate-200">{b.checkIn} to {b.checkOut}</div>
                          <div className="text-[10px] text-slate-500 mt-1">{b.nights} night{b.nights > 1 ? "s" : ""}</div>
                        </td>

                        {/* Status badge */}
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            b.status === "Approved"
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : b.status === "Rejected"
                              ? "bg-red-500/10 text-red-500"
                              : "bg-amber-500/10 text-amber-600"
                          }`}>
                            {b.status === "Approved" && <CheckCircle2 className="h-3 w-3" />}
                            {b.status === "Rejected" && <AlertCircle className="h-3 w-3" />}
                            {b.status === "Pending Approval" && <Clock className="h-3 w-3 animate-pulse" />}
                            {b.status}
                          </span>
                        </td>

                        {/* Action buttons */}
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            {b.status === "Pending Approval" ? (
                              <>
                                <button
                                  onClick={() => handleUpdateStatus(b.id, "Approved")}
                                  className="p-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-colors"
                                  title="Approve Booking"
                                >
                                  <Check className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleUpdateStatus(b.id, "Rejected")}
                                  className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors"
                                  title="Reject Booking"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => handleUpdateStatus(b.id, "Pending Approval")}
                                className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-lg transition-colors text-[10px] font-bold"
                              >
                                Revert Pending
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-slate-500 font-light">
                        No bookings requests matched the current status filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Traveler Inquiries Management Tab */}
      {activeTab === "inquiries" && (
        <div className="glass rounded-3xl overflow-hidden border border-slate-200/50 dark:border-slate-800/50 bg-white/40 dark:bg-slate-900/40">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100 dark:bg-slate-850 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold text-[10px] border-b border-slate-200/50 dark:border-slate-800/50">
                <tr>
                  <th className="px-6 py-4">Sender Details</th>
                  <th className="px-6 py-4">Inquiry Category</th>
                  <th className="px-6 py-4">Message Context</th>
                  <th className="px-6 py-4">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/50 dark:divide-slate-800/50">
                {inquiries.length > 0 ? (
                  inquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-100/30 dark:hover:bg-slate-800/20">
                      {/* Name & Contact */}
                      <td className="px-6 py-4 shrink-0">
                        <div className="font-bold text-slate-850 dark:text-white">{inq.name}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">{inq.email}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">{inq.phone}</div>
                      </td>

                      {/* Subject */}
                      <td className="px-6 py-4 shrink-0">
                        <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-md text-[10px] font-bold uppercase tracking-wider">
                          {inq.subject}
                        </span>
                      </td>

                      {/* Message Content */}
                      <td className="px-6 py-4 max-w-sm">
                        <p className="text-slate-600 dark:text-slate-300 font-light leading-relaxed whitespace-pre-wrap">
                          {inq.message}
                        </p>
                      </td>

                      {/* Timestamp */}
                      <td className="px-6 py-4 text-slate-400 text-[10px]">
                        {inq.createdAt}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-slate-500 font-light">
                      No traveler inquiries found. Submit some inquiries using the Contact form to populate.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Bottom Advisory Info */}
      <div className="flex gap-3 p-4 bg-emerald-500/10 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 rounded-2xl text-xs leading-relaxed border border-emerald-500/20">
        <HelpCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Evaluation Sandbox Node:</span> This administration center is a mockup simulated using active React state synchronized with `localStorage`. In a production release, approvals would trigger automated WhatsApp triggers to local hosts and sync with a MongoDB/PostgreSQL instance.
        </div>
      </div>

      {/* Floating AI Helper */}
      <AiPlanner />
    </div>
  );
}
