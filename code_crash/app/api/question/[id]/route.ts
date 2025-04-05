import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

interface Params {
  params: { id: string }
}

export async function GET(_: Request, { params }: Params) {
  const question = await prisma.question.findUnique({
    where: { id: params.id },
    select: { id: true, title: true, language: true }
  })

  if (!question) {
    return NextResponse.json({ error: "Question not found" }, { status: 404 })
  }

  return NextResponse.json(question)
}
