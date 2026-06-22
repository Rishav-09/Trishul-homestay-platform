// components/ui/Button.jsx
"use client";

import React from "react";
import Link from "next/link";

/**
 * Premium Reusable Button Component
 * Supports multiple design variants, sizes, custom states, and polymorphic routing.
 */
export default function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary", // primary | secondary | outline | ghost | glow | danger
  size = "md", // sm | md | lg
  className = "",
  disabled = false,
  icon,
  iconRight,
  fullWidth = false,
  ...props
}) {
  // Core styling classes focusing on transitions, focus rings, hover, and active states
  const baseStyles = "group inline-flex items-center justify-center gap-2 font-semibold tracking-wide rounded-2xl cursor-pointer select-none transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-emerald-500/40 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100";

  // Size configurations
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  // Aesthetic color variations conforming to modern design standards
  const variants = {
    // Primary emerald gradient with custom hover glow
    primary: "bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-md shadow-emerald-600/15 hover:shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5 border border-emerald-500/10",
    
    // Premium theme-aware slate button
    secondary: "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-200/50 dark:border-slate-700/50 hover:-translate-y-0.5 shadow-sm",
    
    // Gradient borders that fill on hover
    outline: "bg-transparent text-emerald-600 dark:text-emerald-400 hover:text-white border border-emerald-500/50 hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:-translate-y-0.5 hover:shadow-md hover:shadow-emerald-500/10",
    
    // Minimalist transparent button
    ghost: "bg-transparent text-slate-650 hover:text-slate-800 dark:text-slate-350 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-850",
    
    // High-impact call-to-action glow button
    glow: "relative bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 duration-350",
    
    // High visibility alerts/deletions
    danger: "bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-500/15 hover:shadow-lg hover:shadow-rose-500/25 hover:-translate-y-0.5",
  };

  const widthClass = fullWidth ? "w-full" : "";
  const combinedClasses = `${baseStyles} ${sizes[size]} ${variants[variant]} ${widthClass} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={combinedClasses} {...props}>
        {icon && <span className="shrink-0 transition-transform duration-300 group-hover:scale-110">{icon}</span>}
        <span>{children}</span>
        {iconRight && <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-1">{iconRight}</span>}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedClasses}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0 transition-transform duration-300 group-hover:scale-110">{icon}</span>}
      <span>{children}</span>
      {iconRight && <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-1">{iconRight}</span>}
    </button>
  );
}
