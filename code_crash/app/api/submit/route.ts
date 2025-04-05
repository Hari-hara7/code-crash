import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { questionId, userId, userCode } = await req.json()

  const question = await prisma.question.findUnique({
    where: { id: questionId }
  })

  if (!question) {
    return NextResponse.json({ error: "Invalid question" }, { status: 400 })
  }

  const isCorrect = question.correctCode.trim() === userCode.trim()

  const submission = await prisma.submission.create({
    data: {
      userId,
      questionId,
      userCode,
      isCorrect
    }
  })

  return NextResponse.json({
    isCorrect,
    submissionId: submission.id
  })
}
