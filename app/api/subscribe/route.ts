import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabase } from "@/lib/supabase";

const subscribeSchema = z.object({
  email: z.string().email("Invalid email address"),
  locale: z.enum(["en", "tr"]).optional().default("en"),
  source: z.string().optional().default("landing"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = subscribeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, locale, source } = parsed.data;

    const { error } = await getSupabase()
      .from("email_subscribers")
      .insert({ email, locale, source });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "This email is already subscribed." },
          { status: 409 }
        );
      }
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}
