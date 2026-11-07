"use client";

import React, { useState } from "react";
import { DiwaliWish } from "@/lib/validations/wish";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, User, Clock, CheckCircle2, Trash2, AlertTriangle, ShieldCheck } from "lucide-react";

interface WishDetailsProps {
  wish: DiwaliWish | null;
  onClose: () => void;
  onToggleStatus: (id: string, currentStatus: "new" | "read" | "archived") => void;
  onDelete: (id: string) => void;
}

export const WishDetails: React.FC<WishDetailsProps> = ({
  wish,
  onClose,
  onToggleStatus,
  onDelete,
}) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  if (!wish) return null;

  const formattedDate = new Date(wish.submitted_at).toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = new Date(wish.submitted_at).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-lg rounded-3xl border border-diwali-gold/50 bg-gradient-to-b from-[#131A33] to-[#0A0F21] p-6 sm:p-8 text-left shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full border border-diwali-gold/30 bg-diwali-navy text-diwali-muted hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Status Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
              wish.status === "new"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
            }`}
          >
            {wish.status === "new" ? "● New Wish" : "✓ Read"}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-diwali-muted">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Consent Confirmed</span>
          </span>
        </div>

        {/* Recipient Name Header */}
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-diwali-goldLight flex items-center gap-2">
          <User className="h-6 w-6 text-diwali-gold" />
          <span>{wish.recipient_name}</span>
        </h2>

        {/* Date and Time Details */}
        <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-diwali-muted border-b border-diwali-gold/20 pb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-diwali-gold" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-diwali-gold" />
            <span>{formattedTime}</span>
          </div>
        </div>

        {/* Full Wish Message */}
        <div className="mt-5 rounded-2xl border border-diwali-gold/30 bg-diwali-navy/70 p-5 shadow-inner">
          <span className="text-[10px] font-semibold tracking-wider text-diwali-gold uppercase">
            Personal Wish Message
          </span>
          <p className="mt-2 font-serif text-base sm:text-lg leading-relaxed text-diwali-cream whitespace-pre-wrap">
            &ldquo;{wish.wish_message}&rdquo;
          </p>
        </div>

        {/* Actions Footer */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-2">
          {/* Toggle Read/New */}
          <button
            onClick={() => onToggleStatus(wish.id, wish.status)}
            className="flex items-center gap-1.5 rounded-full border border-diwali-gold/40 bg-diwali-navy px-4 py-2 text-xs font-medium text-diwali-goldLight hover:bg-diwali-gold/20 transition-colors"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>{wish.status === "new" ? "Mark as Read" : "Mark as New"}</span>
          </button>

          {/* Delete Button / Confirm */}
          {!showConfirmDelete ? (
            <button
              onClick={() => setShowConfirmDelete(true)}
              className="flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-950/40 px-4 py-2 text-xs font-medium text-red-300 hover:bg-red-900/60 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Delete Wish</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs text-red-300 flex items-center gap-1">
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>Confirm?</span>
              </span>
              <button
                onClick={() => {
                  onDelete(wish.id);
                  onClose();
                }}
                className="rounded-full bg-red-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="rounded-full bg-stone-700 px-3 py-1.5 text-xs text-stone-200 hover:bg-stone-600"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

