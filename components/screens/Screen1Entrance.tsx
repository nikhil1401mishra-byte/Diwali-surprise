"use client";

import React, { useState } from "react";
import { useRecipient } from "@/context/RecipientContext";
import { motion } from "framer-motion";
import { Sparkles, Heart, Gift } from "lucide-react";
import Image from "next/image";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";

export const Screen1Entrance: React.FC = () => {
  const { recipient, sender, startSurprise } = useRecipient();
  const [inputName, setInputName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [giftClicked, setGiftClicked] = useState(false);
  const [diyaLit, setDiyaLit] = useState(true);

  // Sync if recipient changes or is passed via URL param
  React.useEffect(() => {
    if (recipient && recipient !== "Ananya") {
      setInputName(recipient);
    }
  }, [recipient]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputName.trim();
    if (!trimmed) {
      setError("Please enter your name to unlock your Diwali surprise ✨");
      return;
    }
    if (trimmed.length > 32) {
      setError("Name must be 32 characters or less");
      return;
    }
    setError(null);
    startSurprise(trimmed);
  };

  const handleGiftClick = () => {
    sound.playSweetChime();
    setGiftClicked(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { x: 0.85, y: 0.8 },
      colors: ["#D6A84B", "#FFE6A0", "#FFD700"],
    });
    setTimeout(() => setGiftClicked(false), 800);
  };

  const handleDiyaClick = () => {
    sound.playDiyaLight();
    setDiyaLit((prev) => !prev);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-16 text-center select-none">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/screen1_gift_arch.png"
          alt="Diwali Palace Archway"
          fill
          priority
          className="object-cover object-center opacity-75"
        />
        {/* Cinematic Vignette & Deep Navy Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B19]/70 via-[#070B19]/45 to-[#070B19]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,168,75,0.12)_0%,transparent_75%)]" />
      </div>

      {/* Decorative Ornate Golden Arch (Top SVG Framing) */}
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
        {/* Top Ornament */}
        <div className="mb-4 flex items-center justify-center gap-2 text-diwali-gold">
          <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-diwali-gold/80" />
          <Sparkles className="h-5 w-5 animate-pulse text-diwali-goldLight" />
          <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-diwali-gold/80" />
        </div>

        {/* Main Heading */}
        <h1 className="font-serif text-3xl font-medium tracking-wide text-diwali-goldLight sm:text-4xl md:text-5xl">
          A Little Diwali Surprise <span className="inline-block animate-pulse">✨</span>
        </h1>

        {/* Subtitle & Question */}
        <div className="mt-4 space-y-1">
          <p className="font-serif text-base text-diwali-muted sm:text-lg">
            Before we begin...
          </p>
          <p className="text-sm font-medium tracking-wide text-diwali-cream sm:text-base">
            What should I call you?
          </p>
        </div>

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
            {/* Shimmer light effect */}
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

      {/* Bottom Left: Interactive Glowing Clay Diya (Matching reference image) */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        onClick={handleDiyaClick}
        title="Click to light the diya!"
        className="hidden sm:flex absolute bottom-8 left-8 z-20 flex-col items-center cursor-pointer group"
      >
        {diyaLit && (
          <div className="relative mb-0.5 flex flex-col items-center">
            <div className="h-7 w-3.5 rounded-full bg-gradient-to-t from-diwali-flame via-diwali-amber to-yellow-200 shadow-[0_0_15px_#FF9E2C] animate-flicker" />
            <div className="absolute bottom-0 h-3 w-1.5 rounded-full bg-yellow-100/90 blur-[1px]" />
          </div>
        )}
        <div className="relative flex items-center justify-center rounded-b-full px-5 py-2 border border-diwali-gold/50 bg-gradient-to-b from-[#8C3C17] to-[#4A1D0B] shadow-[0_4px_20px_rgba(255,158,44,0.35)] group-hover:scale-105 transition-transform">
          <span className="text-[10px] font-serif text-diwali-cream/90">🪔 Diya</span>
        </div>
        <div className="flex gap-1 mt-1 text-[10px]">
          <span>🏵️</span>
          <span>🏵️</span>
        </div>
      </motion.div>

      {/* Bottom Right: Interactive Golden Gift Box (Matching reference image) */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        onClick={handleGiftClick}
        title="A gift wrapped for you! Click to open."
        className="hidden sm:flex absolute bottom-8 right-8 z-20 flex-col items-center cursor-pointer group"
      >
        <motion.div
          animate={giftClicked ? { rotate: [0, -10, 10, -5, 5, 0], scale: 1.1 } : {}}
          className="relative flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-diwali-gold bg-gradient-to-br from-amber-400 via-diwali-gold to-amber-700 shadow-goldGlow group-hover:scale-105 transition-transform"
        >
          {/* Silk Ribbon Cross */}
          <div className="absolute inset-y-0 w-2.5 bg-yellow-100 shadow-sm" />
          <div className="absolute inset-x-0 h-2.5 bg-yellow-100 shadow-sm" />
          <Gift className="relative z-10 h-7 w-7 text-amber-950" />
        </motion.div>
        <span className="mt-1.5 text-[10px] font-medium tracking-wider text-diwali-goldLight group-hover:underline">
          Tap Gift 🎁
        </span>
      </motion.div>
    </div>
  );
};
