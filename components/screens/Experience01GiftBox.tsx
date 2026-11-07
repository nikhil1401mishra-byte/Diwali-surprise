"use client";

import React, { useState } from "react";
import { useRecipient } from "@/context/RecipientContext";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Gift } from "lucide-react";
import Image from "next/image";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";

export const Experience01GiftBox: React.FC = () => {
  const { goToScreen } = useRecipient();
  const [isOpening, setIsOpening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenGift = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);
    sound.playGiftBoxOpen();

    // Trigger golden celebration confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.55 },
      colors: ["#D6A84B", "#FFE6A0", "#FFD700", "#FFF5E5"],
    });

    setTimeout(() => {
      setIsOpen(true);
      setTimeout(() => {
        // Transition to Experience 02 (Name Entry)
        goToScreen(1);
      }, 1000);
    }, 700);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 text-center select-none">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/screen1_gift_arch.png"
          alt="Palace Background"
          fill
          priority
          className="object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B19]/85 via-[#070B19]/60 to-[#070B19]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,168,75,0.18)_0%,transparent_70%)]" />
      </div>

      {/* Header Titles */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 mb-8 max-w-lg"
      >
        <div className="mb-3 flex items-center justify-center gap-2 text-diwali-gold">
          <span className="h-[1px] w-8 bg-diwali-gold/60" />
          <Sparkles className="h-5 w-5 animate-pulse text-diwali-goldLight" />
          <span className="h-[1px] w-8 bg-diwali-gold/60" />
        </div>

        <h1 className="font-serif text-3xl font-medium tracking-wide text-diwali-goldLight sm:text-5xl">
          A Little Diwali Surprise <span className="inline-block animate-pulse">✨</span>
        </h1>

        <p className="mt-3 font-serif text-base text-diwali-cream/80 sm:text-lg">
          Someone has a little surprise for you...
        </p>
      </motion.div>

      {/* 3D Golden Gift Box Container */}
      <div className="relative z-20 my-4 flex flex-col items-center justify-center">
        {/* Glow Halo behind box */}
        <div
          className={`absolute h-64 w-64 rounded-full bg-diwali-amber/25 blur-3xl transition-all duration-700 pointer-events-none ${
            isOpening ? "scale-150 opacity-100 bg-yellow-300/40" : "animate-pulse"
          }`}
        />

        {/* Interactive 3D CSS Gift Box */}
        <motion.div
          whileHover={{ scale: isOpening ? 1 : 1.06 }}
          whileTap={{ scale: isOpening ? 1 : 0.96 }}
          onClick={handleOpenGift}
          animate={
            isOpening
              ? {
                  rotate: [0, -8, 8, -6, 6, -3, 3, 0],
                  scale: [1, 1.05, 1.1],
                }
              : {
                  y: [0, -10, 0],
                }
          }
          transition={
            isOpening
              ? { duration: 0.6 }
              : { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }
          className="relative flex h-52 w-52 sm:h-64 sm:w-64 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-diwali-gold/70 bg-gradient-to-br from-[#E6B85C] via-[#B8862B] to-[#735118] p-4 shadow-[0_20px_50px_rgba(214,168,75,0.4),inset_0_2px_4px_rgba(255,255,255,0.5)] transition-all"
        >
          {/* Inner Golden Ornamental Pattern */}
          <div className="absolute inset-2 rounded-2xl border border-diwali-goldLight/40 pointer-events-none" />

          {/* Golden Silk Ribbon Cross */}
          <div className="absolute inset-y-0 w-8 bg-gradient-to-r from-[#FFF5E5] via-[#FFE6A0] to-[#E6B85C] shadow-md" />
          <div className="absolute inset-x-0 h-8 bg-gradient-to-b from-[#FFF5E5] via-[#FFE6A0] to-[#E6B85C] shadow-md" />

          {/* Gift Box Lid (Animates off when opened) */}
          <motion.div
            animate={
              isOpening
                ? { y: -80, rotateX: 45, opacity: 0 }
                : { y: 0, rotateX: 0, opacity: 1 }
            }
            transition={{ duration: 0.7 }}
            className="absolute -top-3 h-12 w-[105%] rounded-2xl border-2 border-diwali-goldLight/90 bg-gradient-to-r from-[#FFE6A0] via-[#D6A84B] to-[#B8862B] shadow-lg flex items-center justify-center"
          >
            {/* 3D Bow Ribbon */}
            <div className="relative -top-5 flex items-center justify-center">
              <div className="h-6 w-8 rounded-full border-2 border-diwali-goldLight bg-[#FFE6A0] shadow-sm -rotate-25" />
              <div className="h-4 w-4 rounded-full bg-diwali-gold shadow-md z-10" />
              <div className="h-6 w-8 rounded-full border-2 border-diwali-goldLight bg-[#FFE6A0] shadow-sm rotate-25" />
            </div>
          </motion.div>

          {/* Bursting Golden Light when opened */}
          {isOpening && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 2.5, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 rounded-full bg-radial from-yellow-100 via-amber-300 to-transparent blur-md z-20 pointer-events-none"
            />
          )}

          <div className="relative z-10 flex flex-col items-center">
            <Gift className="h-12 w-12 text-[#2A1E0B] drop-shadow-sm animate-pulse" />
          </div>
        </motion.div>

        {/* Tap Prompt Hint */}
        <motion.p
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-6 text-sm font-medium tracking-wider text-diwali-goldLight"
        >
          {isOpening ? "Unwrapping your gift... ✨" : "Tap the golden gift to open 🎁"}
        </motion.p>
      </div>
    </div>
  );
};

