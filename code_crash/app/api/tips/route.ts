import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all tips
export async function GET() {
  const tips = await prisma.tip.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(tips);
}

// POST a new tip
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { content, author } = body;

    const newTip = await prisma.tip.create({
      data: { content, author },
    });

    return NextResponse.json(newTip, { status: 201 });
  } catch (error) {
    console.error('Error posting tip:', error);
    return NextResponse.json({ error: 'Failed to submit tip' }, { status: 500 });
  }
}
