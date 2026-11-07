"use client";

import React, { useState } from "react";
import { useRecipient } from "@/context/RecipientContext";
import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import Image from "next/image";

export const Experience02NameEntry: React.FC = () => {
  const { recipient, sender, startSurprise } = useRecipient();
  const [inputName, setInputName] = useState("");
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (recipient && recipient !== "Ananya") {
      setInputName(recipient);
    }
  }, [recipient]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputName.trim();
    if (!trimmed) {
      setError("Please enter your name so I can personalize your surprise ✨");
      return;
    }
    if (trimmed.length > 32) {
      setError("Name must be 32 characters or less");
      return;
    }
    setError(null);
    startSurprise(trimmed);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-16 text-center select-none">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/screen1_gift_arch.png"
          alt="Diwali Palace Archway"
          fill
          priority
          className="object-cover object-center opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B19]/75 via-[#070B19]/50 to-[#070B19]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,168,75,0.12)_0%,transparent_75%)]" />
      </div>

      {/* Decorative Ornate Golden Arch */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 z-10 flex justify-center opacity-65">
        <svg
          viewBox="0 0 1200 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full max-w-5xl text-diwali-gold/60"
        >
          <path
            d="M0,0 C300,120 450,150 600,150 C750,150 900,120 1200,0 L1200,30 C900,165 750,180 600,180 C450,180 300,165 0,30 Z"
            fill="currentColor"
            opacity="0.25"
          />
          <path
            d="M500,150 C550,170 650,170 700,150 C660,135 540,135 500,150 Z"
            fill="#D6A84B"
            opacity="0.6"
          />
          <circle cx="600" cy="165" r="4" fill="#FFE6A0" />
        </svg>
      </div>

      {/* Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-20 mx-auto flex w-full max-w-lg flex-col items-center"
      >
        <div className="mb-4 flex items-center justify-center gap-2 text-diwali-gold">
          <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-diwali-gold/80" />
          <Sparkles className="h-5 w-5 animate-pulse text-diwali-goldLight" />
          <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-diwali-gold/80" />
        </div>

        <h1 className="font-serif text-3xl font-medium tracking-wide text-diwali-goldLight sm:text-4xl md:text-5xl">
          Before we begin...
        </h1>

        <p className="mt-3 text-base font-medium tracking-wide text-diwali-cream sm:text-lg">
          What should I call you?
        </p>

        {/* Name Input Form */}
        <form onSubmit={handleSubmit} className="mt-7 w-full max-w-sm space-y-4">
          <div className="relative group">
            <input
              type="text"
              value={inputName}
              onChange={(e) => {
                setInputName(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Enter your name..."
              maxLength={32}
              autoFocus
              className="w-full rounded-full border border-diwali-gold/40 bg-diwali-navy/70 px-6 py-3.5 text-center text-base text-diwali-cream placeholder-diwali-muted/50 backdrop-blur-md outline-none transition-all duration-300 focus:border-diwali-gold focus:bg-diwali-navy/90 focus:ring-2 focus:ring-diwali-gold/30 focus:shadow-goldGlow"
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-amber-300/90"
            >
              {error}
            </motion.p>
          )}

          {/* Golden CTA Button */}
          <button
            type="submit"
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-diwali-gold via-diwali-goldLight to-diwali-gold px-8 py-3.5 text-base font-semibold tracking-wide text-[#231505] shadow-diya transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] hover:shadow-goldGlow"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            <span>Open My Surprise</span>
          </button>
        </form>

        {/* Sender Attribution */}
        <div className="mt-8 flex items-center justify-center gap-1.5 text-xs tracking-wider text-diwali-muted sm:text-sm">
          <span>A special wish from</span>
          <span className="font-semibold text-diwali-goldLight">{sender}</span>
          <Heart className="h-3.5 w-3.5 fill-diwali-gold text-diwali-gold inline-block animate-pulse" />
        </div>
      </motion.div>
    </div>
  );
};

