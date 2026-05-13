import { createSupabaseServerClient } from "@/shared/api/supabase/server";
import type { Post } from "../model/types";

type RawRow = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  published_at: string;
  reading_minutes: number;
  tags: string[];
  project_slug: string | null;
  author:
    | { id: string; display_name: string; email: string }
    | { id: string; display_name: string; email: string }[]
    | null;
};

function mapRow(row: RawRow): Post {
  const author = Array.isArray(row.author)
    ? (row.author[0] ?? { id: "", display_name: "(알 수 없음)", email: "" })
    : (row.author ?? { id: "", display_name: "(알 수 없음)", email: "" });
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    body: row.body,
    publishedAt: row.published_at,
    readingMinutes: row.reading_minutes,
    tags: row.tags ?? [],
    projectSlug: row.project_slug ?? undefined,
    author,
  };
}

export async function listPosts(
  params: { q?: string; tag?: string } = {},
): Promise<Post[]> {
  const supabase = await createSupabaseServerClient();
  let query = supabase
    .from("blog_posts")
    .select(
      "slug, title, excerpt, body, published_at, reading_minutes, tags, project_slug, author:profiles!blog_posts_author_id_fkey(id, display_name, email)",
    )
    .order("published_at", { ascending: false });

  if (params.tag) query = query.contains("tags", [params.tag]);

  const { data, error } = await query;
  if (error) {
    console.error("[listPosts]", error);
    return [];
  }
  const rows = ((data ?? []) as unknown as RawRow[]).map(mapRow);
  const q = params.q?.toLowerCase().trim();
  if (!q) return rows;
  return rows.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.body.toLowerCase().includes(q),
  );
}
