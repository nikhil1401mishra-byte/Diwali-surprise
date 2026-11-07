"use client";

import React, { useState } from "react";
import { useRecipient } from "@/context/RecipientContext";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { INITIAL_MEMORIES } from "@/lib/constants";
import { MemoryItem } from "@/types";

export const Screen7MemoriesGallery: React.FC = () => {
  const { recipient, nextScreen } = useRecipient();
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryItem | null>(null);

  // Default memories tailored to Diwali
  const memories: MemoryItem[] = [
    {
      id: "mem1",
      title: "Lighting Diyas Together",
      caption: "Every flame holds a silent wish for health, joy, and peace.",
      date: "Diwali Evening",
      rotation: -3,
      imageUrl: "/images/screen3_diyas_surface.png",
      tags: ["Tradition", "Warmth"],
    },
    {
      id: "mem2",
      title: "Sparklers & Endless Laughter",
      caption: "Holding light in our hands, making memories that never fade.",
      date: "Midnight Celebration",
      rotation: 2,
      imageUrl: "/images/screen6_skyline_night.png",
      tags: ["Sparklers", "Magic"],
    },
    {
      id: "mem3",
      title: "Colors of Rangoli",
      caption: "Creating vibrant floral art at the doorstep to welcome prosperity.",
      date: "Festive Morning",
      rotation: -2,
      imageUrl: "/images/screen2_palace_rangoli.png",
      tags: ["Rangoli", "Celebration"],
    },
    {
      id: "mem4",
      title: "Sweet Moments & Togetherness",
      caption: "Sharing laughter, blessings, and warm sweet treats.",
      date: "Family & Friends",
      rotation: 3,
      imageUrl: "/images/screen5_sweets_thali.png",
      tags: ["Sweetness", "Joy"],
    },
  ];

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden px-4 py-16 text-center select-none">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/screen7_memories_festive.png"
          alt="Warm Festive Bokeh"
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
          My Favourite People ♡
        </h1>

        <p className="mt-3 font-serif text-sm leading-relaxed text-diwali-cream/90 sm:text-base md:text-lg">
          Diwali is more special with the people who make life brighter, and you are
          surely one of them,{" "}
          <span className="font-semibold text-diwali-goldLight">{recipient}</span>.
        </p>

        <p className="mt-1 text-xs text-diwali-muted">
          Tap any Polaroid photo to view the cherished moment
        </p>
      </motion.div>

      {/* Hanging Polaroids on String */}
      <div className="relative z-20 my-auto flex w-full max-w-4xl flex-col items-center py-6">
        {/* Jute String / Twine Line */}
        <div className="relative w-full max-w-3xl h-[2px] bg-gradient-to-r from-transparent via-amber-800/80 to-transparent mb-[-12px]" />

        {/* Polaroids Container */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 px-2 w-full justify-items-center">
          {memories.map((mem) => (
            <motion.div
              key={mem.id}
              whileHover={{ scale: 1.07, rotate: 0, zIndex: 10 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedPhoto(mem)}
              style={{ rotate: `${mem.rotation}deg` }}
              className="group relative flex flex-col items-center cursor-pointer transition-all duration-300"
            >
              {/* Wooden Clothespin Peg */}
              <div className="relative z-10 -mb-2 flex h-6 w-3 rounded-sm bg-gradient-to-b from-[#A06D3B] to-[#68411C] shadow-md border border-[#523315]">
                <div className="h-2 w-full bg-stone-700/60 rounded-t-xs" />
              </div>

              {/* Polaroid Photo Frame */}
              <div className="flex flex-col items-center rounded-xl border border-diwali-gold/40 bg-gradient-to-b from-[#FFFDF9] to-[#F5EEDC] p-2.5 pb-4 shadow-2xl transition-all duration-300 group-hover:shadow-goldGlow group-hover:border-diwali-gold">
                {/* Photo Thumbnail */}
                <div className="relative h-32 w-32 sm:h-36 sm:w-36 overflow-hidden rounded-lg bg-stone-900">
                  <Image
                    src={mem.imageUrl}
                    alt={mem.title}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  <div className="absolute bottom-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="h-3 w-3" />
                  </div>
                </div>

                {/* Handwritten Caption */}
                <div className="mt-2 text-center w-full px-1">
                  <p className="font-handwriting text-base font-bold text-stone-800 truncate">
                    {mem.title}
                  </p>
                  <p className="text-[10px] text-stone-500 font-sans">{mem.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-diwali-gold/60 bg-diwali-navy p-6 shadow-2xl"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/90"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-2xl bg-black">
                <Image
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  fill
                  className="object-cover object-center"
                />
              </div>

              <div className="mt-4 text-left">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl font-bold text-diwali-goldLight">
                    {selectedPhoto.title}
                  </h3>
                  <span className="text-xs text-diwali-muted font-sans">
                    {selectedPhoto.date}
                  </span>
                </div>

                <p className="mt-2 font-serif text-sm leading-relaxed text-diwali-cream">
                  {selectedPhoto.caption}
                </p>

                <div className="mt-4 rounded-xl border border-diwali-gold/30 bg-diwali-dark/60 p-3">
                  <p className="font-serif italic text-xs text-diwali-goldLight">
                    &ldquo;Grateful for wonderful souls like you, {recipient}, who make the world brighter and happier.&rdquo;
                  </p>
                </div>
              </div>
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
          <span>Read Nikhil&apos;s Letter</span>
        </button>
      </motion.div>
    </div>
  );
};

