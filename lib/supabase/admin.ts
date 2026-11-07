import { createClient } from "@supabase/supabase-js";
import { DiwaliWish, WishSubmissionInput } from "../validations/wish";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && serviceRoleKey);

// In-memory fallback repository for local offline development or when env vars aren't set yet
const inMemoryWishes: DiwaliWish[] = [
  {
    id: "demo-wish-1",
    recipient_name: "Ananya",
    wish_message: "Wishing for health, peace, and that we celebrate Diwali together in joy!",
    submitted_at: new Date(Date.now() - 3600000 * 3).toISOString(),
    consent_given: true,
    status: "new",
  },
  {
    id: "demo-wish-2",
    recipient_name: "Rohan",
    wish_message: "May this year bring new breakthroughs and happy smiles to Nikhil & family!",
    submitted_at: new Date(Date.now() - 3600000 * 8).toISOString(),
    consent_given: true,
    status: "read",
  },
  {
    id: "demo-wish-3",
    recipient_name: "Pooja",
    wish_message: "So grateful for this digital gift experience. Have a sparkling Diwali, Nikhil!",
    submitted_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    consent_given: true,
    status: "new",
  },
];

export function getAdminSupabaseClient() {
  if (!isSupabaseConfigured) {
    return null;
  }
  return createClient(supabaseUrl!, serviceRoleKey!, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

// Unified Wish Service with Supabase database + graceful local fallback
export const wishService = {
  async insertWish(input: WishSubmissionInput): Promise<{ success: boolean; data?: DiwaliWish; error?: string }> {
    const client = getAdminSupabaseClient();

    if (client) {
      const { data, error } = await client
        .from("diwali_wishes")
        .insert({
          recipient_name: input.recipient_name,
          wish_message: input.wish_message,
          consent_given: input.consent_given,
          status: "new",
        })
        .select()
        .single();

      if (error) {
        console.error("Supabase wish insertion error:", error);
        return { success: false, error: error.message };
      }

      return { success: true, data: data as DiwaliWish };
    } else {
      // Local development fallback
      const newWish: DiwaliWish = {
        id: `local-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        recipient_name: input.recipient_name,
        wish_message: input.wish_message,
        submitted_at: new Date().toISOString(),
        consent_given: input.consent_given,
        status: "new",
      };
      inMemoryWishes.unshift(newWish);
      return { success: true, data: newWish };
    }
  },

  async getWishes(): Promise<{ success: boolean; data?: DiwaliWish[]; error?: string }> {
    const client = getAdminSupabaseClient();

    if (client) {
      const { data, error } = await client
        .from("diwali_wishes")
        .select("*")
        .order("submitted_at", { ascending: false });

      if (error) {
        console.error("Supabase get wishes error:", error);
        return { success: false, error: error.message };
      }

      return { success: true, data: (data as DiwaliWish[]) || [] };
    } else {
      return { success: true, data: [...inMemoryWishes] };
    }
  },

  async updateWishStatus(id: string, status: "new" | "read" | "archived"): Promise<boolean> {
    const client = getAdminSupabaseClient();

    if (client) {
      const { error } = await client
        .from("diwali_wishes")
        .update({ status })
        .eq("id", id);

      if (error) {
        console.error("Supabase update status error:", error);
        return false;
      }
      return true;
    } else {
      const target = inMemoryWishes.find((w) => w.id === id);
      if (target) {
        target.status = status;
        return true;
      }
      return false;
    }
  },

  async deleteWish(id: string): Promise<boolean> {
    const client = getAdminSupabaseClient();

    if (client) {
      const { error } = await client
        .from("diwali_wishes")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Supabase delete wish error:", error);
        return false;
      }
      return true;
    } else {
      const index = inMemoryWishes.findIndex((w) => w.id === id);
      if (index !== -1) {
        inMemoryWishes.splice(index, 1);
        return true;
      }
      return false;
    }
  },
};
