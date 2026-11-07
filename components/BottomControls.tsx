"use client";

import React, { useEffect } from "react";
import { useRecipient } from "@/context/RecipientContext";
import { EXPERIENCES } from "@/lib/constants";

export const BottomControls: React.FC = () => {
  const { currentScreen, goToScreen, nextScreen, prevScreen, hasStarted } =
    useRecipient();

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!hasStarted) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === "ArrowRight") {
        nextScreen();
      } else if (e.key === "ArrowLeft") {
        prevScreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasStarted, nextScreen, prevScreen]);

  // Don't show controls on 3D Gift Box (Screen 0) or Name Entry (Screen 1)
  if (currentScreen <= 1) {
    return null;
  }

  return (
    <>
      {/* Centered Pagination Dots at Bottom */}
      <div className="fixed bottom-4 left-0 right-0 z-30 flex justify-center items-center pointer-events-none px-4">
        <nav
          aria-label="Experience progression"
          className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 overflow-x-auto max-w-full rounded-full border border-diwali-gold/25 bg-diwali-navy/85 px-3 py-1.5 shadow-card backdrop-blur-md"
        >
          {EXPERIENCES.slice(2).map((exp, idx) => {
            const actualIndex = idx + 2;
            const isActive = currentScreen === actualIndex;

            return (
              <button
                key={exp.id}
                onClick={() => goToScreen(actualIndex)}
                aria-label={`Go to ${exp.title}`}
                title={exp.title}
                className="group relative flex items-center justify-center transition-all duration-300 cursor-pointer p-0.5"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? "h-2 w-5 sm:w-6 bg-gradient-to-r from-diwali-gold to-diwali-goldLight shadow-goldGlow"
                      : "h-1.5 w-1.5 sm:h-2 sm:w-2 bg-diwali-cream/30 hover:bg-diwali-gold/60"
                  }`}
                />
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};
