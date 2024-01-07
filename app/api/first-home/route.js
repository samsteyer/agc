import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request) {
  try {
    const data = await sql`SELECT * FROM homes LIMIT 1`;
    return NextResponse.json(data.rows[0], { status: 200 });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
