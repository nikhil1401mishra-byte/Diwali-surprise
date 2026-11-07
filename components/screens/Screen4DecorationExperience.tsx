"use client";

import React, { useState } from "react";
import { useRecipient } from "@/context/RecipientContext";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Sparkles, Lamp, Flower2, Heart } from "lucide-react";
import Image from "next/image";
import { sound } from "@/lib/sound";

export const Screen4DecorationExperience: React.FC = () => {
  const { recipient, nextScreen } = useRecipient();

  const [decorations, setDecorations] = useState({
    diyas: true,
    fairyLights: false,
    lanterns: false,
    rangoli: false,
    marigolds: false,
  });

  const toggleDecoration = (key: keyof typeof decorations) => {
    sound.playDecorationToggle();
    setDecorations((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const decorateAll = () => {
    sound.playCelebrationFanfare();
    setDecorations({
      diyas: true,
      fairyLights: true,
      lanterns: true,
      rangoli: true,
      marigolds: true,
    });
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden px-4 py-16 text-center select-none">
      {/* Background Image: Indian Veranda / House Entrance */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/screen4_veranda_steps.png"
          alt="Traditional Veranda"
          fill
          priority
          className="object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B19]/75 via-[#070B19]/35 to-[#070B19]/85" />
      </div>

      {/* Decorative Dynamic Overlays based on state */}
      {/* 1. Fairy Lights Overlay */}
      <AnimatePresence>
        {decorations.fairyLights && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="pointer-events-none absolute top-12 left-0 right-0 z-10 flex justify-around px-8"
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="h-6 w-[1px] bg-stone-600/70" />
                <div
                  className="h-3.5 w-3.5 rounded-full bg-yellow-200 shadow-[0_0_12px_#FFD700] animate-pulse"
                  style={{ animationDelay: `${(i % 4) * 0.3}s` }}
                />
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Hanging Lanterns (Kandils) */}
      <AnimatePresence>
        {decorations.lanterns && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="pointer-events-none absolute top-16 left-6 right-6 z-10 flex justify-between"
          >
            <div className="flex flex-col items-center animate-float-slow">
              <div className="h-10 w-[1px] bg-diwali-gold/80" />
              <div className="h-10 w-8 rounded-lg border border-diwali-gold/80 bg-diwali-amber/40 shadow-[0_0_25px_#FF9E2C] backdrop-blur-sm flex items-center justify-center">
                <div className="h-4 w-2 bg-yellow-200 rounded-full animate-flicker" />
              </div>
            </div>
            <div
              className="flex flex-col items-center animate-float-slow"
              style={{ animationDelay: "1.5s" }}
            >
              <div className="h-10 w-[1px] bg-diwali-gold/80" />
              <div className="h-10 w-8 rounded-lg border border-diwali-gold/80 bg-diwali-amber/40 shadow-[0_0_25px_#FF9E2C] backdrop-blur-sm flex items-center justify-center">
                <div className="h-4 w-2 bg-yellow-200 rounded-full animate-flicker" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Marigold Garland (Toran) */}
      <AnimatePresence>
        {decorations.marigolds && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="pointer-events-none absolute top-24 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5"
          >
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={i}
                className={`h-4 w-4 rounded-full shadow-md ${
                  i % 2 === 0 ? "bg-amber-500" : "bg-orange-600"
                }`}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Floor Rangoli */}
      <AnimatePresence>
        {decorations.rangoli && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6 }}
            className="pointer-events-none absolute bottom-28 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center"
          >
            <div className="h-28 w-28 rounded-full border-2 border-dashed border-diwali-gold/60 bg-gradient-to-tr from-amber-600/30 via-red-600/30 to-yellow-500/30 shadow-[0_0_35px_rgba(214,168,75,0.4)] flex items-center justify-center">
              <Flower2 className="h-14 w-14 text-diwali-goldLight animate-spin-slow opacity-80" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 mx-auto max-w-2xl pt-6"
      >
        <h1 className="font-serif text-3xl font-normal tracking-wide text-diwali-goldLight sm:text-4xl md:text-5xl">
          Decorate Your Diwali Corner
        </h1>

        <p className="mt-3 font-serif text-sm leading-relaxed text-diwali-cream/90 sm:text-base md:text-lg">
          Light the diyas, add some magic and create your own festive corner,{" "}
          <span className="font-semibold text-diwali-goldLight">{recipient}</span>!
        </p>

        {/* Interactive Toolbar Tray (matching reference image) */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {/* Diya Button */}
          <button
            onClick={() => toggleDecoration("diyas")}
            className={`group relative flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-300 ${
              decorations.diyas
                ? "border-diwali-gold bg-diwali-gold/30 shadow-goldGlow text-diwali-goldLight scale-105"
                : "border-diwali-gold/30 bg-diwali-navy/70 text-diwali-muted hover:border-diwali-gold/60"
            }`}
            title="Toggle Diyas"
          >
            <Flame className="h-6 w-6 text-diwali-amber group-hover:scale-110 transition-transform" />
          </button>

          {/* Fairy Lights Button */}
          <button
            onClick={() => toggleDecoration("fairyLights")}
            className={`group relative flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-300 ${
              decorations.fairyLights
                ? "border-diwali-gold bg-diwali-gold/30 shadow-goldGlow text-diwali-goldLight scale-105"
                : "border-diwali-gold/30 bg-diwali-navy/70 text-diwali-muted hover:border-diwali-gold/60"
            }`}
            title="Toggle Fairy Lights"
          >
            <Sparkles className="h-6 w-6 text-yellow-300 group-hover:scale-110 transition-transform" />
          </button>

          {/* Lantern Button */}
          <button
            onClick={() => toggleDecoration("lanterns")}
            className={`group relative flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-300 ${
              decorations.lanterns
                ? "border-diwali-gold bg-diwali-gold/30 shadow-goldGlow text-diwali-goldLight scale-105"
                : "border-diwali-gold/30 bg-diwali-navy/70 text-diwali-muted hover:border-diwali-gold/60"
            }`}
            title="Toggle Lanterns"
          >
            <Lamp className="h-6 w-6 text-diwali-gold group-hover:scale-110 transition-transform" />
          </button>

          {/* Rangoli Button */}
          <button
            onClick={() => toggleDecoration("rangoli")}
            className={`group relative flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-300 ${
              decorations.rangoli
                ? "border-diwali-gold bg-diwali-gold/30 shadow-goldGlow text-diwali-goldLight scale-105"
                : "border-diwali-gold/30 bg-diwali-navy/70 text-diwali-muted hover:border-diwali-gold/60"
            }`}
            title="Toggle Rangoli"
          >
            <Flower2 className="h-6 w-6 text-rose-400 group-hover:scale-110 transition-transform" />
          </button>

          {/* Marigolds Button */}
          <button
            onClick={() => toggleDecoration("marigolds")}
            className={`group relative flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-300 ${
              decorations.marigolds
                ? "border-diwali-gold bg-diwali-gold/30 shadow-goldGlow text-diwali-goldLight scale-105"
                : "border-diwali-gold/30 bg-diwali-navy/70 text-diwali-muted hover:border-diwali-gold/60"
            }`}
            title="Toggle Marigold Toran"
          >
            <span className="text-xl group-hover:scale-110 transition-transform">🏵️</span>
          </button>
        </div>

        {/* Quick Decorate All */}
        <div className="mt-3">
          <button
            onClick={decorateAll}
            className="text-xs text-diwali-gold hover:text-diwali-goldLight underline underline-offset-4 transition-colors"
          >
            Decorate Everything ✨
          </button>
        </div>
      </motion.div>

      {/* Middle message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="relative z-20 my-auto"
      >
        <p className="font-serif italic text-sm text-diwali-cream/80 max-w-sm mx-auto">
          &ldquo;Every little detail makes this celebration special.&rdquo;
        </p>
      </motion.div>

      {/* Bottom CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-20 mb-8"
      >
        <button
          onClick={nextScreen}
          className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-diwali-gold via-diwali-goldLight to-diwali-gold px-8 py-3.5 text-base font-semibold tracking-wide text-[#231505] shadow-diya transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-goldGlow"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
          <span>Create Sacred Rangoli</span>
        </button>
      </motion.div>
    </div>
  );
};

