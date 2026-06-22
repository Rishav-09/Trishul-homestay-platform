"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

export default function LoginPage() {
  const router = useRouter();
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
  
  // Google Sign-In simulation states
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Pre-seed mock users in localStorage on mount if they do not exist
  useEffect(() => {
    const existingUsers = localStorage.getItem("mockUsers");
    if (!existingUsers) {
      const initialUsers = [
        { name: "Eco Guest", email: "guest@gmail.com", password: "guest123", isAdmin: false }
      ];
      localStorage.setItem("mockUsers", JSON.stringify(initialUsers));
    }
  }, []);

  // Standard Forms Handling
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (activeTab === "signin") {
      setIsLoading(true);
      
      // Simulate network delay
      setTimeout(() => {
        // 1. Check Admin Credentials
        if (email.toLowerCase() === "admin@ecostay.ai") {
          if (password === "admin123") {
            const adminUser = {
              name: "EcoStay Admin",
              email: "admin@ecostay.ai",
              isAdmin: true,
              avatar: ""
            };
            localStorage.setItem("user", JSON.stringify(adminUser));
            window.dispatchEvent(new Event("user-auth"));
            setSuccess("Admin Login Successful! Redirecting to Dashboard...");
            setTimeout(() => {
              router.push("/admin");
            }, 1000);
          } else {
            setError("Incorrect password for Administrator.");
            setIsLoading(false);
          }
          return;
        }

        // 2. Regular User: Gmail Check
        if (!email.toLowerCase().endsWith("@gmail.com")) {
          setError("Access Denied: Standard users must log in using a @gmail.com address.");
          setIsLoading(false);
          return;
        }

        // Find user in local mock database
        const users = JSON.parse(localStorage.getItem("mockUsers") || "[]");
        const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (foundUser) {
          if (foundUser.password === password) {
            localStorage.setItem("user", JSON.stringify({
              name: foundUser.name,
              email: foundUser.email,
              isAdmin: false,
              avatar: ""
            }));
            window.dispatchEvent(new Event("user-auth"));
            setSuccess("Logged in successfully! Redirecting...");
            setTimeout(() => {
              router.push("/");
            }, 1000);
          } else {
            setError("Incorrect password for this Gmail account.");
            setIsLoading(false);
          }
        } else {
          setError("No account found with this Gmail. Please sign up first.");
          setIsLoading(false);
        }
      }, 800);

    } else {
      // Sign Up flow
      if (!name) {
        setError("Please enter your name.");
        return;
      }
      if (!email.toLowerCase().endsWith("@gmail.com")) {
        setError("Invalid email: You must register with a @gmail.com address.");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      setIsLoading(true);

      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem("mockUsers") || "[]");
        const userExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());

        if (userExists) {
          setError("This Gmail address is already registered. Please sign in.");
          setIsLoading(false);
          return;
        }

        // Add new user
        const newUser = { name, email: email.toLowerCase(), password, isAdmin: false };
        users.push(newUser);
        localStorage.setItem("mockUsers", JSON.stringify(users));

        // Automatically log them in
        localStorage.setItem("user", JSON.stringify({
          name: newUser.name,
          email: newUser.email,
          isAdmin: false,
          avatar: ""
        }));
        window.dispatchEvent(new Event("user-auth"));
        setSuccess("Account created successfully! Welcome to EcoStay AI.");
        setTimeout(() => {
          router.push("/");
        }, 1200);
      }, 1000);
    }
  };

  // Google Sign In Simulation
  const triggerGoogleLogin = () => {
    setIsGoogleLoading(true);
    // Open picker modal after a short loader delay
    setTimeout(() => {
      setIsGoogleLoading(false);
      setShowGoogleModal(true);
    }, 600);
  };

  const handleSelectGoogleAccount = (googleUser) => {
    setShowGoogleModal(false);
    setIsLoading(true);
    
    // Simulate auth token exchange
    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify({
        name: googleUser.name,
        email: googleUser.email,
        isAdmin: false,
        avatar: googleUser.avatar
      }));
      window.dispatchEvent(new Event("user-auth"));
      setSuccess(`Signed in with Google as ${googleUser.name}!`);
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }, 800);
  };

  // Mock Google Accounts for Simulation Selector
  const mockGoogleAccounts = [
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

            {/* Remember & Help links */}
            {activeTab === "signin" && (
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-slate-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-emerald-600 focus:ring-emerald-500 focus:ring-opacity-25"
                  />
                  <span>Remember me</span>
                </label>
                <div 
                  className="text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer group"
                  onClick={() => setError("Credentials hint: Admin ID is 'admin@ecostay.ai' (pw: 'admin123'). User logins require a @gmail.com (Default mock user: guest@gmail.com / pw: guest123).")}
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                  <span>Credentials Hint?</span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || isGoogleLoading}
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

          {/* Google SSO Button */}
          <Button
            onClick={triggerGoogleLogin}
            disabled={isLoading || isGoogleLoading}
            variant="secondary"
            size="lg"
            fullWidth
            className="bg-white hover:bg-slate-50 text-slate-800 border-slate-200 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-800"
            icon={isGoogleLoading ? <Loader2 className="h-5 w-5 animate-spin text-slate-600" /> : <GoogleIcon />}
          >
            Sign In with Google
          </Button>
        </div>
      </div>

      {/* Simulated Google Authentication Selector Modal Overlay */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl border border-slate-100 flex flex-col">
            
            {/* Google Header Banner */}
            <div className="p-6 border-b border-slate-100 text-center flex flex-col items-center">
              <div className="mb-3">
                {/* Visual Google logo header */}
                <div className="flex gap-0.5 text-xl font-bold tracking-tight select-none">
                  <span className="text-[#4285F4]">G</span>
                  <span className="text-[#EA4335]">o</span>
                  <span className="text-[#FBBC05]">o</span>
                  <span className="text-[#4285F4]">g</span>
                  <span className="text-[#34A853]">l</span>
                  <span className="text-[#EA4335]">e</span>
                </div>
              </div>
              <h3 className="text-base font-bold text-slate-800">Sign in with Google</h3>
              <p className="text-xs text-slate-500 mt-1">to continue to <span className="font-semibold text-emerald-600">EcoStay AI</span></p>
            </div>

            {/* Google Account List */}
            <div className="p-4 space-y-2 max-h-[300px] overflow-y-auto">
              {mockGoogleAccounts.map((account) => (
                <button
                  key={account.email}
                  onClick={() => handleSelectGoogleAccount(account)}
                  className="w-full p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 flex items-center gap-3 text-left transition-all cursor-pointer group"
                >
                  <img
                    src={account.avatar}
                    alt={account.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div className="flex-grow min-w-0">
                    <p className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 truncate">
                      {account.name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {account.email}
                    </p>
                  </div>
                  <div className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center shrink-0 group-hover:border-emerald-500 group-hover:bg-emerald-500 text-transparent group-hover:text-white transition-all text-[10px] font-bold">
                    ✓
                  </div>
                </button>
              ))}
            </div>

            {/* Google Footer actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
              <button 
                onClick={() => {
                  const customName = prompt("Enter a custom Google Name:");
                  const customEmail = prompt("Enter a custom Gmail address:");
                  if (customName && customEmail) {
                    if (!customEmail.toLowerCase().endsWith("@gmail.com")) {
                      alert("Error: Custom google email must end with @gmail.com");
                      return;
                    }
                    handleSelectGoogleAccount({
                      name: customName,
                      email: customEmail.toLowerCase(),
                      avatar: ""
                    });
                  }
                }}
                className="text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer"
              >
                Use another account
              </button>
              <button
                onClick={() => setShowGoogleModal(false)}
                className="text-slate-600 hover:text-slate-800 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
