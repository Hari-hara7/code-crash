import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true }
  })

  return NextResponse.json(users)
}

export async function POST(req: Request) {
  const { name, email, password } = await req.json()

  const user = await prisma.user.create({
    data: { name, email, password }
  })

  return NextResponse.json({ id: user.id, name: user.name, email: user.email })
}
