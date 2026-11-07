"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  targetOpacity: number;
  hue: number;
  fadeSpeed: number;
}

export const ParticleEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Limit particles for performance on mobile devices
    const isMobile = width < 768;
    const particleCount = isMobile ? 35 : 70;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 0.8,
        speedY: -(Math.random() * 0.45 + 0.15),
        speedX: (Math.random() - 0.5) * 0.25,
        opacity: Math.random() * 0.7 + 0.2,
        targetOpacity: Math.random() * 0.8 + 0.2,
        hue: Math.random() > 0.3 ? 42 : 32, // Gold / Warm Amber
        fadeSpeed: Math.random() * 0.015 + 0.005,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        // Twinkle opacity cycle
        if (Math.abs(p.opacity - p.targetOpacity) < 0.05) {
          p.targetOpacity = Math.random() * 0.85 + 0.15;
        } else if (p.opacity < p.targetOpacity) {
          p.opacity += p.fadeSpeed;
        } else {
          p.opacity -= p.fadeSpeed;
        }

        // Reset particle when it floats off top
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Render glowing golden particle
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size * 2.5
        );
        gradient.addColorStop(0, `hsla(${p.hue}, 85%, 65%, ${p.opacity})`);
        gradient.addColorStop(0.5, `hsla(${p.hue}, 90%, 55%, ${p.opacity * 0.5})`);
        gradient.addColorStop(1, `hsla(${p.hue}, 90%, 45%, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Bright solid center
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.7, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(48, 100%, 88%, ${p.opacity * 0.95})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10 h-full w-full opacity-70"
    />
  );
};

