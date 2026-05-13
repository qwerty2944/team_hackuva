import { NextResponse } from "next/server";
import { listPosts } from "@/entities/post/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase().trim() ?? "";
  const tag = searchParams.get("tag")?.trim() ?? "";
  const posts = await listPosts({ q: q || undefined, tag: tag || undefined });
  return NextResponse.json({ posts });
}
