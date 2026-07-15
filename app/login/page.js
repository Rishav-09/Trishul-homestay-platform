"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle,
  HelpCircle,
  Loader2
} from "lucide-react";
import Button from "@/components/ui/Button";

// Custom Google SVG Logo Component
const GoogleIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
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

// Custom GitHub SVG Logo Component
const GithubIcon = () => (
  <svg className="w-5 h-5 shrink-0 fill-current" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const [activeTab, setActiveTab] = useState("signin"); // "signin" | "signup"
  
  // Form input states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // UI UX helper states
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Standard Forms Handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);

    if (activeTab === "signin") {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        
        if (res.ok) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          window.dispatchEvent(new Event("user-auth"));
          setSuccess("Signed in successfully! Redirecting...");
          setTimeout(() => {
            router.push(redirectPath);
          }, 1000);
        } else {
          setError(data.error || "Invalid credentials.");
          setIsLoading(false);
        }
      } catch (err) {
        console.error(err);
        setError("Connection failed. Please try again.");
        setIsLoading(false);
      }
    } else {
      // Sign Up flow
      if (!name) {
        setError("Please enter your name.");
        setIsLoading(false);
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        setIsLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (res.ok) {
          setSuccess("Account registered! Please sign in with your credentials.");
          setActiveTab("signin");
          setPassword("");
          setConfirmPassword("");
          setIsLoading(false);
        } else {
          setError(data.error || "Registration failed.");
          setIsLoading(false);
        }
      } catch (err) {
        console.error(err);
        setError("Connection failed. Please try again.");
        setIsLoading(false);
      }
    }
  };

  // Social Login Redirects
  const triggerOAuth = (provider) => {
    router.push(`/oauth/consent?provider=${provider}&redirect=${encodeURIComponent(redirectPath)}`);
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-900">
      {/* Background Mountain Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 transform scale-105 opacity-40 dark:opacity-30"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/80 to-slate-950" />

      {/* Floating Ambient Blurs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      {/* Main Glassmorphic Portal Container */}
      <div className="relative z-10 w-full max-w-md animate-fade-in">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-white font-sans">
            Welcome to <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">EcoStay AI</span>
          </h2>
          <p className="mt-2 text-sm text-slate-300 font-sans font-light">
            Direct Homestay Bookings & Sustainable Rural Tourism
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-950/40 backdrop-blur-md p-1 rounded-2xl border border-slate-700/30 mb-6">
          <button
            onClick={() => {
              setActiveTab("signin");
              setError("");
              setSuccess("");
            }}
            className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all duration-300 cursor-pointer ${
              activeTab === "signin" 
                ? "bg-emerald-600 text-white shadow-lg" 
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setActiveTab("signup");
              setError("");
              setSuccess("");
            }}
            className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all duration-300 cursor-pointer ${
              activeTab === "signup" 
                ? "bg-emerald-600 text-white shadow-lg" 
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Card Component */}
        <div className="glass rounded-3xl p-8 border border-white/10 shadow-2xl">
          
          {/* Alerts */}
          {error && (
            <div className="flex items-start gap-2.5 bg-rose-500/10 border border-rose-500/30 text-rose-300 p-3.5 rounded-2xl text-xs mb-5 animate-fade-in">
              <AlertCircle className="h-4.5 w-4.5 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="flex items-start gap-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 p-3.5 rounded-2xl text-xs mb-5 animate-fade-in">
              <CheckCircle className="h-4.5 w-4.5 shrink-0 text-emerald-400" />
              <span>{success}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {activeTab === "signup" && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                    <User className="h-5 w-5" />
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950/30 border border-slate-700/50 focus:border-emerald-500 rounded-2xl py-3 pl-11 pr-4 text-white placeholder-slate-500 text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Email Address {activeTab === "signup" ? "(Gmail Only)" : ""}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                  <Mail className="h-5 w-5" />
                </span>
                <input
                  type="email"
                  required
                  placeholder={activeTab === "signin" ? "Gmail or admin@ecostay.ai" : "yourname@gmail.com"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950/30 border border-slate-700/50 focus:border-emerald-500 rounded-2xl py-3 pl-11 pr-4 text-white placeholder-slate-500 text-sm focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                  <Lock className="h-5 w-5" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950/30 border border-slate-700/50 focus:border-emerald-500 rounded-2xl py-3 pl-11 pr-12 text-white placeholder-slate-500 text-sm focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {activeTab === "signup" && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                    <Lock className="h-5 w-5" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-slate-950/30 border border-slate-700/50 focus:border-emerald-500 rounded-2xl py-3 pl-11 pr-4 text-white placeholder-slate-500 text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Hint Box */}
            {activeTab === "signin" && (
              <div className="flex items-center justify-between text-xs pt-1">
                <div 
                  className="text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer group"
                  onClick={() => setError("Credentials hint: Admin ID is 'admin@ecostay.ai' (pw: 'admin123'). User logins require a @gmail.com.")}
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                  <span>Credentials Hint?</span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              variant="glow"
              size="lg"
              fullWidth
              className="mt-6"
              icon={isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
              iconRight={!isLoading ? <ArrowRight className="h-5 w-5" /> : null}
            >
              {isLoading ? "Processing..." : (activeTab === "signin" ? "Sign In" : "Register Account")}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900/90 text-slate-500 px-3 py-1 font-semibold rounded-lg tracking-wider">
                Or Continue With
              </span>
            </div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => triggerOAuth("google")}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 p-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-2xl font-semibold text-sm transition-all duration-300 shadow-sm cursor-pointer"
            >
              <GoogleIcon />
              <span>Google</span>
            </button>
            <button
              onClick={() => triggerOAuth("github")}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 p-3 bg-slate-950 hover:bg-slate-900 text-white border border-slate-800 rounded-2xl font-semibold text-sm transition-all duration-300 shadow-sm cursor-pointer"
            >
              <GithubIcon />
              <span>GitHub</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[90vh] flex items-center justify-center bg-slate-900">
        <Loader2 className="h-10 w-10 animate-spin text-emerald-400" />
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
