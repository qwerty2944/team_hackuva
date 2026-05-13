"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/shared/api/supabase/server";

export async function deleteEntryAction(entryId: number) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false as const, error: "로그인이 필요합니다." };

  const { error } = await supabase
    .from("guestbook_entries")
    .delete()
    .eq("id", entryId)
    .eq("author_id", user.id);

  if (error) return { ok: false as const, error: error.message };
  revalidatePath("/guestbook");
  return { ok: true as const };
}
