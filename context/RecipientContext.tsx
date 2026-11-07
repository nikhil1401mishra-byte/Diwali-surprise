"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { SENDER_NAME, DEFAULT_RECIPIENT, EXPERIENCES } from "@/lib/constants";
import { sound } from "@/lib/sound";

interface RecipientContextType {
  recipient: string;
  sender: string;
  hasStarted: boolean;
  currentScreen: number;
  totalScreens: number;
  isMuted: boolean;
  volume: number;
  isTransitioning: boolean;
  direction: number; // 1 for next, -1 for prev
  setRecipientName: (name: string) => boolean;
  startSurprise: (name: string) => boolean;
  goToScreen: (index: number) => void;
  nextScreen: () => void;
  prevScreen: () => void;
  resetExperience: () => void;
  toggleSound: () => void;
  setVolume: (vol: number) => void;
}

const STORAGE_KEY = "diwali_surprise_recipient_name";
const STORAGE_STARTED_KEY = "diwali_surprise_has_started";

const RecipientContext = createContext<RecipientContextType | undefined>(undefined);

export const RecipientProvider = ({ children }: { children: ReactNode }) => {
  const [recipient, setRecipient] = useState<string>(DEFAULT_RECIPIENT);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [currentScreen, setCurrentScreen] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(0.7);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [direction, setDirection] = useState<number>(1);

  // Restore from sessionStorage or URL query params on client mount
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const urlName = params.get("name") || params.get("to");
        if (urlName && urlName.trim().length > 0) {
          const sanitizedUrlName = urlName.trim().slice(0, 32);
          setRecipient(sanitizedUrlName);
          sessionStorage.setItem(STORAGE_KEY, sanitizedUrlName);
        } else {
          const savedName = sessionStorage.getItem(STORAGE_KEY);
          if (savedName && savedName.trim().length > 0) {
            setRecipient(savedName.trim());
          }
        }
      }

      const savedStarted = sessionStorage.getItem(STORAGE_STARTED_KEY);
      if (savedStarted === "true") {
        setHasStarted(true);
      }
    } catch {
      // Ignore storage errors if disabled
    }
  }, []);

  // Update dynamic document title
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.title = hasStarted
        ? `Happy Diwali, ${recipient}! ✨ | From ${SENDER_NAME}`
        : `A Little Diwali Surprise ✨ | From ${SENDER_NAME}`;
    }
  }, [recipient, hasStarted]);

  const setRecipientName = (name: string): boolean => {
    const trimmed = name.trim();
    if (!trimmed || trimmed.length === 0) return false;
    const sanitized = trimmed.slice(0, 32);
    setRecipient(sanitized);
    try {
      sessionStorage.setItem(STORAGE_KEY, sanitized);
    } catch {}
    return true;
  };

  const startSurprise = (name: string): boolean => {
    const success = setRecipientName(name);
    if (!success) return false;

    setHasStarted(true);
    try {
      sessionStorage.setItem(STORAGE_STARTED_KEY, "true");
    } catch {}

    // Start background music and sound on first user gesture
    sound.startBGM();
    sound.playDiyaLight();

    // Move to Experience 03 (index 2: Personalized Welcome)
    setDirection(1);
    setCurrentScreen(2);
    return true;
  };

  const goToScreen = (index: number) => {
    if (index === currentScreen || index < 0 || index >= EXPERIENCES.length) return;
    setIsTransitioning(true);
    setDirection(index > currentScreen ? 1 : -1);
    setCurrentScreen(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const nextScreen = () => {
    if (currentScreen < EXPERIENCES.length - 1) {
      goToScreen(currentScreen + 1);
    }
  };

  const prevScreen = () => {
    if (currentScreen > 0) {
      goToScreen(currentScreen - 1);
    }
  };

  const resetExperience = () => {
    setCurrentScreen(0);
    setHasStarted(false);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_STARTED_KEY);
    } catch {}
  };

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const setVolume = (vol: number) => {
    sound.setVolume(vol);
    setVolumeState(vol);
  };

  return (
    <RecipientContext.Provider
      value={{
        recipient,
        sender: SENDER_NAME,
        hasStarted,
        currentScreen,
        totalScreens: EXPERIENCES.length,
        isMuted,
        volume,
        isTransitioning,
        direction,
        setRecipientName,
        startSurprise,
        goToScreen,
        nextScreen,
        prevScreen,
        resetExperience,
        toggleSound,
        setVolume,
      }}
    >
      {children}
    </RecipientContext.Provider>
  );
};

export const useRecipient = () => {
  const context = useContext(RecipientContext);
  if (!context) {
    throw new Error("useRecipient must be used within a RecipientProvider");
  }
  return context;
};
