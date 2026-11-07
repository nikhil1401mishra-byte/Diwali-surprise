"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRecipient } from "@/context/RecipientContext";
import { motion } from "framer-motion";
import { Sparkles, Play, Pause } from "lucide-react";
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

export const Experience09Fireworks: React.FC = () => {
  const { recipient, nextScreen } = useRecipient();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [selectedTheme, setSelectedTheme] = useState<
    "gold" | "purple" | "pink" | "blue" | "multicolor"
  >("multicolor");
  const [isAutoCelebration, setIsAutoCelebration] = useState(false);
  const [fireworksCount, setFireworksCount] = useState(0);

  const colorPalettes = {
    gold: ["#FFE6A0", "#FFD700", "#FF9E2C", "#FFFFFF"],
    purple: ["#C084FC", "#9333EA", "#E879F9", "#FFFFFF"],
    pink: ["#F472B6", "#EC4899", "#FB7185", "#FFFFFF"],
    blue: ["#38BDF8", "#0284C7", "#06B6D4", "#FFFFFF"],
    multicolor: [
      "#FFD700",
      "#FF9E2C",
      "#EC4899",
      "#38BDF8",
      "#10B981",
      "#A855F7",
      "#FFFFFF",
    ],
  };

  const triggerExplosionRef = useRef<
    (x: number, y: number, color: string) => void
  >(() => {});

  const launchRocketRef = useRef<
    (startX: number, targetX: number, targetY: number, colorOverride?: string) => void
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
      const count = window.innerWidth < 768 ? 40 : 75;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5.2 + 1.2;
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

    const launchRocket = (
      startX: number,
      targetX: number,
      targetY: number,
      colorOverride?: string
    ) => {
      sound.playFireworkLaunch();
      const palette = colorPalettes[selectedTheme];
      const color =
        colorOverride || palette[Math.floor(Math.random() * palette.length)];
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
      setFireworksCount((c) => c + 1);
    };
    launchRocketRef.current = launchRocket;

    const animate = () => {
      ctx.fillStyle = "rgba(7, 11, 25, 0.25)";
      ctx.fillRect(0, 0, width, height);

      // Update rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.x += r.vx;
        r.y += r.vy;
        r.vy += 0.15;

        r.trail.push({ x: r.x, y: r.y, alpha: 1 });
        if (r.trail.length > 6) r.trail.shift();

        r.trail.forEach((t) => {
          ctx.beginPath();
          ctx.arc(t.x, t.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 230, 160, ${t.alpha})`;
          ctx.fill();
          t.alpha -= 0.12;
        });

        ctx.beginPath();
        ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = r.color;
        ctx.fill();

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

        const displayAlpha =
          p.flicker && Math.random() > 0.4 ? p.alpha * 0.4 : p.alpha;

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
  }, [selectedTheme]);

  // Automatic celebration loop
  useEffect(() => {
    if (!isAutoCelebration) return;

    const interval = setInterval(() => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const targetX = w * 0.15 + Math.random() * (w * 0.7);
      const targetY = h * 0.15 + Math.random() * (h * 0.4);
      const startX = targetX + (Math.random() - 0.5) * 80;
      launchRocketRef.current(startX, targetX, targetY);
    }, 650);

    return () => clearInterval(interval);
  }, [isAutoCelebration]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const targetX = e.clientX - rect.left;
    const targetY = e.clientY - rect.top;
    const startX = targetX + (Math.random() - 0.5) * 60;
    launchRocketRef.current(startX, targetX, targetY);
  };

  const launchGrandFinale = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        const targetX = w * 0.15 + Math.random() * (w * 0.7);
        const targetY = h * 0.15 + Math.random() * (h * 0.35);
        const startX = targetX + (Math.random() - 0.5) * 100;
        launchRocketRef.current(startX, targetX, targetY);
      }, i * 280);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden px-4 py-16 text-center select-none">
      {/* Background Silhouette */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/screen6_skyline_night.png"
          alt="Skyline at Night"
          fill
          priority
          className="object-cover object-bottom opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B19]/75 via-[#070B19]/25 to-[#070B19]/80" />
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
        className="relative z-20 mx-auto max-w-2xl pt-4 pointer-events-none"
      >
        <div className="mb-2 flex items-center justify-center gap-2">
          <span className="h-[1px] w-8 bg-diwali-gold/60" />
          <Sparkles className="h-4 w-4 text-diwali-gold animate-pulse" />
          <span className="h-[1px] w-8 bg-diwali-gold/60" />
        </div>

        <h1 className="font-serif text-3xl font-normal tracking-wide text-diwali-goldLight sm:text-4xl md:text-5xl">
          Let&apos;s Light Up the Sky, {recipient}! 🎆
        </h1>

        <p className="mt-2 font-serif text-sm leading-relaxed text-diwali-cream/90 sm:text-base">
          A little burst of joy, success and new beginnings for you!
        </p>

        <p className="mt-1 text-xs text-diwali-muted/80">
          Tap anywhere to launch rockets, or pick your favorite colors below!
        </p>
      </motion.div>

      {/* Color Filter & Control Tray */}
      <div className="relative z-20 my-auto flex flex-col items-center gap-3">
        {/* Color Palette Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 rounded-full border border-diwali-gold/30 bg-diwali-navy/80 p-1.5 backdrop-blur-md shadow-card">
          {(["gold", "purple", "pink", "blue", "multicolor"] as const).map(
            (theme) => (
              <button
                key={theme}
                onClick={() => setSelectedTheme(theme)}
                className={`rounded-full px-3.5 py-1 text-xs font-semibold capitalize transition-all ${
                  selectedTheme === theme
                    ? "bg-diwali-gold text-[#231505] shadow-goldGlow"
                    : "text-diwali-cream/70 hover:text-white"
                }`}
              >
                {theme}
              </button>
            )
          )}
        </div>

        {/* Buttons: Finale & Auto Mode */}
        <div className="flex items-center gap-3 mt-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={launchGrandFinale}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-diwali-gold via-diwali-goldLight to-diwali-gold px-6 py-2.5 text-sm font-bold text-[#231505] shadow-diya"
          >
            <Sparkles className="h-4 w-4 text-[#231505]" />
            <span>Launch Barrage ✨</span>
          </motion.button>

          <button
            onClick={() => setIsAutoCelebration(!isAutoCelebration)}
            className={`flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-xs font-medium backdrop-blur-md transition-all ${
              isAutoCelebration
                ? "border-emerald-400 bg-emerald-950/70 text-emerald-300"
                : "border-diwali-gold/30 bg-diwali-navy/80 text-diwali-goldLight hover:border-diwali-gold"
            }`}
          >
            {isAutoCelebration ? (
              <>
                <Pause className="h-3 w-3" />
                <span>Stop Show</span>
              </>
            ) : (
              <>
                <Play className="h-3 w-3" />
                <span>Auto Celebration</span>
              </>
            )}
          </button>
        </div>

        {fireworksCount > 0 && (
          <span className="text-[11px] text-diwali-muted font-medium">
            {fireworksCount} fireworks sparked so far!
          </span>
        )}
      </div>

      {/* Bottom Navigation CTA */}
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
          <span>Favourite People</span>
        </button>
      </motion.div>
    </div>
  );
};

