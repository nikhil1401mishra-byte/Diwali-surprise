"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRecipient } from "@/context/RecipientContext";
import { motion } from "framer-motion";
import {
  Sparkles,
  RotateCcw,
  Undo2,
  Download,
  Flame,
  Flower2,
  Palette,
} from "lucide-react";
import { RANGOLI_COLORS, RANGOLI_TEMPLATES } from "@/lib/constants";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";

interface DrawPoint {
  x: number;
  y: number;
  color: string;
  size: number;
  mode: "powder" | "flower" | "diya";
}

interface Stroke {
  points: DrawPoint[];
}

export const Experience06RangoliCreator: React.FC = () => {
  const { recipient, nextScreen } = useRecipient();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [activeTemplate, setActiveTemplate] = useState("mandala");
  const [activeColor, setActiveColor] = useState(RANGOLI_COLORS[0].hex);
  const [activeTool, setActiveTool] = useState<"powder" | "flower" | "diya">("powder");
  const [symmetrySectors, setSymmetrySectors] = useState(8);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(8);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set high resolution for crisp drawing
    const size = Math.min(window.innerWidth - 32, 480);
    canvas.width = size;
    canvas.height = size;

    initCanvasBackground(ctx, size, activeTemplate);
  }, [activeTemplate]);

  const initCanvasBackground = (
    ctx: CanvasRenderingContext2D,
    size: number,
    template: string
  ) => {
    // Rich dark slate marble background
    ctx.fillStyle = "#0B1021";
    ctx.fillRect(0, 0, size, size);

    const center = size / 2;

    // Draw background guideline circles
    ctx.strokeStyle = "rgba(214, 168, 75, 0.25)";
    ctx.lineWidth = 1;
    [center * 0.25, center * 0.5, center * 0.75, center * 0.95].forEach((r) => {
      ctx.beginPath();
      ctx.arc(center, center, r, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Draw template specific subtle outlines
    ctx.strokeStyle = "rgba(255, 230, 160, 0.3)";
    ctx.lineWidth = 1.5;

    if (template === "mandala" || template === "star") {
      const sectors = 8;
      for (let i = 0; i < sectors; i++) {
        const angle = (i * Math.PI * 2) / sectors;
        ctx.beginPath();
        ctx.moveTo(center, center);
        ctx.lineTo(
          center + Math.cos(angle) * (center * 0.95),
          center + Math.sin(angle) * (center * 0.95)
        );
        ctx.stroke();
      }
    } else if (template === "lotus") {
      // Lotus petals guideline
      const petals = 6;
      for (let i = 0; i < petals; i++) {
        const angle = (i * Math.PI * 2) / petals;
        ctx.beginPath();
        ctx.arc(
          center + Math.cos(angle) * (center * 0.4),
          center + Math.sin(angle) * (center * 0.4),
          center * 0.35,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }
    }

    // Save initial state to history
    saveState();
  };

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(-10), imgData]);
  };

  const handleUndo = () => {
    if (history.length <= 1) return;
    sound.playDecorationToggle();
    const newHistory = [...history];
    newHistory.pop(); // Remove current
    const previous = newHistory[newHistory.length - 1];
    setHistory(newHistory);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx && previous) {
      ctx.putImageData(previous, 0, 0);
    }
  };

  const handleReset = () => {
    sound.playDecorationToggle();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    initCanvasBackground(ctx, canvas.width, activeTemplate);
  };

  const drawSymmetrical = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const center = canvas.width / 2;
    const dx = x - center;
    const dy = y - center;

    const radius = Math.sqrt(dx * dx + dy * dy);
    if (radius > center) return; // Stay inside canvas

    const angle = Math.atan2(dy, dx);
    const sectors = symmetrySectors;

    for (let i = 0; i < sectors; i++) {
      const currentAngle = angle + (i * Math.PI * 2) / sectors;
      const px = center + Math.cos(currentAngle) * radius;
      const py = center + Math.sin(currentAngle) * radius;

      if (activeTool === "powder") {
        ctx.beginPath();
        ctx.arc(px, py, brushSize / 2, 0, Math.PI * 2);
        ctx.fillStyle = activeColor;
        ctx.shadowColor = activeColor;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      } else if (activeTool === "flower") {
        // Draw decorative marigold petal
        ctx.beginPath();
        ctx.ellipse(px, py, 6, 12, currentAngle, 0, Math.PI * 2);
        ctx.fillStyle = activeColor;
        ctx.fill();
        ctx.strokeStyle = "#FFF5E5";
        ctx.lineWidth = 1;
        ctx.stroke();
      } else if (activeTool === "diya") {
        // Draw tiny glowing diya stamp
        ctx.beginPath();
        ctx.arc(px, py - 4, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#FFB800";
        ctx.shadowColor = "#FF8A00";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI);
        ctx.fillStyle = "#8C3C17";
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    sound.playRangoliTap();
    drawSymmetrical(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    drawSymmetrical(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveState();
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    sound.playCelebrationFanfare();

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#D6A84B", "#FFE6A0", "#FF9E2C"],
    });

    const link = document.createElement("a");
    link.download = `diwali-rangoli-${recipient.toLowerCase()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden px-4 py-16 text-center select-none">
      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 mx-auto max-w-2xl pt-4"
      >
        <div className="mb-2 flex items-center justify-center gap-2">
          <span className="h-[1px] w-8 bg-diwali-gold/60" />
          <Flower2 className="h-4 w-4 text-diwali-gold animate-pulse" />
          <span className="h-[1px] w-8 bg-diwali-gold/60" />
        </div>

        <h1 className="font-serif text-3xl font-normal tracking-wide text-diwali-goldLight sm:text-4xl md:text-5xl">
          Create Your Rangoli
        </h1>

        <p className="mt-2 font-serif text-sm leading-relaxed text-diwali-cream/90 sm:text-base">
          Touch or drag across the mandala to weave sacred patterns of joy for{" "}
          <span className="font-semibold text-diwali-goldLight">{recipient}</span>!
        </p>
      </motion.div>

      {/* Main Interactive Work Area */}
      <div className="relative z-20 my-auto flex w-full max-w-xl flex-col items-center">
        {/* Template Selector */}
        <div className="mb-3 flex items-center gap-2">
          {RANGOLI_TEMPLATES.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() => setActiveTemplate(tpl.id)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                activeTemplate === tpl.id
                  ? "border border-diwali-gold bg-diwali-gold text-[#231505] font-semibold"
                  : "border border-diwali-gold/30 bg-diwali-navy/70 text-diwali-muted hover:text-white"
              }`}
            >
              {tpl.name}
            </button>
          ))}
        </div>

        {/* Rangoli Drawing Canvas */}
        <div className="relative overflow-hidden rounded-full border-4 border-diwali-gold/60 shadow-diya bg-[#0B1021]">
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="cursor-crosshair touch-none"
          />
        </div>

        {/* Tools, Color Palette & Controls Tray */}
        <div className="mt-4 flex flex-col items-center gap-3 w-full max-w-md">
          {/* Tool Mode Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTool("powder")}
              className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-all ${
                activeTool === "powder"
                  ? "border border-diwali-gold bg-diwali-gold/30 text-diwali-goldLight shadow-goldGlow"
                  : "border border-diwali-gold/30 bg-diwali-navy text-diwali-muted"
              }`}
            >
              <Palette className="h-3 w-3" />
              <span>Powder</span>
            </button>

            <button
              onClick={() => setActiveTool("flower")}
              className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-all ${
                activeTool === "flower"
                  ? "border border-diwali-gold bg-diwali-gold/30 text-diwali-goldLight shadow-goldGlow"
                  : "border border-diwali-gold/30 bg-diwali-navy text-diwali-muted"
              }`}
            >
              <Flower2 className="h-3 w-3" />
              <span>Petals</span>
            </button>

            <button
              onClick={() => setActiveTool("diya")}
              className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-all ${
                activeTool === "diya"
                  ? "border border-diwali-gold bg-diwali-gold/30 text-diwali-goldLight shadow-goldGlow"
                  : "border border-diwali-gold/30 bg-diwali-navy text-diwali-muted"
              }`}
            >
              <Flame className="h-3 w-3" />
              <span>Diyas</span>
            </button>
          </div>

          {/* Color Palette Swatches */}
          <div className="flex items-center justify-center gap-2">
            {RANGOLI_COLORS.map((c) => (
              <button
                key={c.hex}
                onClick={() => setActiveColor(c.hex)}
                title={c.name}
                className={`h-7 w-7 rounded-full shadow-md transition-transform ${
                  activeColor === c.hex
                    ? "scale-125 ring-2 ring-white ring-offset-2 ring-offset-diwali-dark"
                    : "hover:scale-110"
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>

          {/* Action Buttons: Undo, Reset, Save */}
          <div className="flex items-center gap-3 mt-1">
            <button
              onClick={handleUndo}
              title="Undo"
              className="flex items-center gap-1 rounded-full border border-diwali-gold/30 bg-diwali-navy/80 px-3 py-1.5 text-xs text-diwali-cream hover:border-diwali-gold"
            >
              <Undo2 className="h-3.5 w-3.5" />
              <span>Undo</span>
            </button>

            <button
              onClick={handleReset}
              title="Clear Canvas"
              className="flex items-center gap-1 rounded-full border border-diwali-gold/30 bg-diwali-navy/80 px-3 py-1.5 text-xs text-diwali-cream hover:border-diwali-gold"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Clear</span>
            </button>

            <button
              onClick={handleDownload}
              title="Save Rangoli Image"
              className="flex items-center gap-1 rounded-full border border-diwali-gold bg-diwali-gold/20 px-3.5 py-1.5 text-xs font-medium text-diwali-goldLight hover:bg-diwali-gold hover:text-[#231505] transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Save Rangoli</span>
            </button>
          </div>
        </div>
      </div>

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
          <span>Taste Sweet Treats</span>
        </button>
      </motion.div>
    </div>
  );
};

