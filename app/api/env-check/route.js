export const runtime = "nodejs";
export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";

export async function GET() {
  const uri = process.env.MONGODB_URI;
  return NextResponse.json({
    hasUri: !!uri,
    uriPreview: uri ? uri.slice(0, 24) + "..." : null,
  });
}
