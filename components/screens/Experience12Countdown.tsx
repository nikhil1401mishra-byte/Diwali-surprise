"use client";

import React, { useState, useEffect } from "react";
import { useRecipient } from "@/context/RecipientContext";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";

export const Experience12Countdown: React.FC = () => {
  const { recipient, nextScreen } = useRecipient();
  const [count, setCount] = useState(3);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    sound.playCountdownTick(count);
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate?.(60);
    }

    if (count > 1) {
      const timer = setTimeout(() => {
        setCount((prev) => prev - 1);
      }, 1200);
      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(() => {
        setIsFinished(true);
        sound.playCelebrationFanfare();

        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.5 },
          colors: ["#FFE6A0", "#D6A84B", "#FFD700", "#FF9E2C", "#FFFFFF"],
        });

        // Automatically advance to Experience 13 (Secret Letter)
        setTimeout(() => {
          nextScreen();
        }, 1200);
      }, 1200);
      return () => clearTimeout(finalTimer);
    }
  }, [count, nextScreen]);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 text-center select-none bg-diwali-dark">
      {/* Dynamic ambient pulsing glow */}
      <div className="absolute h-96 w-96 rounded-full bg-diwali-amber/20 blur-[100px] animate-pulse pointer-events-none" />

      {/* Top Tagline */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-20 mb-8"
      >
        <span className="text-sm font-semibold tracking-widest text-diwali-gold uppercase">
          Special Message Arriving
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-diwali-cream mt-1">
          A personal wish for {recipient}...
        </h2>
      </motion.div>

      {/* Huge Animated Number */}
      <div className="relative z-20 flex h-48 w-48 items-center justify-center">
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key={count}
              initial={{ scale: 0.4, opacity: 0, rotate: -15 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 1.8, opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-8xl sm:text-9xl font-bold tracking-tight text-gold-shimmer drop-shadow-[0_0_40px_rgba(214,168,75,0.7)]"
            >
              {count}
            </motion.div>
          ) : (
            <motion.div
              key="spark"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              className="flex flex-col items-center justify-center"
            >
              <Sparkles className="h-20 w-20 text-diwali-goldLight animate-pulse" />
              <span className="font-serif text-2xl font-bold text-diwali-goldLight mt-2">
                Unfolding with Love ♡
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

