import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { NextRequest } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const homeId = params.id;
    
    if (!homeId) {
      return NextResponse.json({ error: 'Home ID is required' }, { status: 400 });
    }
    
    // Get the user ID from the session
    if (!session.user.id) {
      return NextResponse.json({ error: 'User ID not found in session' }, { status: 401 });
    }
    
    const userId = session.user.id;
    
    const ownershipCheck = await sql`
      SELECT * FROM homes 
      WHERE id = ${homeId} AND user_id = ${userId}
    `;
    
    if (ownershipCheck.rows.length === 0) {
      return NextResponse.json(
        { error: 'Home not found or you do not have permission to access it' },
        { status: 404 }
      );
    }
    
    const data = await sql`SELECT * FROM homes WHERE id = ${homeId}`;
    
    return NextResponse.json(data.rows[0], { status: 200 });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}