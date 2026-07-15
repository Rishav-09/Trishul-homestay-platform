"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Shield, Check, Info, Loader2, ArrowLeft } from "lucide-react";

// Google SVG Logo Component
const GoogleIcon = () => (
  <svg className="w-12 h-12 shrink-0 bg-white p-2 rounded-2xl shadow-sm" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="#EA4335"
    />
  </svg>
);

// GitHub SVG Logo Component
const GithubIcon = () => (
  <svg className="w-12 h-12 shrink-0 bg-slate-950 p-2.5 rounded-2xl shadow-sm text-white fill-current" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const googleAccounts = [
  {
    name: "Rishav Dev",
    email: "rishav.dev99@gmail.com",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "Ananya Sharma",
    email: "ananya.sharma.travels@gmail.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "Tsering Dorje",
    email: "tsering.himalayas@gmail.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  }
];

const githubAccounts = [
  {
    name: "RishavDevG",
    email: "rishav.git.coder@gmail.com",
    avatar: "https://avatars.githubusercontent.com/u/583231?v=4"
  },
  {
    name: "MountainNomad",
    email: "nomad.himalayas@gmail.com",
    avatar: "https://avatars.githubusercontent.com/u/102425?v=4"
  }
];

function ConsentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const provider = searchParams.get("provider") || "google";
  const redirect = searchParams.get("redirect") || "/";

  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (provider.toLowerCase() === "github") {
      setAccounts(githubAccounts);
      setSelectedAccount(githubAccounts[0]);
    } else {
      setAccounts(googleAccounts);
      setSelectedAccount(googleAccounts[0]);
    }
  }, [provider]);

  const handleOAuthSubmit = async () => {
    if (!selectedAccount) return;
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/oauth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: selectedAccount.name,
          email: selectedAccount.email,
          avatar: selectedAccount.avatar,
          provider: provider,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        // Save token and user details to localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // Dispatch authentication event to Navbar and route guards
        window.dispatchEvent(new Event("user-auth"));

        // Redirect back to user's intended route
        setTimeout(() => {
          router.push(redirect);
        }, 800);
      } else {
        setError(data.error || "OAuth login failed");
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to connect to authentication server.");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-400" />
      
      {/* Provider Header */}
      <div className="flex flex-col items-center text-center space-y-3">
        {provider.toLowerCase() === "github" ? <GithubIcon /> : <GoogleIcon />}
        <div>
          <h2 className="text-xl font-bold text-white font-sans">
            Sign in with {provider.toLowerCase() === "github" ? "GitHub" : "Google"}
          </h2>
          <p className="text-xs text-slate-400 font-light mt-1">
            to continue to <span className="text-emerald-400 font-semibold">EcoStay AI</span>
          </p>
        </div>
      </div>

      <div className="h-[1px] bg-slate-800" />

      {/* Account Picker */}
      <div className="space-y-3">
        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Choose account
        </label>
        
        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {accounts.map((acc) => (
            <button
              key={acc.email}
              onClick={() => setSelectedAccount(acc)}
              disabled={isLoading}
              className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all duration-300 text-left ${
                selectedAccount?.email === acc.email
                  ? "bg-emerald-950/20 border-emerald-500/50 text-white"
                  : "bg-slate-950/40 border-slate-800 hover:border-slate-700 text-slate-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <img src={acc.avatar} alt={acc.name} className="w-10 h-10 rounded-full object-cover border border-slate-700" />
                <div>
                  <div className="text-sm font-bold">{acc.name}</div>
                  <div className="text-xs text-slate-400 font-light">{acc.email}</div>
                </div>
              </div>
              {selectedAccount?.email === acc.email && (
                <div className="bg-emerald-500 text-white p-1 rounded-full">
                  <Check className="h-3 w-3" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Scope Details */}
      <div className="bg-slate-950/50 border border-slate-800 p-4 rounded-2xl text-xs space-y-2 text-slate-300 leading-relaxed font-light">
        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
          <Shield className="h-3.5 w-3.5" /> Permissions Requested
        </span>
        <ul className="list-disc list-inside space-y-1 text-slate-400">
          <li>View your basic profile photo and display name</li>
          <li>View your authenticated email address</li>
        </ul>
      </div>

      {error && (
        <div className="text-rose-400 text-xs bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl flex items-center gap-2">
          <Info className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={() => router.back()}
          disabled={isLoading}
          className="flex-1 py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-400 font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" /> Cancel
        </button>
        <button
          onClick={handleOAuthSubmit}
          disabled={isLoading}
          className="flex-[2] py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/25"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Verifying...
            </>
          ) : (
            "Allow and Continue"
          )}
        </button>
      </div>
    </div>
  );
}

export default function OAuthConsentPage() {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center py-12 px-4 overflow-hidden bg-slate-950">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />

      <Suspense fallback={
        <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl w-full max-w-md flex flex-col items-center py-12">
          <Loader2 className="h-10 w-10 animate-spin text-emerald-400 mb-3" />
          <p className="text-sm font-sans text-slate-400">Loading OAuth details...</p>
        </div>
      }>
        <ConsentContent />
      </Suspense>
    </div>
  );
}
