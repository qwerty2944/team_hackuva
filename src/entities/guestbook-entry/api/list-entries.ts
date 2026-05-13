import { createSupabaseServerClient } from "@/shared/api/supabase/server";
import type { GuestbookEntry } from "../model/types";

export async function listEntries(limit = 100): Promise<GuestbookEntry[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("guestbook_entries")
    .select(
      "id, author_id, body, created_at, author:profiles!guestbook_entries_author_id_fkey(display_name, email)",
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[listEntries]", error);
    return [];
  }
  return (data ?? []).map((row) => ({
    id: row.id,
    author_id: row.author_id,
    body: row.body,
    created_at: row.created_at,
    author: Array.isArray(row.author)
      ? (row.author[0] ?? { display_name: "(알 수 없음)", email: "" })
      : (row.author ?? { display_name: "(알 수 없음)", email: "" }),
  }));
}
