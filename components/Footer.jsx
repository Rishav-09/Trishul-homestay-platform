"use client";

// components/Footer.jsx
import React from "react";
import Link from "next/link";
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-500 text-white p-2 rounded-xl">
                <Leaf className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                EcoStay AI
              </span>
            </div>
            <p className="text-sm font-light text-slate-400 leading-relaxed">
              Empowering Himalayan homestays through direct direct booking and AI-driven guest planning. Supporting the local economy and sustainable travel in Chopta, Uttarakhand.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-emerald-400 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-emerald-400 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-emerald-400 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-emerald-400 transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-6">Explore Chopta</h4>
            <ul className="space-y-3.5 text-sm font-light">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">Homepage</Link>
              </li>
              <li>
                <Link href="/rooms" className="hover:text-emerald-400 transition-colors">Our Eco-Rooms</Link>
              </li>
              <li>
                <Link href="/attractions" className="hover:text-emerald-400 transition-colors">Local Attractions</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">Get in Touch</Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-emerald-400 transition-colors">Admin Portal</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-6">Contact Homestay Office</h4>
            <ul className="space-y-4 text-sm font-light">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-slate-400 leading-relaxed">
                  EcoStay Hub, Chopta Village,<br />
                  Rudraprayag District,<br />
                  Uttarakhand, India - 246419
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-emerald-500 shrink-0" />
                <span className="text-slate-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-emerald-500 shrink-0" />
                <span className="text-slate-400">booking@ecostay.ai</span>
              </li>
            </ul>
          </div>

          {/* Newsletter signup */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-6">Join Our Green Circle</h4>
            <p className="text-sm font-light text-slate-400 mb-4 leading-relaxed">
              Subscribe to get seasonal trek reports, winter weather alerts, and early booking discounts.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full bg-slate-900 border border-slate-800 text-sm rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:border-emerald-500 text-white placeholder-slate-500 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 p-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <span className="text-[10px] text-slate-500 font-light block">We protect your privacy. Cancel subscription anytime.</span>
            </form>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="pt-8 mt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light text-slate-500">
          <p>© {new Date().getFullYear()} EcoStay AI. Built for TBI Internship Evaluation. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Local Tourism Guidelines</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
