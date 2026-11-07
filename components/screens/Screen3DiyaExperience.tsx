"use client";

import React, { useState } from "react";
import { useRecipient } from "@/context/RecipientContext";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import Image from "next/image";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";

interface DiyaData {
  id: number;
  label: string;
  isLit: boolean;
  blessing: string;
}

export const Screen3DiyaExperience: React.FC = () => {
  const { recipient, nextScreen } = useRecipient();

  const [diyas, setDiyas] = useState<DiyaData[]>([
    { id: 1, label: "Peace", isLit: true, blessing: "Inner peace & calmness" },
    { id: 2, label: "Joy", isLit: false, blessing: "Endless laughter & smiles" },
    { id: 3, label: "Health", isLit: false, blessing: "Vibrant health & vitality" },
    { id: 4, label: "Success", isLit: false, blessing: "Triumph in all your endeavors" },
    { id: 5, label: "Prosperity", isLit: false, blessing: "Abundance & prosperity" },
    { id: 6, label: "Love", isLit: false, blessing: "Warmth & unconditional love" },
    { id: 7, label: "Wisdom", isLit: false, blessing: "Clarity, courage & divine light" },
  ]);

  const [activeBlessing, setActiveBlessing] = useState<string>(
    "Tap an unlit diya to spread the light!"
  );

  const litCount = diyas.filter((d) => d.isLit).length;
  const allLit = litCount === diyas.length;

  const handleLightDiya = (id: number) => {
    const target = diyas.find((d) => d.id === id);
    if (!target || target.isLit) return;

    sound.playDiyaLight();

    const updated = diyas.map((d) =>
      d.id === id ? { ...d, isLit: true } : d
    );
    setDiyas(updated);
    setActiveBlessing(target.blessing);

    // If all are now lit, trigger celebration!
    if (updated.every((d) => d.isLit)) {
      sound.playCelebrationFanfare();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#D6A84B", "#FFE6A0", "#FF9E2C", "#FFD700", "#FFFFFF"],
      });
      setActiveBlessing("✨ All diyas are glowing bright! May your life always radiate light, " + recipient + "!");
    }
  };

  const handleLightAll = () => {
    sound.playCelebrationFanfare();
    setDiyas((prev) => prev.map((d) => ({ ...d, isLit: true })));
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#D6A84B", "#FFE6A0", "#FF9E2C", "#FFD700", "#FFFFFF"],
    });
    setActiveBlessing("✨ All diyas are glowing bright! May your life always radiate light, " + recipient + "!");
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden px-4 py-16 text-center select-none">
      {/* Background Image: Moody dark reflective marble table with glowing diyas */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/screen3_diyas_surface.png"
          alt="Glowing Diyas Background"
          fill
          priority
          className="object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B19]/80 via-[#070B19]/50 to-[#070B19]/85" />
        {/* Dynamic warm light wash based on lit count */}
        <div
          className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 65%, rgba(255, 158, 44, ${0.08 + (litCount / diyas.length) * 0.25}) 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* Top Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 mx-auto max-w-2xl pt-6"
      >
        <h1 className="font-serif text-3xl font-normal tracking-wide text-diwali-goldLight sm:text-4xl md:text-5xl">
          Every little light makes a difference.
        </h1>

        {/* Golden line with heart */}
        <div className="my-3 flex items-center justify-center gap-3">
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-diwali-gold/80" />
          <Heart className="h-4 w-4 fill-diwali-gold text-diwali-gold animate-pulse" />
          <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-diwali-gold/80" />
        </div>

        <p className="font-serif text-sm leading-relaxed text-diwali-cream/90 sm:text-base md:text-lg">
          Just like a diya removes darkness, may you always bring light and positivity
          wherever you go,{" "}
          <span className="font-semibold text-diwali-goldLight">{recipient}</span>.
        </p>
      </motion.div>

      {/* Center Interactive Diya Row */}
      <div className="relative z-20 my-auto flex w-full max-w-3xl flex-col items-center">
        {/* Diyas Grid / Flex Container */}
        <div className="grid grid-cols-4 sm:flex sm:flex-wrap items-center justify-center gap-3 sm:gap-5 md:gap-7 p-2">
          {diyas.map((diya) => (
            <motion.div
              key={diya.id}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleLightDiya(diya.id)}
              className={`group relative flex flex-col items-center cursor-pointer transition-all duration-300 ${
                diya.isLit ? "opacity-100" : "opacity-75 hover:opacity-100"
              }`}
            >
              {/* Flame Glow Layer (when lit) */}
              {diya.isLit && (
                <div className="absolute -top-6 h-12 w-12 rounded-full bg-diwali-amber/40 blur-lg animate-pulse" />
              )}

              {/* Diya SVG Illustration */}
              <div className="relative flex flex-col items-center">
                {/* Flame */}
                {diya.isLit ? (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative mb-0.5 flex flex-col items-center"
                  >
                    {/* Outer Flame (Orange) */}
                    <div className="h-8 w-4 rounded-full bg-gradient-to-t from-diwali-flame via-diwali-amber to-yellow-200 shadow-[0_0_15px_#FF9E2C] animate-flicker" />
                    {/* Inner Flame (White-Yellow core) */}
                    <div className="absolute bottom-0 h-4 w-2 rounded-full bg-yellow-100/90 blur-[1px]" />
                  </motion.div>
                ) : (
                  <div className="mb-0.5 flex flex-col items-center group-hover:scale-110 transition-transform">
                    {/* Unlit Wick with gentle sparkle hint */}
                    <div className="h-2.5 w-1 bg-stone-700 rounded-t-sm" />
                    <span className="text-[10px] text-diwali-goldLight/70 animate-pulse font-mono">
                      ✦
                    </span>
                  </div>
                )}

                {/* Terracotta Diya Clay Body */}
                <div
                  className={`relative flex items-center justify-center rounded-b-full px-5 py-2.5 transition-all duration-300 ${
                    diya.isLit
                      ? "border border-diwali-gold/60 bg-gradient-to-b from-[#8C3C17] to-[#4A1D0B] shadow-[0_4px_20px_rgba(255,158,44,0.35)]"
                      : "border border-stone-700/80 bg-stone-900/90 shadow-inner group-hover:border-diwali-gold/40"
                  }`}
                >
                  <span className="text-[10px] font-serif font-semibold tracking-wide text-diwali-cream/80">
                    {diya.label}
                  </span>
                </div>
              </div>

              {/* Status Hint */}
              <span className="mt-2 text-[10px] font-medium tracking-wider text-diwali-muted">
                {diya.isLit ? "Glowing" : "Tap to Light"}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Status / Blessing Card */}
        <motion.div
          key={activeBlessing}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-full border border-diwali-gold/30 bg-diwali-navy/80 px-6 py-2.5 shadow-card backdrop-blur-md"
        >
          <p className="text-xs sm:text-sm font-medium text-diwali-goldLight">
            {activeBlessing}
          </p>
        </motion.div>

        {/* Progress & Quick Light All */}
        <div className="mt-4 flex items-center gap-4 text-xs text-diwali-muted">
          <span>{litCount} of {diyas.length} Diyas Lit</span>
          {!allLit && (
            <button
              onClick={handleLightAll}
              className="text-diwali-gold hover:text-diwali-goldLight underline underline-offset-4 transition-colors"
            >
              Light All at Once ✨
            </button>
          )}
        </div>
      </div>

      {/* Bottom Navigation CTA */}
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
          <span>Decorate the Porch</span>
        </button>
      </motion.div>
    </div>
  );
};

