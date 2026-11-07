"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DiwaliWish } from "@/lib/validations/wish";
import { WishTable } from "@/components/WishTable";
import { WishDetails } from "@/components/WishDetails";
import {
  Sparkles,
  Inbox,
  Calendar,
  Users,
  Clock,
  Search,
  Filter,
  RotateCcw,
  LogOut,
  AlertCircle,
  Loader2,
  Heart,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface DashboardStats {
  total: number;
  today: number;
  uniqueRecipients: number;
  latestSubmission: string | null;
}

export const AdminDashboard: React.FC = () => {
  const router = useRouter();

  const [wishes, setWishes] = useState<DiwaliWish[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    total: 0,
    today: 0,
    uniqueRecipients: 0,
    latestSubmission: null,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Filters and search states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedWish, setSelectedWish] = useState<DiwaliWish | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchWishes = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const params = new URLSearchParams({
        search: searchQuery,
        status: statusFilter,
        date: dateFilter,
        sort: sortBy,
      });

      const res = await fetch(`/api/admin/wishes?${params.toString()}`);
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          router.push("/admin/login");
          return;
        }
        throw new Error("Failed to load wishes");
      }

      const data = await res.json();
      setWishes(data.wishes || []);
      setStats(
        data.stats || {
          total: 0,
          today: 0,
          uniqueRecipients: 0,
          latestSubmission: null,
        }
      );
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWishes();
  }, [searchQuery, statusFilter, dateFilter, sortBy]);

  const handleToggleStatus = async (
    id: string,
    currentStatus: "new" | "read" | "archived"
  ) => {
    const newStatus = currentStatus === "new" ? "read" : "new";

    // Optimistic UI update
    setWishes((prev) =>
      prev.map((w) => (w.id === id ? { ...w, status: newStatus } : w))
    );
    if (selectedWish?.id === id) {
      setSelectedWish((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    try {
      await fetch("/api/admin/wishes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
    } catch {
      // Revert if error
      fetchWishes();
    }
  };

  const handleDeleteWish = async (id: string) => {
    // Optimistic UI update
    setWishes((prev) => prev.filter((w) => w.id !== id));
    if (selectedWish?.id === id) {
      setSelectedWish(null);
    }

    try {
      await fetch(`/api/admin/wishes?id=${id}`, {
        method: "DELETE",
      });
      fetchWishes();
    } catch {
      fetchWishes();
    }
  };

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {}
    router.push("/admin/login");
  };

  // Pagination calculation
  const totalPages = Math.ceil(wishes.length / itemsPerPage) || 1;
  const paginatedWishes = wishes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-diwali-dark text-diwali-cream">
      {/* Top Admin Navigation Bar */}
      <header className="border-b border-diwali-gold/20 bg-diwali-navy/90 backdrop-blur-md sticky top-0 z-30">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-diwali-gold/40 bg-diwali-gold/15 shadow-goldGlow">
              <Sparkles className="h-4 w-4 text-diwali-gold" />
            </div>
            <div>
              <span className="font-serif text-base font-semibold text-diwali-goldLight">
                Nikhil&apos;s Private Dashboard
              </span>
              <span className="hidden sm:inline-block ml-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-400 font-bold">
                ● Admin Protected
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchWishes}
              title="Refresh wishes"
              className="flex items-center gap-1.5 rounded-full border border-diwali-gold/30 bg-diwali-navy px-3 py-1.5 text-xs text-diwali-cream hover:bg-diwali-gold/20 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5 text-diwali-gold" />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-950/40 px-3.5 py-1.5 text-xs font-semibold text-red-300 hover:bg-red-900/60 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Personal Greeting */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-diwali-goldLight flex items-center gap-2">
            <span>Happy Diwali, Nikhil!</span>
            <Heart className="h-6 w-6 text-rose-500 fill-rose-500 animate-pulse" />
          </h1>
          <p className="mt-1 text-sm text-diwali-muted">
            Here are all the secret wishes your visitors have whispered into the universe.
          </p>
        </div>

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Card 1: Total Wishes */}
          <div className="rounded-2xl border border-diwali-gold/30 bg-diwali-navy/70 p-5 shadow-card backdrop-blur-md">
            <div className="flex items-center justify-between text-diwali-muted mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">
                Total Wishes
              </span>
              <Inbox className="h-4 w-4 text-diwali-gold" />
            </div>
            <p className="font-serif text-3xl font-bold text-diwali-cream">
              {stats.total}
            </p>
          </div>

          {/* Card 2: Today's Wishes */}
          <div className="rounded-2xl border border-diwali-gold/30 bg-diwali-navy/70 p-5 shadow-card backdrop-blur-md">
            <div className="flex items-center justify-between text-diwali-muted mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">
                Received Today
              </span>
              <Calendar className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="font-serif text-3xl font-bold text-emerald-300">
              {stats.today}
            </p>
          </div>

          {/* Card 3: Unique Recipients */}
          <div className="rounded-2xl border border-diwali-gold/30 bg-diwali-navy/70 p-5 shadow-card backdrop-blur-md">
            <div className="flex items-center justify-between text-diwali-muted mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">
                Unique People
              </span>
              <Users className="h-4 w-4 text-amber-400" />
            </div>
            <p className="font-serif text-3xl font-bold text-amber-300">
              {stats.uniqueRecipients}
            </p>
          </div>

          {/* Card 4: Latest Submission */}
          <div className="rounded-2xl border border-diwali-gold/30 bg-diwali-navy/70 p-5 shadow-card backdrop-blur-md">
            <div className="flex items-center justify-between text-diwali-muted mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">
                Latest Wish
              </span>
              <Clock className="h-4 w-4 text-cyan-400" />
            </div>
            <p className="font-sans text-xs text-diwali-cream truncate mt-2 font-medium">
              {stats.latestSubmission
                ? new Date(stats.latestSubmission).toLocaleString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "No submissions yet"}
            </p>
          </div>
        </div>

        {/* Filter, Search & Controls Bar */}
        <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl border border-diwali-gold/30 bg-diwali-navy/80 p-4 shadow-card">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-diwali-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recipient or wish..."
              className="w-full rounded-xl border border-diwali-gold/30 bg-diwali-dark/80 pl-10 pr-4 py-2 text-xs text-diwali-cream placeholder-diwali-muted/50 outline-none focus:border-diwali-gold"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-diwali-gold/30 bg-diwali-dark/80 px-3 py-2 text-xs text-diwali-cream outline-none focus:border-diwali-gold cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="new">New Wishes</option>
              <option value="read">Read Wishes</option>
            </select>

            {/* Date Filter */}
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="rounded-xl border border-diwali-gold/30 bg-diwali-dark/80 px-3 py-2 text-xs text-diwali-cream outline-none focus:border-diwali-gold cursor-pointer"
            >
              <option value="all">All Time</option>
              <option value="today">Today Only</option>
              <option value="week">Past 7 Days</option>
            </select>

            {/* Sort Order */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-diwali-gold/30 bg-diwali-dark/80 px-3 py-2 text-xs text-diwali-cream outline-none focus:border-diwali-gold cursor-pointer"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
            </select>
          </div>
        </div>

        {/* Wishes Table or States */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 rounded-2xl border border-diwali-gold/20 bg-diwali-navy/40">
            <Loader2 className="h-8 w-8 animate-spin text-diwali-gold mb-3" />
            <p className="text-sm text-diwali-muted">Loading your Diwali wishes...</p>
          </div>
        ) : errorMessage ? (
          <div className="flex flex-col items-center justify-center py-16 rounded-2xl border border-red-500/30 bg-red-950/20 text-center p-6">
            <AlertCircle className="h-10 w-10 text-red-400 mb-2" />
            <p className="text-sm text-red-300 mb-4">{errorMessage}</p>
            <button
              onClick={fetchWishes}
              className="rounded-full bg-diwali-gold px-5 py-2 text-xs font-bold text-[#231505]"
            >
              Retry
            </button>
          </div>
        ) : wishes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 rounded-2xl border border-diwali-gold/25 bg-diwali-navy/40 text-center p-6">
            <Inbox className="h-12 w-12 text-diwali-muted mb-3 opacity-60" />
            <h3 className="font-serif text-xl font-bold text-diwali-goldLight">
              No Wishes Found
            </h3>
            <p className="text-xs text-diwali-muted mt-1 max-w-sm">
              {searchQuery || statusFilter !== "all" || dateFilter !== "all"
                ? "No wishes match your current search or filters. Try clearing your filters."
                : "Visitors haven't submitted any wishes yet. Share your website URL with friends to get started!"}
            </p>
          </div>
        ) : (
          <>
            <WishTable
              wishes={paginatedWishes}
              onViewWish={(wish) => setSelectedWish(wish)}
              onToggleStatus={handleToggleStatus}
              onDeleteWish={handleDeleteWish}
            />

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between text-xs text-diwali-muted">
                <span>
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, wishes.length)} of {wishes.length}{" "}
                  wishes
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="flex px-3 py-1 items-center justify-center rounded-lg border border-diwali-gold/30 bg-diwali-navy text-xs font-medium text-diwali-cream disabled:opacity-40 hover:border-diwali-gold/60 transition-colors"
                  >
                    Prev
                  </button>
                  <span className="text-diwali-goldLight font-medium px-2">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="flex px-3 py-1 items-center justify-center rounded-lg border border-diwali-gold/30 bg-diwali-navy text-xs font-medium text-diwali-cream disabled:opacity-40 hover:border-diwali-gold/60 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Detailed Wish Modal */}
      {selectedWish && (
        <WishDetails
          wish={selectedWish}
          onClose={() => setSelectedWish(null)}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDeleteWish}
        />
      )}
    </div>
  );
};

