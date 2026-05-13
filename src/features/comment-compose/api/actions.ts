"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/shared/api/supabase/server";

export type CommentComposeState =
  | { ok: true }
  | { ok: false; error: string }
  | undefined;

export async function composeCommentAction(
  _prev: CommentComposeState,
  formData: FormData,
): Promise<CommentComposeState> {
  const postSlug = String(formData.get("post_slug") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const parentRaw = String(formData.get("parent_id") ?? "").trim();
  const parent_id = parentRaw ? Number(parentRaw) : null;

  if (!postSlug) return { ok: false, error: "잘못된 요청입니다." };
  if (!body) return { ok: false, error: "내용을 입력해 주세요." };
  if (body.length > 1000)
    return { ok: false, error: "1000자 이내로 입력해 주세요." };

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "로그인이 필요합니다." };

  const { error } = await supabase.from("blog_comments").insert({
    post_slug: postSlug,
    body,
    author_id: user.id,
    parent_id,
  });
  if (error) return { ok: false, error: error.message };

  revalidatePath(`/blog/${postSlug}`);
  return { ok: true };
}
