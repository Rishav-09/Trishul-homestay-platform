"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2, ShieldAlert } from "lucide-react";

export default function RouteGuard({ children, requireAdmin = false }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to run the authentication check
    const authCheck = () => {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (!storedUser || !storedToken) {
        setAuthorized(false);
        // Redirect to login page and save the redirect return path
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      } else {
        try {
          const user = JSON.parse(storedUser);
          if (requireAdmin && user.role !== "admin" && !user.isAdmin) {
            setAuthorized(false);
            setLoading(false);
          } else {
            setAuthorized(true);
            setLoading(false);
          }
        } catch (e) {
          // JSON parsing failed, clean up storage and redirect
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setAuthorized(false);
          router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
        }
      }
    };

    authCheck();

    // Setup listener for storage changes
    window.addEventListener("user-auth", authCheck);
    return () => {
      window.removeEventListener("user-auth", authCheck);
    };
  }, [pathname, requireAdmin, router]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-900 text-white">
        <Loader2 className="h-10 w-10 animate-spin text-emerald-400 mb-4" />
        <p className="text-sm font-sans font-light text-slate-400 animate-pulse">
          Securing session, please wait...
        </p>
      </div>
    );
  }

  if (!authorized && requireAdmin) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-900 text-white px-4">
        <div className="bg-rose-500/10 border border-rose-500/30 p-8 rounded-3xl max-w-md text-center shadow-2xl">
          <ShieldAlert className="h-16 w-16 text-rose-500 mx-auto mb-4 animate-bounce" />
          <h2 className="text-2xl font-bold font-sans text-rose-300 mb-2">Access Denied</h2>
          <p className="text-sm font-sans text-slate-300 font-light mb-6">
            You do not have administrative privileges to access this area.
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-all duration-300 cursor-pointer shadow-lg shadow-emerald-600/20"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  return authorized ? <>{children}</> : null;
}
