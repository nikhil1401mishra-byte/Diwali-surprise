"use client";

import React, { useState } from "react";
import { useRecipient } from "@/context/RecipientContext";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import Image from "next/image";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";

export const Experience13SecretLetter: React.FC = () => {
  const { recipient, nextScreen } = useRecipient();
  const [stage, setStage] = useState<"sealed" | "opening" | "revealed">("sealed");

  const handleOpenEnvelope = () => {
    if (stage !== "sealed") return;
    setStage("opening");
    sound.playWaxSealBreak();

    // Trigger golden sparkles/confetti burst
    setTimeout(() => {
      sound.playCelebrationFanfare();
      confetti({
        particleCount: 85,
        spread: 90,
        origin: { y: 0.5 },
        colors: ["#FFE6A0", "#D6A84B", "#FFD700", "#FFF5E5", "#FF9E2C"],
      });
      setStage("revealed");
    }, 1000);
  };

  return (
    <div className="relative h-screen w-full overflow-y-auto overflow-x-hidden flex flex-col items-center select-none bg-diwali-dark scroll-smooth">
      {/* Background Image Layer (Fixed so it stays ambient while content scrolls) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image
          src="/images/screen8_letter_setting.png"
          alt="Festive Letter Desk Setting"
          fill
          priority
          className="object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B19]/90 via-[#070B19]/70 to-[#070B19]/90" />
      </div>

      {/* Floating Golden Particles & Sparkles */}
      <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden">
        {Array.from({ length: 28 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${(i % 3) + 1.5}px`,
              height: `${(i % 3) + 1.5}px`,
              backgroundColor: i % 2 === 0 ? "#FFE6A0" : "#D6A84B",
              boxShadow: "0 0 8px #FFE6A0",
              left: `${(i * 37 + 11) % 96}%`,
              top: `${(i * 29 + 17) % 94}%`,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.2, 0.85, 0.2],
              scale: [0.8, 1.25, 0.8],
            }}
            transition={{
              duration: 3 + (i % 4),
              repeat: Infinity,
              delay: (i % 7) * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Ambient Diya Glow Orbs */}
        <div className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-amber-500/15 blur-3xl" />
        <div className="absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-diwali-gold/15 blur-3xl" />
      </div>

      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 mx-auto max-w-2xl pt-12 pb-4 text-center px-4 shrink-0"
      >
        <div className="mb-2 flex items-center justify-center gap-2">
          <span className="h-[1px] w-8 bg-diwali-gold/60" />
          <Sparkles className="h-4 w-4 text-diwali-gold animate-pulse" />
          <span className="h-[1px] w-8 bg-diwali-gold/60" />
        </div>

        <h1 className="font-serif text-2xl font-normal tracking-wide text-diwali-goldLight sm:text-3xl md:text-4xl">
          A Little Diwali Surprise ✨
        </h1>
        <p className="mt-1 font-serif text-xs text-diwali-cream/80 sm:text-sm">
          A heartfelt secret letter, written just for you
        </p>
      </motion.div>

      {/* Main Content Area */}
      <div className="relative z-20 w-full max-w-xl px-4 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {stage === "sealed" || stage === "opening" ? (
            /* Golden Glowing Sealed Envelope with 3D Flap */
            <motion.div
              key="envelope"
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
                boxShadow: stage === "opening"
                  ? "0 0 60px 20px rgba(214,168,75,0.7), 0 0 100px rgba(255,158,44,0.4)"
                  : "0 15px 45px rgba(0,0,0,0.7), 0 0 35px rgba(214,168,75,0.35)",
              }}
              exit={{ scale: 0.8, opacity: 0, y: -30, filter: "blur(6px)" }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              onClick={handleOpenEnvelope}
              className="group relative my-8 sm:my-12 flex h-64 sm:h-72 w-full max-w-md cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-diwali-gold/70 bg-gradient-to-br from-[#2D1F0E] via-[#463116] to-[#1C1208] p-6 shadow-2xl transition-all duration-300 hover:scale-[1.03]"
            >
              {/* Outer Golden Glow Border Accent */}
              <div className="absolute inset-1 rounded-[22px] border border-diwali-goldLight/20 pointer-events-none" />

              {/* Envelope Flap Fold Lines */}
              <motion.div
                animate={
                  stage === "opening"
                    ? { rotateX: -160, opacity: 0.4 }
                    : { rotateX: 0 }
                }
                transition={{ duration: 0.9, ease: "easeInOut" }}
                style={{ transformOrigin: "top" }}
                className="absolute top-0 inset-x-0 h-32 border-b-2 border-diwali-gold/50 [clip-path:polygon(0_0,50%_100%,100%_0)] bg-gradient-to-b from-[#3D2B13] to-[#2B1D0C] shadow-md z-10"
              />

              {/* Glowing Golden Light Rays Emitter during opening */}
              {stage === "opening" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1.8 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                >
                  <div className="h-44 w-44 rounded-full bg-gradient-to-r from-diwali-gold via-white to-diwali-goldLight blur-2xl opacity-80" />
                </motion.div>
              )}

              <span className="font-handwriting text-2xl sm:text-3xl text-diwali-goldLight mb-6 drop-shadow-md z-10">
                Only for you, {recipient} ♡
              </span>

              {/* Royal Red Wax Seal Medallion */}
              <motion.div
                animate={
                  stage === "opening"
                    ? { scale: [1, 1.3, 0], rotate: [0, -25, 45], opacity: [1, 1, 0] }
                    : { scale: [1, 1.06, 1] }
                }
                transition={
                  stage === "opening"
                    ? { duration: 0.7 }
                    : { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }
                className="relative z-20 flex h-20 w-20 sm:h-22 sm:w-22 items-center justify-center rounded-full border-4 border-amber-950 bg-gradient-to-br from-red-700 via-rose-800 to-amber-950 shadow-[0_10px_35px_rgba(185,28,28,0.6)]"
              >
                <div className="flex flex-col items-center">
                  <Heart className="h-7 w-7 text-yellow-200 fill-yellow-200" />
                  <span className="text-[11px] font-serif font-bold tracking-wider text-yellow-100">
                    Nikhil
                  </span>
                </div>
              </motion.div>

              <span className="mt-5 text-xs sm:text-sm font-medium tracking-wider text-diwali-goldLight group-hover:underline z-10">
                {stage === "opening" ? "Opening your surprise..." : "Tap the golden wax seal to open 💌"}
              </span>
            </motion.div>
          ) : (
            /* Complete Unfolded Handwritten-Style Letter Card (Natural Height, Fully Scrollable) */
            <motion.div
              key="letter"
              initial={{ opacity: 0, scale: 0.95, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full rounded-2xl border-2 border-diwali-gold/55 bg-gradient-to-b from-[#FFFDF7] via-[#FBF5E8] to-[#F4E9CF] p-5 sm:p-8 md:p-9 text-left shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(214,168,75,0.3)] my-4"
            >
              {/* Inner Decorative Golden Border */}
              <div className="absolute inset-2 sm:inset-2.5 rounded-xl border border-diwali-gold/35 pointer-events-none" />

              {/* Diya Glow Accents in Corners */}
              <div className="absolute -top-4 -left-4 h-20 w-20 rounded-full bg-amber-500/20 blur-xl pointer-events-none" />
              <div className="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-amber-500/20 blur-xl pointer-events-none" />
              <div className="absolute -bottom-4 -right-4 h-20 w-20 rounded-full bg-amber-500/20 blur-xl pointer-events-none" />

              {/* Letter Heading: # A Little Diwali Surprise ✨ */}
              <div className="mb-4 text-center">
                <h2 className="font-handwriting text-2xl sm:text-3xl md:text-4xl font-bold text-amber-950">
                  A Little Diwali Surprise ✨
                </h2>
                <div className="my-2 flex items-center justify-center">
                  <span className="h-[1px] w-12 bg-amber-800/30" />
                  <Heart className="mx-2 h-3.5 w-3.5 fill-amber-700 text-amber-700" />
                  <span className="h-[1px] w-12 bg-amber-800/30" />
                </div>
              </div>

              {/* Greeting: **Hey, [Recipient Name] ❤️** */}
              <div className="font-serif text-lg sm:text-xl font-bold text-stone-900 mb-3.5">
                Hey,{" "}
                <span className="font-handwriting text-2xl sm:text-3xl font-bold text-amber-900 underline decoration-amber-700/40">
                  {recipient}
                </span>{" "}
                ❤️
              </div>

              {/* Complete Original Letter Paragraphs */}
              <div className="space-y-4 font-serif text-sm sm:text-base leading-relaxed text-stone-800">
                {/* Paragraph 1 */}
                <p>
                  Pata hai, Diwali toh har saal aati hai… lights hoti hain, diye jalte hain, mithaiyan hoti hain aur har jagah khushiyon se bhari hoti hai.
                </p>

                {/* Paragraph 2 */}
                <p>
                  Lekin iss baar socha, kyun na tumhare liye kuch aisa banaya jaaye jo thoda different ho… something that brings a little extra smile to your face. 🥹
                </p>

                {/* Paragraph 3 */}
                <p>
                  I don&apos;t know how your day is going, but I hope this little surprise makes it a little brighter.
                </p>

                {/* Paragraph 4 */}
                <p>
                  Tumhari smile bhi kisi Diwali ki roshni se kam nahi hai. Aur honestly, kuch log bina kisi special reason ke bhi special hote hain… tum unhi mein se ek ho. ❤️
                </p>

                {/* Paragraph 5 */}
                <p>
                  I hope tumhari life hamesha khushiyon se bhari rahe, tumhare saare dreams slowly but surely poore hon, aur tumhe woh sab mile jo tum deserve karte ho.
                </p>

                {/* Paragraph 6 */}
                <p>
                  Aur haan, ek chhoti si wish meri taraf se…
                </p>

                {/* Highlighted Quote: **May your life always sparkle brighter than a thousand diyas. ✨** */}
                <div className="rounded-xl border-l-4 border-amber-600 bg-amber-500/10 px-4 py-3 font-serif text-base sm:text-lg font-bold text-amber-950 shadow-sm my-2">
                  May your life always sparkle brighter than a thousand diyas. ✨
                </div>

                {/* Paragraph 7 */}
                <p>
                  Thank you for being someone worth creating this little surprise for.
                </p>

                {/* Paragraph 8 */}
                <p>
                  Keep smiling, keep shining, and never forget how special you are.
                </p>

                {/* Ending Wish: **Happy Diwali, [Recipient Name]! 🪔** */}
                <div className="font-serif text-base sm:text-lg font-bold text-amber-950 pt-2">
                  Happy Diwali,{" "}
                  <span className="font-handwriting text-2xl sm:text-3xl text-amber-900 underline decoration-amber-700/40">
                    {recipient}
                  </span>
                  ! 🪔
                </div>
              </div>

              {/* Sign Off: With lots of warmth, Nikhil ❤️ */}
              <div className="mt-7 flex flex-col items-end">
                <p className="font-serif text-sm sm:text-base italic text-stone-700">
                  With lots of warmth,
                </p>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="font-handwriting text-3xl sm:text-4xl font-bold text-amber-900">
                    Nikhil
                  </span>
                  <span className="text-xl">❤️</span>
                </div>
              </div>

              {/* P.S. Note */}
              <div className="mt-6 font-serif text-xs sm:text-sm italic text-stone-600 border-t border-amber-800/25 pt-4 leading-relaxed">
                *P.S. This little corner of the internet was made just to bring a smile to your face. I hope it worked. 😉*
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA Button: Final Celebration & Card (Comfortably spaced with bottom padding) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full flex justify-center pt-4 pb-36 sm:pb-40"
        >
          <button
            onClick={nextScreen}
            className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-diwali-gold via-diwali-goldLight to-diwali-gold px-9 py-3.5 text-base font-semibold tracking-wide text-[#231505] shadow-diya transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-goldGlow"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            <span>Final Celebration & Card</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};
