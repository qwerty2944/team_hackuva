import { createSupabaseServerClient } from "@/shared/api/supabase/server";
import type { BlogComment, CommentThreadNode } from "../model/types";

type RawRow = {
  id: number;
  post_slug: string;
  parent_id: number | null;
  body: string;
  created_at: string;
  author:
    | { id: string; display_name: string; email: string; role: string }
    | { id: string; display_name: string; email: string; role: string }[]
    | null;
};

function pickAuthor(raw: RawRow["author"]): BlogComment["author"] {
  const flat = Array.isArray(raw) ? raw[0] : raw;
  if (!flat) {
    return { id: "", display_name: "(알 수 없음)", email: "", role: "member" };
  }
  return {
    id: flat.id,
    display_name: flat.display_name,
    email: flat.email,
    role: flat.role === "admin" ? "admin" : "member",
  };
}

function mapRow(row: RawRow): BlogComment {
  return {
    id: row.id,
    post_slug: row.post_slug,
    parent_id: row.parent_id,
    body: row.body,
    created_at: row.created_at,
    author: pickAuthor(row.author),
  };
}

export async function listThread(
  postSlug: string,
): Promise<CommentThreadNode[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("blog_comments")
    .select(
      "id, post_slug, parent_id, body, created_at, author:profiles!blog_comments_author_id_fkey(id, display_name, email, role)",
    )
    .eq("post_slug", postSlug)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[listThread]", error);
    return [];
  }

  const rows = ((data ?? []) as unknown as RawRow[]).map(mapRow);
  const roots = rows.filter((c) => c.parent_id === null);
  const replies = rows.filter((c) => c.parent_id !== null);

  return roots.map((root) => ({
    comment: root,
    replies: replies.filter((r) => r.parent_id === root.id),
  }));
}

export async function countComments(postSlug: string): Promise<number> {
  const supabase = await createSupabaseServerClient();
  const { count, error } = await supabase
    .from("blog_comments")
    .select("*", { count: "exact", head: true })
    .eq("post_slug", postSlug);
  if (error) {
    console.error("[countComments]", error);
    return 0;
  }
  return count ?? 0;
}
