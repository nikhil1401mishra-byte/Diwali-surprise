import { NextRequest, NextResponse } from "next/server";
import { WishSubmissionSchema } from "@/lib/validations/wish";
import { wishService } from "@/lib/supabase/admin";

// Simple in-memory rate limiter (limits IP to 5 wish submissions per 10 minutes)
const ipRateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = ipRateLimitMap.get(ip);

  if (!record || now > record.expiresAt) {
    ipRateLimitMap.set(ip, { count: 1, expiresAt: now + 10 * 60 * 1000 });
    return true;
  }

  if (record.count >= 8) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limiting by client IP
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown-ip";

    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        {
          error: "Too many wishes submitted from this device. Please wait a few minutes before sending another.",
        },
        { status: 429 }
      );
    }

    // 2. Parse and validate JSON payload
    const body = await req.json();
    const parseResult = WishSubmissionSchema.safeParse(body);

    if (!parseResult.success) {
      const errorMsg = parseResult.error.issues[0]?.message || "Invalid submission data";
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const { recipient_name, wish_message, consent_given } = parseResult.data;

    // 3. Double-check consent requirement
    if (!consent_given) {
      return NextResponse.json(
        { error: "Consent to share your wish with Nikhil is required." },
        { status: 400 }
      );
    }

    // 4. Sanitize text inputs
    const sanitizedName = recipient_name.replace(/[<>]/g, "").trim().slice(0, 32);
    const sanitizedWish = wish_message.replace(/[<>]/g, "").trim().slice(0, 500);

    // 5. Save to database via server-side service
    const result = await wishService.insertWish({
      recipient_name: sanitizedName,
      wish_message: sanitizedWish,
      consent_given: true,
    });

    if (!result.success || !result.data) {
      return NextResponse.json(
        { error: result.error || "Failed to save wish. Please try again." },
        { status: 500 }
      );
    }

    // 6. Return success response (never exposing credentials)
    return NextResponse.json(
      {
        success: true,
        message: "Your wish has been received into the universe! ✨",
        wishId: result.data.id,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("API /api/wishes error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}

// Block public GET or other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Public listing of wishes is strictly restricted." },
    { status: 405 }
  );
}
