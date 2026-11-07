"use client";

import React, { useState } from "react";
import { useRecipient } from "@/context/RecipientContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Star,
  Send,
  AlertCircle,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";

export const Experience08MakeAWish: React.FC = () => {
  const { recipient, nextScreen } = useRecipient();
  const [wishText, setWishText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasSentWish, setHasSentWish] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSendWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || isAnimating) return;

    const trimmed = wishText.trim();
    if (!trimmed) {
      setErrorMessage("Please write your wish before sending it into the universe ✨");
      return;
    }

    if (trimmed.length > 500) {
      setErrorMessage("Wish message cannot exceed 500 characters");
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/wishes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipient_name: recipient,
          wish_message: trimmed,
          consent_given: true,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit wish");
      }

      // Success! Play celestial sound and star animations
      setIsAnimating(true);
      sound.playWishSend();

      setTimeout(() => {
        setHasSentWish(true);
        setIsAnimating(false);
        setIsSubmitting(false);

        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.4 },
          colors: ["#FFE6A0", "#D6A84B", "#FFF5E5", "#05D9E8"],
        });
      }, 1600);
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(
        err.message || "Failed to send wish. Please try again (your text is preserved)."
      );
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden px-4 py-16 text-center select-none">
      {/* Background Layer: Deep Cosmic Night Sky */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/screen6_skyline_night.png"
          alt="Night Sky Background"
          fill
          priority
          className="object-cover object-center opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B19]/85 via-[#070B19]/55 to-[#070B19]/90" />
      </div>

      {/* Shooting Star Animation Layer */}
      {isAnimating && (
        <motion.div
          initial={{ x: "-20vw", y: "10vh", opacity: 0 }}
          animate={{ x: "120vw", y: "70vh", opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="pointer-events-none absolute z-30 flex items-center"
        >
          <div className="h-1.5 w-44 bg-gradient-to-r from-transparent via-diwali-goldLight to-white rounded-full blur-[1px]" />
          <div className="h-3 w-3 rounded-full bg-white shadow-[0_0_15px_#FFE6A0]" />
        </motion.div>
      )}

      {/* Floating Constellation Stars */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-yellow-200 animate-pulse"
            style={{
              top: `${(i * 19) % 90}%`,
              left: `${(i * 37) % 95}%`,
              width: `${(i % 3) + 1.5}px`,
              height: `${(i % 3) + 1.5}px`,
              animationDelay: `${(i % 5) * 0.4}s`,
              opacity: 0.6 + (i % 4) * 0.1,
            }}
          />
        ))}
      </div>

      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 mx-auto max-w-2xl pt-4"
      >
        <div className="mb-2 flex items-center justify-center gap-2">
          <span className="h-[1px] w-8 bg-diwali-gold/60" />
          <Star className="h-4 w-4 text-diwali-gold animate-spin-slow" />
          <span className="h-[1px] w-8 bg-diwali-gold/60" />
        </div>

        <h1 className="font-serif text-3xl font-normal tracking-wide text-diwali-goldLight sm:text-4xl md:text-5xl">
          Close your eyes and make a wish...
        </h1>

        <p className="mt-2 font-serif text-sm leading-relaxed text-diwali-cream/90 sm:text-base">
          Every beautiful dream deserves a little hope,{" "}
          <span className="font-semibold text-diwali-goldLight">{recipient}</span>.
        </p>
      </motion.div>

      {/* Center Interactive Wish Box */}
      <div className="relative z-20 my-auto flex w-full max-w-md flex-col items-center">
        <AnimatePresence mode="wait">
          {!hasSentWish ? (
            <motion.form
              key="wish-form"
              onSubmit={handleSendWish}
              exit={{ scale: 0.2, y: -200, opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="w-full flex flex-col items-center space-y-4"
            >
              {/* Text Input */}
              <div className="relative w-full">
                <textarea
                  value={wishText}
                  onChange={(e) => {
                    setWishText(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="Write your wish here..."
                  rows={3}
                  maxLength={500}
                  className="w-full rounded-2xl border border-diwali-gold/40 bg-diwali-navy/85 p-4 text-sm text-diwali-cream placeholder-diwali-muted/50 backdrop-blur-md outline-none transition-all duration-300 focus:border-diwali-gold focus:ring-2 focus:ring-diwali-gold/30 shadow-card"
                />
                <span className="absolute bottom-2.5 right-3 text-[10px] text-diwali-muted">
                  {wishText.length}/500
                </span>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1.5 text-xs text-amber-300"
                >
                  <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </motion.div>
              )}

              {/* Send Button */}
              <button
                type="submit"
                disabled={isSubmitting || isAnimating}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-diwali-gold via-diwali-goldLight to-diwali-gold px-8 py-3.5 text-base font-semibold tracking-wide text-[#231505] shadow-diya transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-goldGlow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-[#231505]" />
                    <span>Sending Into The Universe...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Send My Wish ✨</span>
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="wish-confirmation"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center p-6 rounded-3xl border border-diwali-gold/50 bg-diwali-navy/90 backdrop-blur-md shadow-2xl"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-diwali-gold/20 shadow-goldGlow">
                <Star className="h-8 w-8 text-diwali-gold animate-pulse fill-diwali-gold" />
              </div>

              <h2 className="font-serif text-2xl font-bold text-diwali-goldLight">
                Your wish has been sent into the universe! ✨
              </h2>

              <p className="mt-3 font-serif italic text-base text-diwali-cream/90 max-w-sm">
                &ldquo;May your wishes find their way to reality,{" "}
                <span className="font-semibold text-diwali-goldLight">{recipient}</span>.&rdquo;
              </p>

              <p className="mt-2 text-xs text-diwali-muted">
                Safely received and glowing brightly in Nikhil&apos;s heart.
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
          <span>Light Up The Sky</span>
        </button>
      </motion.div>
    </div>
  );
};
