import { Variants } from "framer-motion";

export const screenTransitionVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 260, damping: 28 },
      opacity: { duration: 0.45 },
      scale: { duration: 0.45 },
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.96,
    transition: {
      x: { type: "spring", stiffness: 260, damping: 28 },
      opacity: { duration: 0.35 },
      scale: { duration: 0.35 },
    },
  }),
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export const goldGlowVariants: Variants = {
  idle: {
    boxShadow: "0 0 15px rgba(214, 168, 75, 0.3)",
  },
  glow: {
    boxShadow: [
      "0 0 15px rgba(214, 168, 75, 0.3)",
      "0 0 35px rgba(214, 168, 75, 0.65)",
      "0 0 15px rgba(214, 168, 75, 0.3)",
    ],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

