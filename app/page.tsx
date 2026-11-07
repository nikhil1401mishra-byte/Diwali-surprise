"use client";

import React, { useRef } from "react";
import { RecipientProvider, useRecipient } from "@/context/RecipientContext";
import { ParticleEffects } from "@/components/ParticleEffects";
import { Navbar } from "@/components/Navbar";
import { BottomControls } from "@/components/BottomControls";
import { Experience01GiftBox } from "@/components/screens/Experience01GiftBox";
import { Experience02NameEntry } from "@/components/screens/Experience02NameEntry";
import { Screen2Welcome } from "@/components/screens/Screen2Welcome";
import { Screen3DiyaExperience } from "@/components/screens/Screen3DiyaExperience";
import { Screen4DecorationExperience } from "@/components/screens/Screen4DecorationExperience";
import { Experience06RangoliCreator } from "@/components/screens/Experience06RangoliCreator";
import { Screen5SweetExperience } from "@/components/screens/Screen5SweetExperience";
import { Experience08MakeAWish } from "@/components/screens/Experience08MakeAWish";
import { Experience09Fireworks } from "@/components/screens/Experience09Fireworks";
import { Experience10MemoriesGallery } from "@/components/screens/Experience10MemoriesGallery";
import { Experience11HiddenChallenges } from "@/components/screens/Experience11HiddenChallenges";
import { Experience12Countdown } from "@/components/screens/Experience12Countdown";
import { Experience13SecretLetter } from "@/components/screens/Experience13SecretLetter";
import { Experience14FinalCelebration } from "@/components/screens/Experience14FinalCelebration";
import { Experience15WrittenInLight } from "@/components/screens/Experience15WrittenInLight";
import { motion, AnimatePresence } from "framer-motion";
import { screenTransitionVariants } from "@/lib/animations";

function DiwaliExperienceMain() {
  const { currentScreen, direction, nextScreen, prevScreen, hasStarted } =
    useRecipient();

  // Touch Swipe gestures for mobile
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current || !hasStarted) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    // Minimum swipe threshold: 50px
    if (diffX > 50) {
      nextScreen();
    } else if (diffX < -50) {
      prevScreen();
    }
    touchStartX.current = null;
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 0:
        return <Experience01GiftBox key="exp-01" />;
      case 1:
        return <Experience02NameEntry key="exp-02" />;
      case 2:
        return <Screen2Welcome key="exp-03" />;
      case 3:
        return <Screen3DiyaExperience key="exp-04" />;
      case 4:
        return <Screen4DecorationExperience key="exp-05" />;
      case 5:
        return <Experience06RangoliCreator key="exp-06" />;
      case 6:
        return <Screen5SweetExperience key="exp-07" />;
      case 7:
        return <Experience08MakeAWish key="exp-08" />;
      case 8:
        return <Experience09Fireworks key="exp-09" />;
      case 9:
        return <Experience10MemoriesGallery key="exp-10" />;
      case 10:
        return <Experience11HiddenChallenges key="exp-11" />;
      case 11:
        return <Experience12Countdown key="exp-12" />;
      case 12:
        return <Experience13SecretLetter key="exp-13" />;
      case 13:
        return <Experience14FinalCelebration key="exp-14" />;
      case 14:
        return <Experience15WrittenInLight key="exp-15" />;
      default:
        return <Experience01GiftBox key="exp-default" />;
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-screen w-full overflow-hidden bg-diwali-dark select-none"
    >
      {/* Ambient Floating Golden Particles */}
      <ParticleEffects />

      {/* Fixed Luxury Top Header Bar */}
      <Navbar />

      {/* Screen Transitions Container */}
      <main className="relative min-h-screen w-full overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentScreen}
            custom={direction}
            variants={screenTransitionVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full min-h-screen"
          >
            {renderCurrentScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Side Arrows & Bottom Pagination Dots */}
      <BottomControls />
    </div>
  );
}

export default function Home() {
  return (
    <RecipientProvider>
      <DiwaliExperienceMain />
    </RecipientProvider>
  );
}
