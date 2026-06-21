"use client";

import React from "react";
import { Users, Star, ArrowRight, ShieldCheck } from "lucide-react";

export default function RoomCard({ image, title, description, price, capacity, rating = 4.7, reviewsCount = 20, amenities = [], onBookNow }) {
  return (
    <div className="group glass rounded-3xl overflow-hidden hover-scale border border-slate-200/50 dark:border-slate-800/50 flex flex-col h-full bg-white/40 dark:bg-slate-900/40">
      {/* Room Image & Badge */}
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold">
          <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
          <span>{rating}</span>
          <span className="text-slate-300 font-light">({reviewsCount})</span>
        </div>

        {/* Local Eco Certification Badge */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/90 backdrop-blur-md text-white text-xs font-medium">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>100% Eco-Certified</span>
        </div>
      </div>

      {/* Room Details */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-2 mb-3">
          <h3 className="text-xl font-bold font-sans text-slate-800 dark:text-slate-100 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
            {title}
          </h3>
          <span className="text-xs font-medium px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md shrink-0">
            {capacity}
          </span>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 font-sans font-light line-clamp-3 mb-4 leading-relaxed">
          {description}
        </p>

        {/* Amenities Highlights */}
        {amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {amenities.slice(0, 3).map((amenity, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              >
                {amenity}
              </span>
            ))}
            {amenities.length > 3 && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                +{amenities.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Pricing and Action */}
        <div className="mt-auto pt-4 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Price per Night</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">₹{price}</span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">/ night</span>
            </div>
          </div>

          <button
            onClick={onBookNow}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 hover:bg-emerald-600 dark:bg-slate-800 dark:hover:bg-emerald-500 text-white font-medium text-sm transition-all duration-300 hover:scale-[1.03]"
          >
            <span>Book Now</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
