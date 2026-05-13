"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/shared/api/supabase/server";

export type ComposeState =
  | { ok: true }
  | { ok: false; error: string }
  | undefined;

export async function composeEntryAction(
  _prev: ComposeState,
  formData: FormData,
): Promise<ComposeState> {
  const body = String(formData.get("body") ?? "").trim();
  if (!body) return { ok: false, error: "내용을 입력해 주세요." };
  if (body.length > 1000)
    return { ok: false, error: "1000자 이내로 입력해 주세요." };

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "로그인이 필요합니다." };

  const { error } = await supabase
    .from("guestbook_entries")
    .insert({ body, author_id: user.id });
  if (error) return { ok: false, error: error.message };

  revalidatePath("/guestbook");
  return { ok: true };
}
