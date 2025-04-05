import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const questions = await prisma.question.findMany({
    select: { id: true, title: true, language: true }
  })

  return NextResponse.json(questions)
}
