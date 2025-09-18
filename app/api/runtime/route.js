export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    runtime: process.release?.name, // should be 'node'
    nodeVersion: process.version,
  });
}