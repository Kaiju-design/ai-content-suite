import { NextResponse } from 'next/server';

export async function POST(request) {
  const { prompt } = await request.json();

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'Missing OpenAI API key' },
      { status: 500 }
    );
  }

  try {
    const apiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 300,
      }),
    });

    const data = await apiRes.json();

    return NextResponse.json({
      result: data.choices?.[0]?.message?.content ?? 'No response',
    });
  } catch (err) {
    console.error('API Error:', err); // ✅ this fixes the unused var warning
    return NextResponse.json(
      { error: 'API request failed' },
      { status: 500 }
    );
  }
}
