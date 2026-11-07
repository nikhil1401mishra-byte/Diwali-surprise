"use client";

import React, { useState, useRef } from "react";
import { useRecipient } from "@/context/RecipientContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  Upload,
  Play,
  Pause,
  Trash2,
  ZoomIn,
  Edit2,
} from "lucide-react";
import Image from "next/image";
import { INITIAL_MEMORIES } from "@/lib/constants";
import { MemoryItem } from "@/types";
import { sound } from "@/lib/sound";

export const Experience10MemoriesGallery: React.FC = () => {
  const { recipient, nextScreen } = useRecipient();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [photos, setPhotos] = useState<MemoryItem[]>(INITIAL_MEMORIES);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isSlideshow, setIsSlideshow] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newCaption, setNewCaption] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    sound.playSweetChime();
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        const newPhoto: MemoryItem = {
          id: `custom-${Date.now()}`,
          title: "Cherished Moment",
          caption: `A special memory made with ${recipient}`,
          date: "Diwali 2026",
          rotation: (Math.random() - 0.5) * 6,
          imageUrl: result,
          tags: ["Special", "Love"],
        };
        setPhotos((prev) => [newPhoto, ...prev.slice(0, 5)]);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleDeletePhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playDecorationToggle();
    setPhotos((prev) => prev.filter((p) => p.id !== id));
    if (lightboxIndex !== null) setLightboxIndex(null);
  };

  // Slideshow timer
  React.useEffect(() => {
    if (!isSlideshow) return;
    const interval = setInterval(() => {
      setLightboxIndex((prev) =>
        prev === null ? 0 : (prev + 1) % photos.length
      );
    }, 3200);
    return () => clearInterval(interval);
  }, [isSlideshow, photos.length]);

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
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B19]/85 via-[#070B19]/50 to-[#070B19]/85" />
      </div>

      {/* Top Header Section */}
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
          My Favourite People ♡
        </h1>

        <p className="mt-2 font-serif text-sm leading-relaxed text-diwali-cream/90 sm:text-base">
          Diwali is more special with the people who make life brighter, and you are
          surely one of them,{" "}
          <span className="font-semibold text-diwali-goldLight">{recipient}</span>.
        </p>

        {/* Gallery Action Controls */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 rounded-full border border-diwali-gold bg-diwali-gold/20 px-4 py-1.5 text-xs font-semibold text-diwali-goldLight hover:bg-diwali-gold hover:text-[#231505] transition-colors"
          >
            <Upload className="h-3.5 w-3.5" />
            <span>Upload Photo</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />

          <button
            onClick={() => {
              setIsSlideshow(!isSlideshow);
              if (!isSlideshow && lightboxIndex === null) setLightboxIndex(0);
            }}
            className="flex items-center gap-1.5 rounded-full border border-diwali-gold/30 bg-diwali-navy/80 px-4 py-1.5 text-xs text-diwali-cream hover:border-diwali-gold transition-colors"
          >
            {isSlideshow ? (
              <>
                <Pause className="h-3 w-3" />
                <span>Pause Slideshow</span>
              </>
            ) : (
              <>
                <Play className="h-3 w-3" />
                <span>Slideshow Mode</span>
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Hanging Polaroids on String */}
      <div className="relative z-20 my-auto flex w-full max-w-4xl flex-col items-center py-4">
        <div className="relative w-full max-w-3xl h-[2px] bg-gradient-to-r from-transparent via-amber-800/80 to-transparent mb-[-12px]" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 px-2 w-full justify-items-center">
          {photos.map((mem, index) => (
            <motion.div
              key={mem.id}
              whileHover={{ scale: 1.07, rotate: 0, zIndex: 10 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setLightboxIndex(index)}
              style={{ rotate: `${mem.rotation}deg` }}
              className="group relative flex flex-col items-center cursor-pointer transition-all duration-300"
            >
              {/* Clothespin */}
              <div className="relative z-10 -mb-2 flex h-6 w-3 rounded-sm bg-gradient-to-b from-[#A06D3B] to-[#68411C] shadow-md border border-[#523315]">
                <div className="h-2 w-full bg-stone-700/60" />
              </div>

              {/* Polaroid Frame */}
              <div className="flex flex-col items-center rounded-xl border border-diwali-gold/40 bg-gradient-to-b from-[#FFFDF9] to-[#F5EEDC] p-2.5 pb-3 shadow-2xl transition-all duration-300 group-hover:shadow-goldGlow group-hover:border-diwali-gold">
                <div className="relative h-28 w-28 sm:h-32 sm:w-32 overflow-hidden rounded-lg bg-stone-900">
                  <Image
                    src={mem.imageUrl}
                    alt={mem.title}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="h-3 w-3" />
                  </div>
                </div>

                <div className="mt-2 text-center w-full px-1">
                  <p className="font-handwriting text-sm font-bold text-stone-800 truncate">
                    {mem.title}
                  </p>
                  <p className="text-[9px] text-stone-500 font-sans">{mem.date}</p>
                </div>

                {/* Delete button for custom photos */}
                {mem.id.startsWith("custom-") && (
                  <button
                    onClick={(e) => handleDeletePhoto(mem.id, e)}
                    className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600/80 text-white hover:bg-red-700"
                    title="Remove Photo"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && photos[lightboxIndex] && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-diwali-gold/60 bg-diwali-navy p-6 shadow-2xl"
            >
              <button
                onClick={() => setLightboxIndex(null)}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/90"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-2xl bg-black">
                <Image
                  src={photos[lightboxIndex].imageUrl}
                  alt={photos[lightboxIndex].title}
                  fill
                  className="object-cover object-center"
                />

                {/* Left/Right Slideshow Controls */}
                <button
                  onClick={() =>
                    setLightboxIndex(
                      (lightboxIndex - 1 + photos.length) % photos.length
                    )
                  }
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 text-xs font-semibold rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                >
                  Prev
                </button>
                <button
                  onClick={() =>
                    setLightboxIndex((lightboxIndex + 1) % photos.length)
                  }
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 text-xs font-semibold rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                >
                  Next
                </button>
              </div>

              <div className="mt-4 text-left">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl font-bold text-diwali-goldLight">
                    {photos[lightboxIndex].title}
                  </h3>
                  <span className="text-xs text-diwali-muted font-sans">
                    {photos[lightboxIndex].date}
                  </span>
                </div>

                <p className="mt-2 font-serif text-sm leading-relaxed text-diwali-cream">
                  {photos[lightboxIndex].caption}
                </p>

                <div className="mt-4 rounded-xl border border-diwali-gold/30 bg-diwali-dark/60 p-3">
                  <p className="font-serif italic text-xs text-diwali-goldLight">
                    &ldquo;Grateful for wonderful souls like you, {recipient}, who
                    make the world brighter and happier.&rdquo;
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
        className="relative z-20 mb-6"
      >
        <button
          onClick={nextScreen}
          className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-diwali-gold via-diwali-goldLight to-diwali-gold px-8 py-3.5 text-base font-semibold tracking-wide text-[#231505] shadow-diya transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-goldGlow"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
          <span>Discover Hidden Surprises</span>
        </button>
      </motion.div>
    </div>
  );
};

