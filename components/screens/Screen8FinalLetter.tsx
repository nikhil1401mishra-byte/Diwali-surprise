"use client";

import React, { useState, useEffect } from "react";
import { useRecipient } from "@/context/RecipientContext";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, RotateCcw, Share2, Check, Flame, Lamp } from "lucide-react";
import Image from "next/image";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";

export const Screen8FinalLetter: React.FC = () => {
  const { recipient, sender, resetExperience, goToScreen } = useRecipient();
  const [copied, setCopied] = useState(false);

  // Automatically trigger celebration on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      sound.playPaperRustle();
      sound.playCelebrationFanfare();

      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.55 },
        colors: ["#D6A84B", "#FFE6A0", "#FF9E2C", "#FFD700", "#FFF5E5"],
      });
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      const shareUrl = `${window.location.origin}/?name=${encodeURIComponent(recipient)}`;
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden px-4 py-16 text-center select-none">
      {/* Background Image: Cozy Desk with Ornate Lantern and Diya */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/screen8_letter_setting.png"
          alt="Diwali Letter Table Setting"
          fill
          priority
          className="object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B19]/80 via-[#070B19]/50 to-[#070B19]/85" />
      </div>

      {/* Top Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 mx-auto max-w-2xl pt-4"
      >
        <div className="mb-2 flex items-center justify-center gap-2">
          <span className="h-[1px] w-8 bg-diwali-gold/60" />
          <Sparkles className="h-4 w-4 text-diwali-gold animate-pulse" />
          <span className="h-[1px] w-8 bg-diwali-gold/60" />
        </div>

        <h1 className="font-serif text-3xl font-normal tracking-wide text-diwali-goldLight sm:text-4xl md:text-5xl">
          A Little Wish from Me to You ♡
        </h1>
      </motion.div>

      {/* Main Content Area: Responsive Grid (Lantern on left + Letter on right, matching reference) */}
      <div className="relative z-20 my-auto flex w-full max-w-4xl items-center justify-center gap-8 py-4">
        {/* Left Side: Glowing Brass Lantern & Diya (visible on md+ screens) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:flex flex-col items-center justify-center relative w-64"
        >
          {/* Glowing Lantern Icon / Illustration */}
          <div className="relative flex flex-col items-center">
            {/* Hanging chain */}
            <div className="h-8 w-[1px] bg-diwali-gold/80" />
            {/* Brass Lantern */}
            <div className="relative flex h-48 w-32 items-center justify-center rounded-2xl border-2 border-diwali-gold/70 bg-gradient-to-b from-[#2A1E0B] via-[#4A3414] to-[#1F1608] shadow-[0_0_50px_rgba(255,158,44,0.45)]">
              {/* Lantern Glass / Candle Glow */}
              <div className="relative flex flex-col items-center">
                <div className="h-10 w-5 rounded-full bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 animate-flicker shadow-[0_0_20px_#FFA500]" />
                <div className="h-6 w-3 bg-white/80 rounded-full blur-[2px]" />
              </div>
            </div>
          </div>

          {/* Diya at bottom of lantern */}
          <div className="mt-4 flex flex-col items-center">
            <div className="h-6 w-3 rounded-full bg-gradient-to-t from-red-600 via-amber-400 to-yellow-200 animate-flicker shadow-[0_0_15px_#FF8A00]" />
            <div className="h-4 w-16 rounded-b-full bg-amber-900 border border-diwali-gold/60 shadow-md" />
            <div className="flex gap-1.5 mt-2">
              <span className="text-xs">🏵️</span>
              <span className="text-xs">🏵️</span>
              <span className="text-xs">🏵️</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: The Parchment Letter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg rounded-2xl border-2 border-diwali-gold/50 bg-gradient-to-b from-[#FFFDF8] via-[#FAF4E6] to-[#F3E8CE] p-6 sm:p-9 text-left shadow-[0_20px_60px_-15px_rgba(0,0,0,0.85),0_0_40px_rgba(214,168,75,0.25)]"
        >
          {/* Subtle Golden Inner Border */}
          <div className="absolute inset-1.5 rounded-xl border border-diwali-gold/30 pointer-events-none" />

          {/* Letter Title */}
          <div className="mb-4 text-center">
            <span className="font-handwriting text-2xl sm:text-3xl font-bold text-amber-950">
              A Little Wish from Me to You ♡
            </span>
            <div className="my-1.5 flex items-center justify-center">
              <span className="h-[1px] w-12 bg-amber-800/30" />
              <Heart className="mx-2 h-3 w-3 fill-amber-700 text-amber-700" />
              <span className="h-[1px] w-12 bg-amber-800/30" />
            </div>
          </div>

          {/* Salutation */}
          <div className="mt-4">
            <p className="font-serif text-lg sm:text-xl font-medium text-stone-900">
              Dear{" "}
              <span className="font-handwriting text-3xl sm:text-4xl font-bold text-amber-900 underline decoration-amber-700/40">
                {recipient}
              </span>
              ,
            </p>
          </div>

          {/* Body Content */}
          <div className="mt-4 space-y-3 font-serif text-sm sm:text-base leading-relaxed text-stone-800">
            <p>
              May this Diwali bring new hopes, bigger successes, peace in your heart
              and endless happiness in your life.
            </p>
            <p>
              May your days ahead be as bright, warm and beautiful as the lights of
              Diwali.
            </p>
            <p>
              Keep shining, keep smiling, and always remember how special you are.
            </p>
            <p className="font-medium text-amber-950">
              Wishing you and your loved ones a very Happy Diwali!
            </p>
          </div>

          {/* Signature */}
          <div className="mt-6 flex flex-col items-end">
            <p className="font-serif text-sm italic text-stone-700">With warm wishes,</p>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="font-handwriting text-3xl sm:text-4xl font-bold text-amber-900">
                {sender}
              </span>
              <Heart className="h-5 w-5 fill-amber-700 text-amber-700 animate-pulse" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-20 mb-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
      >
        {/* Replay Experience */}
        <button
          onClick={() => goToScreen(0)}
          className="group flex items-center gap-2 rounded-full border border-diwali-gold/40 bg-diwali-navy/80 px-6 py-3 text-sm font-medium text-diwali-goldLight shadow-card backdrop-blur-md transition-all duration-300 hover:border-diwali-gold hover:bg-diwali-gold/20 hover:scale-105 active:scale-95"
        >
          <RotateCcw className="h-4 w-4 text-diwali-gold transition-transform group-hover:-rotate-90" />
          <span>Replay Experience</span>
        </button>

        {/* Share Surprise */}
        <button
          onClick={handleShare}
          className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-diwali-gold via-diwali-goldLight to-diwali-gold px-7 py-3 text-sm font-semibold text-[#231505] shadow-diya transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-goldGlow"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-900" />
              <span>Link Copied! ✨</span>
            </>
          ) : (
            <>
              <Share2 className="h-4 w-4" />
              <span>Share Gift Link</span>
            </>
          )}
        </button>
      </motion.div>
    </div>
  );
};
