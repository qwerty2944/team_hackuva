import { getCurrentSession } from "@/shared/api/supabase/server";
import type { CurrentUser } from "../model/types";

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const session = await getCurrentSession();
  if (!session) return null;
  return {
    user: { id: session.user.id, email: session.user.email },
    profile: session.profile,
  };
}
