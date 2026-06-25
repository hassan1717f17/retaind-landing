import { NextResponse } from "next/server";
import { z } from "zod/v4";
import { newsletterSubscribeSchema } from "@/lib/api-contract";
import { storage } from "@/lib/storage";

export async function POST(req: Request) {
  try {
    const input = newsletterSubscribeSchema.parse(await req.json());
    await storage.subscribeToNewsletter(input);
    return NextResponse.json({ message: "Subscribed successfully" }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { message: err.issues?.[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }
    console.error("Newsletter subscription error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
