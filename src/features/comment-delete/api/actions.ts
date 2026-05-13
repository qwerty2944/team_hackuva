"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/shared/api/supabase/server";

export async function deleteCommentAction(commentId: number) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false as const, error: "로그인이 필요합니다." };

  const { data: comment } = await supabase
    .from("blog_comments")
    .select("post_slug")
    .eq("id", commentId)
    .maybeSingle();

  const { error } = await supabase
    .from("blog_comments")
    .delete()
    .eq("id", commentId);
  if (error) return { ok: false as const, error: error.message };

  if (comment?.post_slug) revalidatePath(`/blog/${comment.post_slug}`);
  return { ok: true as const };
}
