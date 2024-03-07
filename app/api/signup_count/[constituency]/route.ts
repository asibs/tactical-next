import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { constituencySlugs } from "@/data/constituencySlugs";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  { params }: { params: { constituency: string } },
) {
  if (constituencySlugs.includes(params.constituency)) {
    const count = (await kv.get(params.constituency)) || 0;
    return NextResponse.json(
      { count: count },
      {
        headers: {
          "Vercel-CDN-Cache-Control": "max-age=300",
        },
      },
    );
  } else {
    return NextResponse.json(
      { error: "unknown constituency" },
      {
        status: 404,
        headers: {
          "Vercel-CDN-Cache-Control": "max-age=3600",
        },
      },
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { constituency: string } },
) {
  if (constituencySlugs.includes(params.constituency)) {
    const count = (await kv.incr(params.constituency)) || 0;

    return NextResponse.json({ count: count });
  } else {
    return NextResponse.json(
      { error: "unknown constituency" },
      { status: 404 },
    );
  }
}
