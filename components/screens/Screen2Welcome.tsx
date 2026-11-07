"use client";

import React from "react";
import { useRecipient } from "@/context/RecipientContext";
import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import Image from "next/image";

export const Screen2Welcome: React.FC = () => {
  const { recipient, nextScreen } = useRecipient();

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden px-4 py-16 text-center select-none">
      {/* Background Layer: Palace Courtyard with Rangoli */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/screen2_palace_rangoli.png"
          alt="Palace Courtyard with Rangoli"
          fill
          priority
          className="object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B19]/75 via-[#070B19]/35 to-[#070B19]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,168,75,0.15)_0%,transparent_70%)]" />
      </div>

      {/* Top Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="relative z-20 mx-auto max-w-2xl pt-8"
      >
        <div className="mb-2 flex items-center justify-center gap-2">
          <span className="h-[1px] w-6 bg-diwali-gold/60" />
          <Sparkles className="h-4 w-4 text-diwali-gold animate-pulse" />
          <span className="h-[1px] w-6 bg-diwali-gold/60" />
        </div>

        <h1 className="font-serif text-3xl font-normal tracking-wide text-diwali-cream sm:text-4xl md:text-5xl">
          Happy Diwali,
        </h1>

        {/* Dynamic Personalized Handwritten Name */}
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="font-handwriting text-5xl font-bold tracking-wide text-diwali-goldLight sm:text-6xl md:text-7xl drop-shadow-[0_0_25px_rgba(255,230,160,0.6)]">
            {recipient}!
          </span>
          <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-diwali-gold/90 animate-pulse fill-none stroke-[2]" />
        </div>

        <p className="mx-auto mt-4 max-w-md font-serif text-sm leading-relaxed text-diwali-cream/90 sm:text-base md:text-lg">
          May your life be filled with light, love, peace and endless happiness. ✨
        </p>
      </motion.div>

      {/* Floating Center Diya Visual Highlight / Glow Anchor */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-32 w-32 rounded-full bg-diwali-amber/20 blur-2xl pointer-events-none"
        />
      </div>

      {/* Bottom CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-20 mb-8"
      >
        <button
          onClick={nextScreen}
          className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-diwali-gold via-diwali-goldLight to-diwali-gold px-8 py-3.5 text-base font-semibold tracking-wide text-[#231505] shadow-diya transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-goldGlow"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
          <span>Let&apos;s Celebrate</span>
        </button>
      </motion.div>
    </div>
  );
};

