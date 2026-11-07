"use client";

import React, { useState } from "react";
import { useRecipient } from "@/context/RecipientContext";
import { EXPERIENCES } from "@/lib/constants";
import { Volume2, VolumeX, Sparkles, RotateCcw, Sliders } from "lucide-react";

export const Navbar: React.FC = () => {
  const {
    recipient,
    sender,
    currentScreen,
    totalScreens,
    isMuted,
    volume,
    setVolume,
    toggleSound,
    resetExperience,
  } = useRecipient();

  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const currentScreenData = EXPERIENCES[currentScreen] || EXPERIENCES[0];
  const progressPercent = ((currentScreen + 1) / totalScreens) * 100;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 select-none">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Sender Tag */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-diwali-gold/40 bg-diwali-navy/80 shadow-goldGlow backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-diwali-gold animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-sm font-semibold tracking-wider text-diwali-goldLight sm:text-base">
                Diwali Surprise
              </span>
              <span className="hidden rounded-full border border-diwali-gold/30 bg-diwali-gold/10 px-2 py-0.5 text-[10px] font-medium text-diwali-gold xs:inline-block">
                from {sender} ♡
              </span>
            </div>
            {currentScreen > 1 && (
              <p className="text-[11px] text-diwali-muted truncate max-w-[120px] sm:max-w-none">
                For <span className="text-diwali-goldLight font-medium">{recipient}</span>
              </p>
            )}
          </div>
        </div>

        {/* Center Progress Pill (visible on screens > 1) */}
        {currentScreen > 1 && (
          <div className="hidden md:flex flex-col items-center">
            <div className="flex items-center gap-2 text-xs font-medium text-diwali-goldLight">
              <span className="text-diwali-gold">Part {currentScreen + 1} of {totalScreens}</span>
              <span className="text-diwali-muted/50">•</span>
              <span className="text-diwali-cream">{currentScreenData.title}</span>
            </div>
            {/* Tiny progress line */}
            <div className="mt-1 h-1 w-36 overflow-hidden rounded-full bg-diwali-navy/80 border border-diwali-gold/20">
              <div
                className="h-full bg-gradient-to-r from-diwali-gold to-diwali-goldLight transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound & Volume Control */}
          <div className="relative flex items-center">
            <button
              onClick={toggleSound}
              onMouseEnter={() => setShowVolumeSlider(true)}
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              className="group relative flex h-9 w-9 items-center justify-center rounded-full border border-diwali-gold/30 bg-diwali-navy/80 text-diwali-goldLight backdrop-blur-md transition-all duration-300 hover:border-diwali-gold hover:bg-diwali-gold/20 hover:scale-105 active:scale-95"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4 text-diwali-muted group-hover:text-diwali-gold" />
              ) : (
                <Volume2 className="h-4 w-4 text-diwali-gold animate-pulse" />
              )}
            </button>

            {/* Hover Volume Slider */}
            {showVolumeSlider && (
              <div
                onMouseLeave={() => setShowVolumeSlider(false)}
                className="absolute right-0 top-11 z-50 flex items-center gap-2 rounded-2xl border border-diwali-gold/30 bg-diwali-navy/95 p-2 shadow-2xl backdrop-blur-md"
              >
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setVolume(val);
                  }}
                  className="h-1.5 w-20 cursor-pointer accent-diwali-gold"
                />
              </div>
            )}
          </div>

          {/* Reset / Change Name Button */}
          {currentScreen > 1 && (
            <button
              onClick={resetExperience}
              title="Change recipient / Restart"
              className="flex items-center gap-1.5 rounded-full border border-diwali-gold/30 bg-diwali-navy/80 px-3 py-1.5 text-xs font-medium text-diwali-goldLight backdrop-blur-md transition-all duration-300 hover:border-diwali-gold hover:bg-diwali-gold/20 hover:scale-105 active:scale-95"
            >
              <RotateCcw className="h-3 w-3 text-diwali-gold" />
              <span className="hidden sm:inline">Change Name</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
