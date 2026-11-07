"use client";

import React, { useState } from "react";
import { useRecipient } from "@/context/RecipientContext";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Star, Lamp, Heart, Trophy, Check } from "lucide-react";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";

interface QuestItem {
  id: string;
  name: string;
  hint: string;
  secretWish: string;
  icon: string;
  found: boolean;
}

export const Experience11HiddenChallenges: React.FC = () => {
  const { recipient, nextScreen } = useRecipient();

  const [quests, setQuests] = useState<QuestItem[]>([
    {
      id: "star",
      name: "The Golden Star of Luck",
      hint: "Hidden in the twilight sky...",
      secretWish: "May fortune smile upon your every step and blessing, " + recipient + "!",
      icon: "⭐",
      found: false,
    },
    {
      id: "kandil",
      name: "The Royal Lantern",
      hint: "Floating gently near the archway...",
      secretWish: "May your home always be warm with friendship and laughter, " + recipient + "!",
      icon: "🏮",
      found: false,
    },
    {
      id: "diya",
      name: "The Sacred Eternal Flame",
      hint: "Resting upon golden petals...",
      secretWish: "May your spirit remain forever courageous, kind and radiant, " + recipient + "!",
      icon: "🪔",
      found: false,
    },
    {
      id: "sweet",
      name: "The Secret Golden Ladoo",
      hint: "Tucked inside the royal pantry...",
      secretWish: "You found a little extra happiness! May all your days be sweet and joyful, " + recipient + "! ♡",
      icon: "🍬",
      found: false,
    },
  ]);

  const [revealedSecret, setRevealedSecret] = useState<string | null>(null);

  const handleFindItem = (id: string) => {
    sound.playSweetChime();
    const item = quests.find((q) => q.id === id);
    if (!item) return;

    setQuests((prev) =>
      prev.map((q) => (q.id === id ? { ...q, found: true } : q))
    );
    setRevealedSecret(item.secretWish);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.55 },
      colors: ["#FFE6A0", "#D6A84B", "#FFD700"],
    });
  };

  const foundCount = quests.filter((q) => q.found).length;

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden px-4 py-16 text-center select-none">
      {/* Top Header */}
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
          Hidden Festive Secrets ✨
        </h1>

        <p className="mt-2 font-serif text-sm leading-relaxed text-diwali-cream/90 sm:text-base">
          There are 4 hidden Diwali treasures waiting to be discovered,{" "}
          <span className="font-semibold text-diwali-goldLight">{recipient}</span>!
          Tap the interactive floating items below to reveal secret wishes.
        </p>

        <div className="mt-2 text-xs font-semibold text-diwali-gold">
          {foundCount} of 4 Secrets Discovered {foundCount === 4 && "🎉 All Found!"}
        </div>
      </motion.div>

      {/* Interactive Quest Field */}
      <div className="relative z-20 my-auto flex w-full max-w-lg flex-col items-center">
        <div className="grid grid-cols-2 gap-4 w-full">
          {quests.map((q) => (
            <motion.button
              key={q.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFindItem(q.id)}
              className={`flex flex-col items-center p-5 rounded-2xl border transition-all ${
                q.found
                  ? "border-diwali-gold bg-diwali-navy/90 shadow-goldGlow"
                  : "border-diwali-gold/30 bg-diwali-navy/60 hover:border-diwali-gold"
              }`}
            >
              <span className="text-3xl mb-2 animate-bounce">{q.icon}</span>
              <h3 className="font-serif text-sm font-semibold text-diwali-cream">
                {q.name}
              </h3>
              <p className="text-[10px] text-diwali-muted mt-1">
                {q.found ? "✓ Discovered!" : q.hint}
              </p>
            </motion.button>
          ))}
        </div>

        {/* Revealed Secret Toast / Modal */}
        <AnimatePresence>
          {revealedSecret && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 rounded-2xl border border-diwali-gold bg-diwali-navy/95 p-4 shadow-2xl backdrop-blur-md max-w-sm"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-diwali-goldLight mb-1">
                <Trophy className="h-4 w-4 text-diwali-gold" />
                <span>Secret Wish Unlocked!</span>
              </div>
              <p className="font-serif text-sm text-diwali-cream leading-relaxed">
                &ldquo;{revealedSecret}&rdquo;
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-20 mb-6"
      >
        <button
          onClick={nextScreen}
          className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-diwali-gold via-diwali-goldLight to-diwali-gold px-8 py-3.5 text-base font-semibold tracking-wide text-[#231505] shadow-diya transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-goldGlow"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
          <span>Prepare for the Reveal</span>
        </button>
      </motion.div>
    </div>
  );
};

