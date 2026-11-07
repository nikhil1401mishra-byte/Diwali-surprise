"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { useRecipient } from "@/context/RecipientContext";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, RotateCcw } from "lucide-react";
import { sound } from "@/lib/sound";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  delay: number;
  phase: number;
}

export const Experience15WrittenInLight: React.FC = () => {
  const { recipient, goToScreen } = useRecipient();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Dynamic recipient name
  const cleanName = useMemo(() => {
    if (recipient && recipient.trim().length > 0) {
      return recipient.trim();
    }
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("diwali_surprise_recipient_name");
      if (saved && saved.trim().length > 0) return saved.trim();
    }
    return "Ananya";
  }, [recipient]);

  // Sequenced reveal states
  const [isAssembled, setIsAssembled] = useState(false);
  const [showQuote1, setShowQuote1] = useState(false);
  const [showQuote2, setShowQuote2] = useState(false);
  const [showClosing, setShowClosing] = useState(false);

  // Pointer / Touch tracking
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  useEffect(() => {
    // Cinematic timed sequence
    const timerAssemble = setTimeout(() => {
      setIsAssembled(true);
      sound.playNameInLight();
    }, 1800);

    // Quote 1: "Giving up is not in the blood, Sir. It's not in the blood."
    const timerQuote1 = setTimeout(() => {
      setShowQuote1(true);
    }, 3600);

    // Quote 2: ~3 seconds after Quote 1 (approx 6.8s)
    const timerQuote2 = setTimeout(() => {
      setShowQuote2(true);
    }, 6800);

    // Closing message: after quote 2
    const timerClosing = setTimeout(() => {
      setShowClosing(true);
    }, 9800);

    return () => {
      clearTimeout(timerAssemble);
      clearTimeout(timerQuote1);
      clearTimeout(timerQuote2);
      clearTimeout(timerClosing);
    };
  }, []);

  // HTML5 Particle Typography Animation Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);

    // Helper: sample text mask onto points
    const generateLetterPoints = (name: string, width: number, height: number) => {
      const offscreen = document.createElement("canvas");
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return [];

      // Fill background solid black
      offCtx.fillStyle = "#000000";
      offCtx.fillRect(0, 0, width, height);

      // Responsive font sizing based on canvas width and text length
      let fontSize = width < 400 ? 58 : width < 640 ? 76 : 98;
      const fontStack = "'Cinzel', 'Playfair Display', 'Cormorant Garamond', Georgia, serif";
      offCtx.font = `bold ${fontSize}px ${fontStack}`;

      // Scale down font if text exceeds canvas width (with 32px safe margins)
      let textWidth = offCtx.measureText(name).width;
      const maxAllowedWidth = width - 40;
      if (textWidth > maxAllowedWidth) {
        fontSize = Math.floor(fontSize * (maxAllowedWidth / textWidth));
        offCtx.font = `bold ${fontSize}px ${fontStack}`;
      }

      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.fillStyle = "#FFFFFF";

      const centerX = width / 2;
      const centerY = height / 2;
      offCtx.fillText(name, centerX, centerY);

      // Sample pixels
      const imgData = offCtx.getImageData(0, 0, width, height);
      const data = imgData.data;
      const step = width < 480 ? 2 : 3; // Step 2-3px yields thousands of points for crisp letters
      const points: { x: number; y: number }[] = [];

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const idx = (y * width + x) * 4;
          // Check white text pixel (red channel > 128)
          if (data[idx] > 128) {
            points.push({ x, y });
          }
        }
      }

      return points;
    };

    const initSimulation = () => {
      const rect = canvas.getBoundingClientRect();
      const width = Math.floor(rect.width || canvas.clientWidth || (typeof window !== "undefined" ? Math.min(window.innerWidth - 32, 650) : 400));
      const height = Math.floor(rect.height || canvas.clientHeight || 220);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      const sampledPoints = generateLetterPoints(cleanName, width, height);

      // Golden particle color palette
      const colors = ["#FFE6A0", "#FFD700", "#D6A84B", "#FFF5E5", "#FFC72C", "#FFFFFF"];

      particles = sampledPoints.map((pt, i) => {
        // Start scattered from outside the canvas (converging from all directions)
        const angle = Math.random() * Math.PI * 2;
        const startDist = Math.max(width, height) * (0.6 + Math.random() * 0.9);
        const startX = width / 2 + Math.cos(angle) * startDist;
        const startY = height / 2 + Math.sin(angle) * startDist;

        return {
          x: startX,
          y: startY,
          originX: pt.x,
          originY: pt.y,
          vx: 0,
          vy: 0,
          size: 1.1 + Math.random() * 1.8,
          color: colors[i % colors.length],
          alpha: 0.3 + Math.random() * 0.7,
          baseAlpha: 0.4 + Math.random() * 0.6,
          delay: Math.random() * 25, // Staggered entry
          phase: Math.random() * Math.PI * 2,
        };
      });
    };

    initSimulation();
    const timer = setTimeout(initSimulation, 120);

    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        initSimulation();
      });
    }

    // Physics Animation Loop
    let time = 0;
    const render = () => {
      time += 0.025;
      const rect = canvas.getBoundingClientRect();
      const width = Math.floor(rect.width || canvas.clientWidth);
      const height = Math.floor(rect.height || canvas.clientHeight);

      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const interactionRadius = 75;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (p.delay > 0) {
          p.delay -= 1;
          continue;
        }

        // Target coordinate: the sampled letter stroke coordinate
        // Once settled, add delicate organic shimmer without deforming the letter shape
        const shimmerX = Math.sin(time * 2 + p.phase) * 0.6;
        const shimmerY = Math.cos(time * 2 + p.phase) * 0.6;
        const targetX = p.originX + shimmerX;
        const targetY = p.originY + shimmerY;

        // Smooth spring physics towards assigned letter coordinates
        const dx = targetX - p.x;
        const dy = targetY - p.y;
        p.vx += dx * 0.048;
        p.vy += dy * 0.048;
        p.vx *= 0.85;
        p.vy *= 0.85;

        // Interactive mouse & touch repulsion
        if (mouse.active) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const dist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (dist < interactionRadius && dist > 0) {
            const force = (interactionRadius - dist) / interactionRadius;
            const angle = Math.atan2(mdy, mdx);
            p.vx += Math.cos(angle) * force * 9;
            p.vy += Math.sin(angle) * force * 9;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        // Shimmering alpha pulsation
        p.alpha = p.baseAlpha + Math.sin(time * 3 + p.phase) * 0.2;

        // Render individual golden particle
        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(1, p.alpha));
        ctx.fillStyle = p.color;
        ctx.shadowColor = "#FFE6A0";
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const handleResize = () => {
      initSimulation();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [cleanName]);

  // Pointer / Touch handlers
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handlePointerLeave = () => {
    mouseRef.current.active = false;
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between overflow-x-hidden overflow-y-auto select-none bg-gradient-to-b from-[#03050C] via-[#070B19] to-[#03050B] px-4 py-8 text-center scroll-smooth">
      {/* Background Volumetric Nebula & Light Rays */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(214,168,75,0.14)_0%,rgba(7,11,25,0.95)_75%)]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-amber-500/12 blur-[140px]" />

        {/* Ambient Floating Dust */}
        {Array.from({ length: 28 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-yellow-200"
            style={{
              width: `${(i % 3) + 1}px`,
              height: `${(i % 3) + 1}px`,
              left: `${(i * 37 + 11) % 96}%`,
              top: `${(i * 29 + 17) % 94}%`,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.2, 0.85, 0.2],
            }}
            transition={{
              duration: 3.5 + (i % 3),
              repeat: Infinity,
              delay: (i % 6) * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Top Subtle Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-20 pt-6 pb-2 text-center shrink-0"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-diwali-gold/30 bg-diwali-navy/70 backdrop-blur-md mb-2 text-xs tracking-widest uppercase text-diwali-goldLight font-medium shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-diwali-gold animate-pulse" />
          <span>Your Name, Written in Light</span>
        </div>
      </motion.div>

      {/* Main Center Area: RECIPIENT NAME (Constructed Entirely from Particles) + QUOTES */}
      <div className="relative z-20 my-auto w-full max-w-2xl flex flex-col items-center justify-center py-2">
        {/* Soft Golden Ambient Glow behind typography */}
        <motion.div
          animate={
            isAssembled
              ? { scale: [1, 1.25, 1], opacity: [0.35, 0.65, 0.35] }
              : { scale: 0.8, opacity: 0.1 }
          }
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-80 sm:w-[500px] h-32 sm:h-48 rounded-full bg-gradient-to-r from-amber-500/25 via-diwali-gold/35 to-amber-300/25 blur-3xl pointer-events-none"
        />

        {/* 1. RECIPIENT NAME: Constructed 100% From Particles on HTML5 Canvas (No solid text overlay) */}
        <div
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="relative w-full h-48 sm:h-56 md:h-64 flex items-center justify-center cursor-grab active:cursor-grabbing"
        >
          {/* Canvas Rendering Thousands of Golden Particles Formed as Letters */}
          <canvas
            ref={canvasRef}
            className="w-full h-full touch-none"
          />
        </div>

        {/* Interactive Starlight Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isAssembled ? { opacity: [0.4, 0.8, 0.4] } : { opacity: 0 }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-[11px] font-sans tracking-wider text-diwali-goldLight/70 mt-1 mb-6"
        >
          ✦ Touch or drag across {cleanName}&apos;s name to scatter and reform the light ✦
        </motion.p>

        {/* 2. STAGGERED QUOTES CONTAINER */}
        <div className="w-full max-w-xl px-2 flex flex-col items-center space-y-5">
          {/* QUOTE 1: Exact wording with slow fade-in */}
          <AnimatePresence>
            {showQuote1 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="w-full text-center"
              >
                <div className="my-2 flex items-center justify-center gap-2">
                  <span className="h-[1px] w-8 bg-diwali-gold/50" />
                  <Sparkles className="h-3 w-3 text-diwali-gold" />
                  <span className="h-[1px] w-8 bg-diwali-gold/50" />
                </div>

                <p className="font-serif text-lg sm:text-2xl font-bold tracking-wide text-diwali-goldLight drop-shadow-md">
                  &ldquo;Giving up is not in the blood, Sir. It&apos;s not in the blood.&rdquo;
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* QUOTE 2: Bold, distinctive motivational treatment (revealed ~3s after Quote 1) */}
          <AnimatePresence>
            {showQuote2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full rounded-2xl border-2 border-diwali-gold/55 bg-gradient-to-r from-diwali-navy/90 via-[#181D3D]/95 to-diwali-navy/90 p-5 sm:p-6 text-center shadow-[0_10px_35px_rgba(0,0,0,0.7),0_0_25px_rgba(214,168,75,0.25)] backdrop-blur-md"
              >
                <p className="font-sans text-sm sm:text-base font-semibold italic leading-relaxed text-[#FFF8E7] drop-shadow-sm">
                  &ldquo;If you have the energy to complain, you have the energy to do something positive about it – that’s what I mean when I say you’re only 45% f*cked!&rdquo;
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* FINAL CLOSING: Heartfelt resolution */}
          <AnimatePresence>
            {showClosing && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="pt-2 text-center space-y-2.5"
              >
                <p className="font-serif text-lg sm:text-xl font-bold tracking-wide text-diwali-cream">
                  Keep going. Keep shining. ✨
                </p>

                <div className="flex items-center justify-center gap-1.5 text-sm sm:text-base font-serif italic text-diwali-goldLight pt-1">
                  <span>A little Diwali surprise, from Nikhil</span>
                  <Heart className="h-4 w-4 fill-diwali-gold text-diwali-gold inline-block animate-pulse" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Replay Control */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-20 pb-8 pt-4 shrink-0"
      >
        <button
          onClick={() => goToScreen(0)}
          className="group flex items-center gap-2 rounded-full border border-diwali-gold/40 bg-diwali-navy/80 px-7 py-3 text-xs sm:text-sm font-medium text-diwali-goldLight shadow-card backdrop-blur-md transition-all duration-300 hover:border-diwali-gold hover:bg-diwali-gold/20 hover:scale-105 active:scale-95"
        >
          <RotateCcw className="h-4 w-4 text-diwali-gold transition-transform group-hover:-rotate-90" />
          <span>Experience Again from Beginning</span>
        </button>
      </motion.div>
    </div>
  );
};
