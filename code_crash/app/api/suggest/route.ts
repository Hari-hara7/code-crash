import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, title, details } = body;

    const suggestion = await prisma.suggestion.create({
      data: { name, email, title, details },
    });

    return NextResponse.json(suggestion, { status: 201 });
  } catch (error) {
    console.error('Suggestion Error:', error);
    return NextResponse.json({ error: 'Failed to submit suggestion' }, { status: 500 });
  }
}
