"use client";

import React, { useState } from "react";
import { useRecipient } from "@/context/RecipientContext";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, X } from "lucide-react";
import Image from "next/image";
import { SWEETS_DATA } from "@/lib/constants";
import { SweetItem } from "@/types";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";

export const Screen5SweetExperience: React.FC = () => {
  const { recipient, nextScreen } = useRecipient();
  const [selectedSweet, setSelectedSweet] = useState<SweetItem | null>(null);
  const [sampledSweets, setSampledSweets] = useState<string[]>([]);

  const handleSelectSweet = (sweet: SweetItem) => {
    sound.playSweetChime();
    setSelectedSweet(sweet);
    if (!sampledSweets.includes(sweet.id)) {
      setSampledSweets((prev) => [...prev, sweet.id]);
    }
  };

  const handleTakeRandomSweet = () => {
    const randomSweet = SWEETS_DATA[Math.floor(Math.random() * SWEETS_DATA.length)];
    handleSelectSweet(randomSweet);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden px-4 py-16 text-center select-none">
      {/* Background Image: Brass Platter with Sweets */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/screen5_sweets_thali.png"
          alt="Diwali Sweets Platter"
          fill
          priority
          className="object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B19]/80 via-[#070B19]/45 to-[#070B19]/85" />
      </div>

      {/* Top Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 mx-auto max-w-2xl pt-6"
      >
        <div className="mb-2 flex items-center justify-center gap-2">
          <span className="h-[1px] w-8 bg-diwali-gold/60" />
          <Sparkles className="h-4 w-4 text-diwali-gold animate-pulse" />
          <span className="h-[1px] w-8 bg-diwali-gold/60" />
        </div>

        <h1 className="font-serif text-3xl font-normal tracking-wide text-diwali-goldLight sm:text-4xl md:text-5xl">
          Something Sweet for You! 🍬
        </h1>

        <p className="mt-2 font-serif text-sm leading-relaxed text-diwali-cream/90 sm:text-base md:text-lg">
          Because Diwali is incomplete without a little sweetness! ♡
        </p>

        <p className="mt-1 text-xs text-diwali-muted">
          Tap on any sweet below to unlock its special wish for{" "}
          <span className="text-diwali-goldLight font-medium">{recipient}</span>
        </p>
      </motion.div>

      {/* Center Interactive Sweets Grid */}
      <div className="relative z-20 my-auto flex w-full max-w-2xl flex-col items-center">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full">
          {SWEETS_DATA.map((sweet) => {
            const isSampled = sampledSweets.includes(sweet.id);

            return (
              <motion.button
                key={sweet.id}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelectSweet(sweet)}
                className={`group relative flex flex-col items-center rounded-2xl border p-4 backdrop-blur-md transition-all duration-300 ${
                  isSampled
                    ? "border-diwali-gold bg-diwali-navy/90 shadow-goldGlow"
                    : "border-diwali-gold/30 bg-diwali-navy/60 hover:border-diwali-gold hover:bg-diwali-navy/80"
                }`}
              >
                {/* Sweet Icon / Visual Preview */}
                <div
                  className="relative flex h-16 w-16 items-center justify-center rounded-full shadow-lg group-hover:rotate-6 transition-transform"
                  style={{ backgroundColor: sweet.color }}
                >
                  {/* Decorative Sparkle or Sweet representation */}
                  {sweet.id === "ladoo" && (
                    <span className="text-2xl drop-shadow">🟡</span>
                  )}
                  {sweet.id === "kajukatli" && (
                    <span className="text-2xl drop-shadow">💎</span>
                  )}
                  {sweet.id === "jalebi" && (
                    <span className="text-2xl drop-shadow">🥨</span>
                  )}
                  {sweet.id === "barfi" && (
                    <span className="text-2xl drop-shadow">🟩</span>
                  )}

                  {isSampled && (
                    <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-diwali-gold text-[10px] text-diwali-dark font-bold shadow">
                      ✓
                    </div>
                  )}
                </div>

                {/* Sweet Name & Subtitle */}
                <h3 className="mt-3 font-serif text-sm font-semibold text-diwali-cream group-hover:text-diwali-goldLight">
                  {sweet.name}
                </h3>
                <span className="text-[10px] text-diwali-muted font-sans">
                  {sweet.hindiName}
                </span>

                <span className="mt-2 text-[10px] font-medium text-diwali-gold underline underline-offset-2">
                  {isSampled ? "Read Wish Again" : "Tap to Taste"}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Take a Sweet Treat Button */}
        <div className="mt-6">
          <button
            onClick={handleTakeRandomSweet}
            className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full border border-diwali-gold bg-diwali-gold/20 px-6 py-2.5 text-sm font-medium text-diwali-goldLight shadow-card backdrop-blur-md transition-all duration-300 hover:bg-diwali-gold hover:text-[#231505]"
          >
            <span>Take a Sweet Treat</span>
          </button>
        </div>
      </div>

      {/* Modal / Popup for Sweet Wish */}
      <AnimatePresence>
        {selectedSweet && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md rounded-3xl border border-diwali-gold/60 bg-gradient-to-b from-diwali-navy via-[#121B38] to-diwali-dark p-6 sm:p-8 text-center shadow-2xl"
            >
              <button
                onClick={() => setSelectedSweet(null)}
                aria-label="Close"
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-diwali-gold/30 bg-diwali-navy text-diwali-muted hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full shadow-goldGlow mb-4" style={{ backgroundColor: selectedSweet.color }}>
                {selectedSweet.id === "ladoo" && <span className="text-3xl">🟡</span>}
                {selectedSweet.id === "kajukatli" && <span className="text-3xl">💎</span>}
                {selectedSweet.id === "jalebi" && <span className="text-3xl">🥨</span>}
                {selectedSweet.id === "barfi" && <span className="text-3xl">🟩</span>}
              </div>

              <h2 className="font-serif text-2xl font-bold text-diwali-goldLight">
                {selectedSweet.name}
              </h2>
              <p className="text-xs text-diwali-muted mb-4">{selectedSweet.description}</p>

              <div className="rounded-2xl border border-diwali-gold/30 bg-diwali-navy/80 p-4">
                <p className="font-serif text-base leading-relaxed text-diwali-cream">
                  &ldquo;{selectedSweet.wish}&rdquo;
                </p>
                <p className="mt-3 text-xs font-semibold text-diwali-goldLight">
                  — Dedicated with love to {recipient} ♡
                </p>
              </div>

              <button
                onClick={() => setSelectedSweet(null)}
                className="mt-6 w-full rounded-full bg-gradient-to-r from-diwali-gold to-diwali-goldLight py-2.5 text-sm font-semibold text-[#231505] shadow-goldGlow hover:scale-105 active:scale-95 transition-transform"
              >
                Thank You, That&apos;s Sweet! ✨
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
          <span>Make a Cosmic Wish</span>
        </button>
      </motion.div>
    </div>
  );
};

