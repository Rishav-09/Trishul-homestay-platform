"use client";

import React, { useState } from "react";
import AiPlanner from "@/components/AiPlanner";
import { Phone, Mail, MessageCircle, MapPin, Send, CheckCircle2, UserCheck } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Homestay Booking Enquiry",
    message: ""
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to submit inquiry");
      }

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "Homestay Booking Enquiry",
        message: ""
      });
    } catch (error) {
      console.error("Inquiry error:", error);
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const localTeam = [
    {
      name: "Mr. Devendra Negi",
      role: "Chopta Panchayat Coordinator",
      info: "Coordinates solar backup, off-road driving transport, and general logistics/permits."
    },
    {
      name: "Mrs. Sarita Rawat",
      role: "Homestay Hospitality Lead",
      info: "Manages local cooking training, room cleanliness audits, and organic raw materials distribution."
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 font-sans">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">Local Coordination Desk</span>
        <h1 className="text-4xl font-extrabold text-slate-800 dark:text-white sm:text-5xl tracking-tight">
          Get in Touch
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-light leading-relaxed">
          Contact our local homestay coordination desk in Chopta. We support direct communication with hosts without commission portals.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Contact Methods & Team */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Direct Channels */}
          <div className="glass p-6 sm:p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 bg-white/40 dark:bg-slate-900/40 space-y-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Direct Channels</h3>
            
            <div className="space-y-4">
              
              {/* WhatsApp Call to Action */}
              <a
                href="https://wa.me/919876543210?text=Hello%20EcoStay%20AI,%20I%20am%20interested%20in%20booking%20a%20homestay%20in%20Chopta."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white transition-all duration-300 shadow-md shadow-emerald-500/10 hover:scale-[1.02]"
              >
                <div className="p-2.5 bg-white/20 rounded-xl text-white">
                  <MessageCircle className="h-6 w-6 fill-white" />
                </div>
                <div>
                  <span className="block text-xs font-medium text-emerald-100 uppercase tracking-wider">Fastest Support</span>
                  <span className="text-base font-bold">Chat on WhatsApp</span>
                </div>
              </a>

              {/* Phone Call Info */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800/50">
                <div className="p-2.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Phone Support</span>
                  <span className="text-sm sm:text-base font-bold text-slate-700 dark:text-slate-200">+91 98765 43210</span>
                </div>
              </div>

              {/* Email Info */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800/50">
                <div className="p-2.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Email Inquiry</span>
                  <span className="text-sm sm:text-base font-bold text-slate-700 dark:text-slate-200">booking@ecostay.ai</span>
                </div>
              </div>

              {/* Address Info */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800/50">
                <div className="p-2.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Co-ordination Office</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 leading-relaxed block mt-0.5">
                    EcoStay Hub, Chopta Village, Rudraprayag District, Uttarakhand, India - 246419
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Local Panchayat Coordinators Info */}
          <div className="glass p-6 sm:p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 bg-white/40 dark:bg-slate-900/40 space-y-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-emerald-500" />
              <span>Village Coordinators</span>
            </h3>
            
            <div className="space-y-4">
              {localTeam.map((team, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-100/50 dark:bg-slate-950/20 border border-slate-200/20 text-left">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-white">{team.name}</h4>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium block mt-0.5">{team.role}</span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-light leading-relaxed">{team.info}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Interactive Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="glass p-6 sm:p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 bg-white/40 dark:bg-slate-900/40">
            {submitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
                <div className="h-16 w-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-slate-800 dark:text-white">Message Received!</h4>
                  <p className="text-sm font-light text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                    Thank you. Your enquiry has been saved locally and sent to our team in Chopta. We will contact you via phone/WhatsApp within 2 hours.
                  </p>
                </div>
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="secondary"
                  size="md"
                >
                  Send Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Send Local Inquiry</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm rounded-xl py-3 px-4 focus:outline-none focus:border-emerald-500 text-slate-800 dark:text-white transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm rounded-xl py-3 px-4 focus:outline-none focus:border-emerald-500 text-slate-800 dark:text-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm rounded-xl py-3 px-4 focus:outline-none focus:border-emerald-500 text-slate-800 dark:text-white transition-colors"
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm rounded-xl py-3 px-4 focus:outline-none focus:border-emerald-500 text-slate-800 dark:text-white transition-colors cursor-pointer"
                    >
                      <option value="Homestay Booking Enquiry">Homestay Booking Enquiry</option>
                      <option value="Trekking Guide Request">Trekking Guide Request</option>
                      <option value="Winter Road Conditions">Winter Road Conditions</option>
                      <option value="General Eco-Tourism Info">General Eco-Tourism Info</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Message Details</label>
                  <textarea
                    required
                    rows="5"
                    placeholder="Describe your travel dates, specific room requirement, or route query..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm rounded-xl py-3 px-4 focus:outline-none focus:border-emerald-500 text-slate-800 dark:text-white transition-colors resize-none"
                  />
                </div>

                {submitError && (
                  <div className="p-3 mb-4 bg-red-500/10 text-red-500 rounded-xl text-xs font-medium border border-red-500/20">
                    {submitError}
                  </div>
                )}

                {/* Submit button */}
                <Button
                  type="submit"
                  variant="glow"
                  size="lg"
                  fullWidth
                  disabled={isSubmitting}
                  icon={<Send className="h-4.5 w-4.5" />}
                >
                  {isSubmitting ? "Sending..." : "Send Direct Inquiry"}
                </Button>

                <span className="text-[10px] text-slate-400 block text-center mt-2">
                  No commissions, direct notifications are saved to local logs synced with the Admin Portal.
                </span>
              </form>
            )}
          </div>
        </div>

      </div>

      {/* Floating Helper */}
      <AiPlanner />
    </div>
  );
}
