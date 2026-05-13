"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/shared/api/supabase/server";

export type LoginState = { error?: string } | undefined;

const SAFE_REDIRECT = /^\/(?!\/)/;

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const nextParam = String(formData.get("next") ?? "");

  if (!email || !password) {
    return { error: "이메일과 비밀번호를 입력해 주세요." };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "이메일 또는 비밀번호가 올바르지 않습니다." };
  }

  const base = SAFE_REDIRECT.test(nextParam) ? nextParam : "/guestbook";
  const target = base.includes("?") ? `${base}&welcome=1` : `${base}?welcome=1`;
  revalidatePath("/", "layout");
  redirect(target);
}
