import { createSupabaseServerClient } from "@/shared/api/supabase/server";
import type { Post } from "../model/types";

export async function getPost(slug: string): Promise<Post | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select(
      "slug, title, excerpt, body, published_at, reading_minutes, tags, project_slug, author:profiles!blog_posts_author_id_fkey(id, display_name, email)",
    )
    .eq("slug", slug)
    .maybeSingle();
  if (error || !data) {
    if (error) console.error("[getPost]", error);
    return null;
  }
  const author = Array.isArray(data.author)
    ? (data.author[0] ?? { id: "", display_name: "(알 수 없음)", email: "" })
    : (data.author ?? { id: "", display_name: "(알 수 없음)", email: "" });
  return {
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt,
    body: data.body,
    publishedAt: data.published_at,
    readingMinutes: data.reading_minutes,
    tags: data.tags ?? [],
    projectSlug: data.project_slug ?? undefined,
    author,
  };
}

export async function listPostSlugs(): Promise<string[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("blog_posts").select("slug");
  if (error) {
    console.error("[listPostSlugs]", error);
    return [];
  }
  return (data ?? []).map((r) => r.slug);
}
