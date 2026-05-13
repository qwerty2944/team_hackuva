import { NextResponse } from "next/server";
import { posts } from "@/entities/post";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase().trim() ?? "";
  const tag = searchParams.get("tag")?.trim() ?? "";

  let result = posts;
  if (tag) result = result.filter((p) => p.tags.includes(tag));
  if (q) {
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.body.toLowerCase().includes(q),
    );
  }

  const sorted = [...result].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1,
  );

  return NextResponse.json({ posts: sorted });
}
