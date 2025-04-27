import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function GET(req: NextRequest) {
  return NextResponse.json({ status: 'OK' });
}