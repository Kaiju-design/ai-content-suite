import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    // Your AI logic here — for now just echo back
    return NextResponse.json({ result: `You sent: ${prompt}` });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
  }
}
