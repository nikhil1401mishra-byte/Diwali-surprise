import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { wishService, isSupabaseConfigured } from "@/lib/supabase/admin";

// Server-side authorization helper
async function verifyAdminUser(): Promise<{ authorized: boolean; email?: string; error?: string }> {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();

  // If Supabase is configured, verify real user session
  if (isSupabaseConfigured) {
    try {
      const supabase = await createServerSupabaseClient();
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        return { authorized: false, error: "Authentication required" };
      }

      if (!adminEmail || user.email?.toLowerCase() !== adminEmail) {
        return {
          authorized: false,
          error: "Forbidden: You are not authorized to access this dashboard",
        };
      }

      return { authorized: true, email: user.email };
    } catch (err: any) {
      console.error("Auth verification error:", err);
      return { authorized: false, error: "Failed to verify session" };
    }
  } else {
    // If running locally without Supabase credentials configured yet, allow local admin access
    return { authorized: true, email: adminEmail || "nikhil@local.dev" };
  }
}

// GET: Fetch wishes with search, filter, sort, pagination
export async function GET(req: NextRequest) {
  const auth = await verifyAdminUser();
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error || "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search")?.toLowerCase() || "";
  const statusFilter = searchParams.get("status") || "all";
  const dateFilter = searchParams.get("date") || "all"; // all | today | week
  const sort = searchParams.get("sort") || "newest"; // newest | oldest

  const result = await wishService.getWishes();
  if (!result.success || !result.data) {
    return NextResponse.json(
      { error: result.error || "Failed to fetch wishes" },
      { status: 500 }
    );
  }

  let filtered = [...result.data];

  // 1. Text search (recipient name or wish message)
  if (search) {
    filtered = filtered.filter(
      (w) =>
        w.recipient_name.toLowerCase().includes(search) ||
        w.wish_message.toLowerCase().includes(search)
    );
  }

  // 2. Status filter
  if (statusFilter !== "all") {
    filtered = filtered.filter((w) => w.status === statusFilter);
  }

  // 3. Date filter
  if (dateFilter === "today") {
    const today = new Date().toDateString();
    filtered = filtered.filter(
      (w) => new Date(w.submitted_at).toDateString() === today
    );
  } else if (dateFilter === "week") {
    const oneWeekAgo = Date.now() - 7 * 24 * 3600000;
    filtered = filtered.filter(
      (w) => new Date(w.submitted_at).getTime() >= oneWeekAgo
    );
  }

  // 4. Sorting
  if (sort === "oldest") {
    filtered.sort(
      (a, b) =>
        new Date(a.submitted_at).getTime() - new Date(b.submitted_at).getTime()
    );
  } else {
    filtered.sort(
      (a, b) =>
        new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime()
    );
  }

  // Calculate statistics
  const totalWishes = result.data.length;
  const todayStr = new Date().toDateString();
  const todayWishes = result.data.filter(
    (w) => new Date(w.submitted_at).toDateString() === todayStr
  ).length;
  const uniqueRecipients = new Set(result.data.map((w) => w.recipient_name.toLowerCase())).size;
  const latestSubmission = result.data[0]?.submitted_at || null;

  return NextResponse.json({
    wishes: filtered,
    stats: {
      total: totalWishes,
      today: todayWishes,
      uniqueRecipients,
      latestSubmission,
    },
  });
}

// PATCH: Update wish status (mark as read / new)
export async function PATCH(req: NextRequest) {
  const auth = await verifyAdminUser();
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error || "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !["new", "read", "archived"].includes(status)) {
      return NextResponse.json({ error: "Invalid wish ID or status" }, { status: 400 });
    }

    const success = await wishService.updateWishStatus(id, status);
    if (!success) {
      return NextResponse.json({ error: "Failed to update wish status" }, { status: 500 });
    }

    return NextResponse.json({ success: true, id, status });
  } catch (err: any) {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }
}

// DELETE: Delete individual wish
export async function DELETE(req: NextRequest) {
  const auth = await verifyAdminUser();
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error || "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Wish ID parameter is required" }, { status: 400 });
  }

  const success = await wishService.deleteWish(id);
  if (!success) {
    return NextResponse.json({ error: "Failed to delete wish record" }, { status: 500 });
  }

  return NextResponse.json({ success: true, id });
}

