import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { tipId, userId } = await req.json();

  try {
    // Check if already voted
    const existingVote = await prisma.tipVote.findUnique({
      where: {
        tipId_userId: { tipId, userId },
      },
    });

    if (existingVote) {
      // If exists, remove (toggle off)
      await prisma.tipVote.delete({
        where: {
          tipId_userId: { tipId, userId },
        },
      });
      return NextResponse.json({ message: 'Vote removed' });
    } else {
      // Else, create vote
      await prisma.tipVote.create({
        data: { tipId, userId },
      });
      return NextResponse.json({ message: 'Vote added' });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to vote' }, { status: 500 });
  }
}
