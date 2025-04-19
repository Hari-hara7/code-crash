import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const feedback = await prisma.feedback.create({
      data: { name, email, message },
    });

    return NextResponse.json({ success: true, feedback });
  } catch (error) {
    console.error("❌ Error submitting feedback:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
