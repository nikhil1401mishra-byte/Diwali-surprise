"use client";

import React from "react";
import { DiwaliWish } from "@/lib/validations/wish";
import { Eye, CheckCircle2, RotateCcw, Trash2, Calendar, Clock } from "lucide-react";

interface WishTableProps {
  wishes: DiwaliWish[];
  onViewWish: (wish: DiwaliWish) => void;
  onToggleStatus: (id: string, currentStatus: "new" | "read" | "archived") => void;
  onDeleteWish: (id: string) => void;
}

export const WishTable: React.FC<WishTableProps> = ({
  wishes,
  onViewWish,
  onToggleStatus,
  onDeleteWish,
}) => {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-diwali-gold/30 bg-diwali-navy/60 shadow-xl backdrop-blur-md">
      {/* Desktop / Tablet Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm text-diwali-cream">
          <thead className="border-b border-diwali-gold/20 bg-diwali-navy/90 text-[11px] font-semibold uppercase tracking-wider text-diwali-gold">
            <tr>
              <th scope="col" className="px-6 py-4">Recipient</th>
              <th scope="col" className="px-6 py-4">Wish Message</th>
              <th scope="col" className="px-6 py-4">Submitted</th>
              <th scope="col" className="px-6 py-4 text-center">Status</th>
              <th scope="col" className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-diwali-gold/15">
            {wishes.map((wish) => {
              const dateStr = new Date(wish.submitted_at).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              });
              const timeStr = new Date(wish.submitted_at).toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <tr
                  key={wish.id}
                  onClick={() => onViewWish(wish)}
                  className="cursor-pointer transition-colors hover:bg-diwali-gold/10"
                >
                  {/* Recipient */}
                  <td className="px-6 py-4 font-serif text-base font-semibold text-diwali-goldLight whitespace-nowrap">
                    {wish.recipient_name}
                  </td>

                  {/* Message Preview */}
                  <td className="px-6 py-4 max-w-xs truncate font-sans text-xs text-diwali-cream/90">
                    &ldquo;{wish.wish_message}&rdquo;
                  </td>

                  {/* Timestamp */}
                  <td className="px-6 py-4 text-xs text-diwali-muted whitespace-nowrap">
                    <span>{dateStr}</span>
                    <span className="text-[10px] text-diwali-muted/60 ml-1">({timeStr})</span>
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        wish.status === "new"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                          : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      }`}
                    >
                      {wish.status === "new" ? "New" : "Read"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td
                    className="px-6 py-4 text-right whitespace-nowrap"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onViewWish(wish)}
                        title="View Details"
                        className="rounded-lg border border-diwali-gold/30 bg-diwali-navy/80 p-1.5 text-diwali-goldLight hover:bg-diwali-gold/20"
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => onToggleStatus(wish.id, wish.status)}
                        title={wish.status === "new" ? "Mark as Read" : "Mark as New"}
                        className="rounded-lg border border-diwali-gold/30 bg-diwali-navy/80 p-1.5 text-diwali-goldLight hover:bg-diwali-gold/20"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => onDeleteWish(wish.id)}
                        title="Delete Wish"
                        className="rounded-lg border border-red-500/30 bg-red-950/40 p-1.5 text-red-300 hover:bg-red-900/60"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden divide-y divide-diwali-gold/15">
        {wishes.map((wish) => {
          const dateStr = new Date(wish.submitted_at).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          });
          const timeStr = new Date(wish.submitted_at).toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div
              key={wish.id}
              onClick={() => onViewWish(wish)}
              className="p-4 cursor-pointer hover:bg-diwali-gold/5 transition-colors text-left"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-serif text-lg font-bold text-diwali-goldLight">
                  {wish.recipient_name}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    wish.status === "new"
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  }`}
                >
                  {wish.status === "new" ? "New" : "Read"}
                </span>
              </div>

              <p className="text-xs text-diwali-cream/90 line-clamp-2 mb-3">
                &ldquo;{wish.wish_message}&rdquo;
              </p>

              <div className="flex items-center justify-between text-[11px] text-diwali-muted pt-2 border-t border-diwali-gold/10">
                <span>{dateStr} at {timeStr}</span>

                <div
                  className="flex items-center gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => onToggleStatus(wish.id, wish.status)}
                    className="p-1 text-diwali-goldLight hover:text-white"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDeleteWish(wish.id)}
                    className="p-1 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

