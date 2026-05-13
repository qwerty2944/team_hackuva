import { createSupabaseServerClient } from "@/shared/api/supabase/server";

export async function allTags(): Promise<string[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("blog_posts").select("tags");
  if (error) {
    console.error("[allTags]", error);
    return [];
  }
  const tags = new Set<string>();
  for (const row of data ?? []) for (const t of row.tags ?? []) tags.add(t);
  return Array.from(tags).sort();
}
