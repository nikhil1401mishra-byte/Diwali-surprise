"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, Lock, Mail, Key, AlertCircle, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setErrorMessage(null);
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password: password,
      });

      if (error) {
        throw new Error(error.message);
      }

      // Check if logged in user is admin
      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(
        err.message || "Invalid credentials. Please verify your email and password."
      );
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-diwali-dark px-4 py-16 text-center select-none">
      {/* Background radial gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,168,75,0.15)_0%,transparent_70%)] pointer-events-none" />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md rounded-3xl border border-diwali-gold/40 bg-diwali-navy/90 p-8 shadow-2xl backdrop-blur-md text-left"
      >
        {/* Header Icon */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-diwali-gold/50 bg-diwali-gold/15 shadow-goldGlow">
          <Lock className="h-7 w-7 text-diwali-gold" />
        </div>

        <div className="text-center">
          <span className="text-[11px] font-semibold tracking-widest text-diwali-gold uppercase">
            Private Admin Portal
          </span>
          <h1 className="mt-1 font-serif text-3xl font-bold text-diwali-cream">
            Nikhil&apos;s Dashboard
          </h1>
          <p className="mt-2 text-xs text-diwali-muted">
            Sign in to view all wishes shared by your Diwali visitors.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-xs font-medium text-diwali-goldLight mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-diwali-muted" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="nikhil@example.com"
                required
                className="w-full rounded-xl border border-diwali-gold/30 bg-diwali-dark/80 pl-10 pr-4 py-2.5 text-sm text-diwali-cream placeholder-diwali-muted/50 outline-none transition-all focus:border-diwali-gold focus:ring-1 focus:ring-diwali-gold/30"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-medium text-diwali-goldLight mb-1.5">
              Password
            </label>
            <div className="relative">
              <Key className="absolute left-3.5 top-3.5 h-4 w-4 text-diwali-muted" />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="••••••••••••"
                required
                className="w-full rounded-xl border border-diwali-gold/30 bg-diwali-dark/80 pl-10 pr-4 py-2.5 text-sm text-diwali-cream placeholder-diwali-muted/50 outline-none transition-all focus:border-diwali-gold focus:ring-1 focus:ring-diwali-gold/30"
              />
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 rounded-lg bg-red-950/60 border border-red-800/60 p-2.5 text-xs text-red-300"
            >
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="group relative mt-2 flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-diwali-gold via-diwali-goldLight to-diwali-gold py-3 text-sm font-bold text-[#231505] shadow-diya transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-goldGlow disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-[#231505]" />
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <span>Enter Admin Dashboard</span>
            )}
          </button>
        </form>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs text-diwali-muted hover:text-diwali-goldLight transition-colors"
          >
            Return to Diwali Gift Experience
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

