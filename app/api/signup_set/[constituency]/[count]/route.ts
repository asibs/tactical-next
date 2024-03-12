import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { constituencySlugs } from "@/data/constituencySlugs";
import Crypto from "crypto";

export const runtime = "nodejs";

export async function POST(
  request: NextRequest,
  { params }: { params: { constituency: string; count: string } },
) {
  const sentKey = request.headers.get("Authorization") || "";

  //TODO stop resuing the DC club API key!
  const correctKey = process.env.DC_API_KEY || "";

  if (
    sentKey === "" ||
    Buffer.byteLength(sentKey) !== Buffer.byteLength(correctKey) ||
    !Crypto.timingSafeEqual(Buffer.from(sentKey), Buffer.from(correctKey))
  ) {
    console.log(
      "AN set subscriber count: API Key did not match - returning 404",
    );
    return new Response("Not found", { status: 404 });
  }

  const sentCount = parseInt(params.count);

  if (!isNaN(sentCount) && constituencySlugs.includes(params.constituency)) {
    const kvStatus = await kv.set(params.constituency, sentCount);

    return NextResponse.json({ status: kvStatus });
  } else {
    return NextResponse.json(
      { error: "unknown constituency or invalid number" },
      { status: 404 },
    );
  }
}
