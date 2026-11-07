"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRecipient } from "@/context/RecipientContext";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import { sound } from "@/lib/sound";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  decay: number;
  gravity: number;
  size: number;
  flicker: boolean;
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
  trail: { x: number; y: number; alpha: number }[];
}

export const Screen6FireworksExperience: React.FC = () => {
  const { recipient, nextScreen } = useRecipient();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rocketsLaunched, setRocketsLaunched] = useState(0);

  const fireworksColors = [
    "#FFD700", // Gold
    "#FF9E2C", // Amber
    "#FF2A6D", // Neon Pink
    "#05D9E8", // Cyan
    "#01FFC3", // Emerald
    "#9D4EDD", // Purple
    "#FFE6A0", // Light Gold
    "#FFFFFF", // Pure White
  ];

  const triggerExplosionRef = useRef<
    (x: number, y: number, color: string) => void
  >(() => {});

  const launchRocketRef = useRef<
    (startX: number, targetX: number, targetY: number) => void
  >(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles: Particle[] = [];
    const rockets: Rocket[] = [];

    const createExplosion = (x: number, y: number, color: string) => {
      sound.playFireworkExplode();
      const count = window.innerWidth < 768 ? 45 : 80;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5.5 + 1.5;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          alpha: 1,
          decay: Math.random() * 0.015 + 0.01,
          gravity: 0.06,
          size: Math.random() * 2.5 + 1.2,
          flicker: Math.random() > 0.5,
        });
      }
    };
    triggerExplosionRef.current = createExplosion;

    const launchRocket = (startX: number, targetX: number, targetY: number) => {
      sound.playFireworkLaunch();
      const color =
        fireworksColors[Math.floor(Math.random() * fireworksColors.length)];
      const distance = startX - targetX;
      rockets.push({
        x: startX,
        y: height,
        targetY,
        vx: -distance / 45,
        vy: -Math.sqrt(2 * 0.15 * (height - targetY)),
        color,
        trail: [],
      });
      setRocketsLaunched((c) => c + 1);
    };
    launchRocketRef.current = launchRocket;

    const animate = () => {
      // Semi-transparent clear for motion blur trail
      ctx.fillStyle = "rgba(7, 11, 25, 0.25)";
      ctx.fillRect(0, 0, width, height);

      // Update rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.x += r.vx;
        r.y += r.vy;
        r.vy += 0.15; // Gravity slowing upward velocity

        // Add trail
        r.trail.push({ x: r.x, y: r.y, alpha: 1 });
        if (r.trail.length > 7) r.trail.shift();

        // Draw trail
        r.trail.forEach((t) => {
          ctx.beginPath();
          ctx.arc(t.x, t.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 230, 160, ${t.alpha})`;
          ctx.fill();
          t.alpha -= 0.1;
        });

        // Draw rocket head
        ctx.beginPath();
        ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = r.color;
        ctx.fill();

        // Explode condition
        if (r.vy >= -0.5 || r.y <= r.targetY) {
          createExplosion(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      // Update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.98;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const displayAlpha = p.flicker && Math.random() > 0.4 ? p.alpha * 0.4 : p.alpha;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, displayAlpha);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const targetX = e.clientX - rect.left;
    const targetY = e.clientY - rect.top;
    const startX = targetX + (Math.random() - 0.5) * 80;
    launchRocketRef.current(startX, targetX, targetY);
  };

  const launchGrandFinale = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Launch a series of 5 fireworks across screen width
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const targetX = (w * 0.2) + Math.random() * (w * 0.6);
        const targetY = h * 0.2 + Math.random() * (h * 0.35);
        const startX = targetX + (Math.random() - 0.5) * 100;
        launchRocketRef.current(startX, targetX, targetY);
      }, i * 320);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden px-4 py-16 text-center select-none">
      {/* City Skyline Background Silhouette */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/screen6_skyline_night.png"
          alt="Indian City Skyline at Night"
          fill
          priority
          className="object-cover object-bottom opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B19]/70 via-[#070B19]/25 to-[#070B19]/80" />
      </div>

      {/* Interactive Fireworks Canvas */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="absolute inset-0 z-10 h-full w-full cursor-crosshair"
      />

      {/* Top Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 mx-auto max-w-2xl pt-6 pointer-events-none"
      >
        <div className="mb-2 flex items-center justify-center gap-2">
          <span className="h-[1px] w-8 bg-diwali-gold/60" />
          <Sparkles className="h-4 w-4 text-diwali-gold animate-pulse" />
          <span className="h-[1px] w-8 bg-diwali-gold/60" />
        </div>

        <h1 className="font-serif text-3xl font-normal tracking-wide text-diwali-goldLight sm:text-4xl md:text-5xl">
          Let&apos;s Light Up the Sky! 🎆
        </h1>

        <p className="mt-3 font-serif text-sm leading-relaxed text-diwali-cream/90 sm:text-base md:text-lg">
          A little burst of joy, success and new beginnings for you,{" "}
          <span className="font-semibold text-diwali-goldLight">{recipient}</span>!
        </p>

        <p className="mt-2 text-xs text-diwali-muted/80">
          ✨ Tap anywhere across the night sky to launch fireworks!
        </p>
      </motion.div>

      {/* Center Interactive Trigger / Launcher */}
      <div className="relative z-20 my-auto flex flex-col items-center">
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          onClick={launchGrandFinale}
          className="group relative flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-diwali-gold via-diwali-goldLight to-diwali-gold px-8 py-4 text-base font-bold tracking-wide text-[#231505] shadow-diya transition-all duration-300 hover:shadow-goldGlow"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <Sparkles className="h-5 w-5 text-[#231505]" />
          <span>Launch Fireworks ✨</span>
        </motion.button>

        {rocketsLaunched > 0 && (
          <span className="mt-3 text-xs text-diwali-goldLight font-medium">
            {rocketsLaunched} fireworks sparkled in celebration!
          </span>
        )}
      </div>

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
          <span>Favourite People</span>
        </button>
      </motion.div>
    </div>
  );
};

