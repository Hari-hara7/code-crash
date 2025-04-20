import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// POST: Create a tip
export async function POST(req: NextRequest) {
  try {
    const { content, author } = await req.json();

    const tip = await prisma.tip.create({
      data: { content, author },
    });

    return NextResponse.json(tip, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit tip' }, { status: 500 });
  }
}

// GET: Fetch all tips
export async function GET() {
  try {
    const tips = await prisma.tip.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(tips);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load tips' }, { status: 500 });
  }
}

// PATCH: Update a tip
export async function PATCH(req: NextRequest) {
  try {
    const { id, content } = await req.json();

    const updated = await prisma.tip.update({
      where: { id },
      data: { content },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update tip' }, { status: 500 });
  }
}

// DELETE: Delete a tip
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    await prisma.tip.delete({ where: { id } });

    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete tip' }, { status: 500 });
  }
}
