import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    const newSupport = await prisma.supportRequest.create({
      data: { name, email, subject, message },
    });

    return NextResponse.json(newSupport, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to submit support request' }, { status: 500 });
  }
}
