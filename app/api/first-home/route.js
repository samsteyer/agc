import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js"

export async function GET({ req, res }) {
  try {
    // This should be handled in the auth route
    const session = await getServerSession({ req, res, authOptions })
    const user = await sql`SELECT id FROM users WHERE email = ${session.user.email}`;
    const userId = user.rows[0].id;
    const data = await sql`SELECT * FROM homes WHERE user_id = ${userId} LIMIT 1`;
    return NextResponse.json(data.rows[0], { status: 200 });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
