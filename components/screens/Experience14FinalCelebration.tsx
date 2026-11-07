"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRecipient } from "@/context/RecipientContext";
import { motion } from "framer-motion";
import {
  Sparkles,
  Heart,
  RotateCcw,
  Share2,
  Check,
  Download,
  Flame,
} from "lucide-react";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";
import { toPng } from "html-to-image";

export const Experience14FinalCelebration: React.FC = () => {
  const { recipient, sender, resetExperience, goToScreen, nextScreen } = useRecipient();
  const cardRef = useRef<HTMLDivElement | null>(null);

  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    sound.playCelebrationFanfare();

    // Cascading grand finale confetti
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#D6A84B", "#FFE6A0", "#FFD700", "#FF9E2C"],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#D6A84B", "#FFE6A0", "#FFD700", "#FF9E2C"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      const shareUrl = `${window.location.origin}/?name=${encodeURIComponent(recipient)}`;
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownloadCard = async () => {
    if (!cardRef.current || isDownloading) return;
    setIsDownloading(true);
    sound.playSweetChime();

    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2, // High resolution export
      });
      const link = document.createElement("a");
      link.download = `diwali-card-for-${recipient.toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate card:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden px-4 py-16 text-center select-none bg-diwali-dark">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,168,75,0.18)_0%,transparent_75%)] pointer-events-none" />

      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 mx-auto max-w-2xl pt-4"
      >
        <div className="mb-2 flex items-center justify-center gap-2">
          <span className="h-[1px] w-8 bg-diwali-gold/60" />
          <Sparkles className="h-5 w-5 text-diwali-gold animate-pulse" />
          <span className="h-[1px] w-8 bg-diwali-gold/60" />
        </div>

        <h1 className="font-serif text-3xl font-normal tracking-wide text-diwali-goldLight sm:text-5xl">
          Happy Diwali, {recipient}! ✨
        </h1>

        <p className="mt-2 text-sm text-diwali-cream/80 sm:text-base">
          May the divine light illuminate your path with boundless joy and prosperity.
        </p>

        <div className="mt-1 flex items-center justify-center gap-1.5 text-xs text-diwali-goldLight font-medium">
          <span>With love,</span>
          <span className="font-bold">{sender}</span>
          <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500 inline-block animate-pulse" />
        </div>
      </motion.div>

      {/* Center Downloadable Personalized Greeting Card */}
      <div className="relative z-20 my-auto flex w-full max-w-md flex-col items-center py-2">
        <div
          ref={cardRef}
          className="relative w-full rounded-3xl border-2 border-diwali-gold/70 bg-gradient-to-b from-[#131B38] via-[#0D1327] to-[#070B19] p-6 sm:p-8 text-center shadow-[0_20px_50px_rgba(214,168,75,0.35)]"
        >
          {/* Ornate Gold Border Inner Inset */}
          <div className="absolute inset-2 rounded-2xl border border-diwali-gold/40 pointer-events-none" />
          <div className="absolute inset-3 rounded-xl border border-diwali-gold/20 pointer-events-none" />

          {/* Golden Arch / Festive Header Icon */}
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-diwali-gold/60 bg-diwali-gold/10 shadow-goldGlow">
            <Flame className="h-7 w-7 text-diwali-amber animate-pulse" />
          </div>

          <span className="text-[11px] font-semibold tracking-widest text-diwali-gold uppercase">
            Auspicious Diwali Greetings
          </span>

          <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-bold text-diwali-cream">
            Happy Diwali
          </h2>

          <div className="my-2">
            <span className="font-handwriting text-4xl sm:text-5xl font-bold text-diwali-goldLight drop-shadow">
              {recipient}!
            </span>
          </div>

          <p className="font-serif text-xs sm:text-sm text-diwali-cream/90 leading-relaxed px-2 mt-2">
            &ldquo;May the glow of diyas light your days ahead with peace, good
            health, warm love and endless laughter.&rdquo;
          </p>

          {/* Card Footer Signature */}
          <div className="mt-6 flex items-center justify-between border-t border-diwali-gold/30 pt-3 text-[11px] text-diwali-muted px-2">
            <span>Festival of Lights 2026</span>
            <span className="font-serif font-semibold text-diwali-goldLight">
              From {sender} ♡
            </span>
          </div>
        </div>

        {/* Card Action Buttons */}
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={handleDownloadCard}
            disabled={isDownloading}
            className="flex items-center gap-2 rounded-full border border-diwali-gold bg-diwali-gold/20 px-5 py-2.5 text-xs font-semibold text-diwali-goldLight hover:bg-diwali-gold hover:text-[#231505] transition-all shadow-card"
          >
            <Download className="h-4 w-4" />
            <span>{isDownloading ? "Generating Card..." : "Download Card (PNG)"}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-diwali-gold via-diwali-goldLight to-diwali-gold px-5 py-2.5 text-xs font-semibold text-[#231505] shadow-goldGlow hover:scale-105 active:scale-95 transition-transform"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-900" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4" />
                <span>Share Gift Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Bottom CTA to the Grand Finale */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-20 mb-6 flex flex-col sm:flex-row items-center gap-3"
      >
        <button
          onClick={nextScreen}
          className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-diwali-gold via-diwali-goldLight to-diwali-gold px-8 py-3.5 text-base font-semibold tracking-wide text-[#231505] shadow-diya transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-goldGlow"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
          <span>A Final Surprise For You ✨</span>
        </button>

        <button
          onClick={() => goToScreen(0)}
          className="group flex items-center gap-2 rounded-full border border-diwali-gold/40 bg-diwali-navy/80 px-6 py-3 text-xs font-medium text-diwali-goldLight/80 shadow-card backdrop-blur-md transition-all duration-300 hover:border-diwali-gold hover:text-diwali-goldLight hover:scale-105 active:scale-95"
        >
          <RotateCcw className="h-3.5 w-3.5 text-diwali-gold transition-transform group-hover:-rotate-90" />
          <span>Replay from Beginning</span>
        </button>
      </motion.div>
    </div>
  );
};

