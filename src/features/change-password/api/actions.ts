"use server";

import { createSupabaseServerClient } from "@/shared/api/supabase/server";

export type ChangePasswordState =
  | { ok: true; message: string }
  | { ok: false; error: string }
  | undefined;

export async function changePasswordAction(
  _prev: ChangePasswordState,
  formData: FormData,
): Promise<ChangePasswordState> {
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (password.length < 6) {
    return { ok: false, error: "비밀번호는 최소 6자 이상이어야 합니다." };
  }
  if (password !== confirm) {
    return { ok: false, error: "비밀번호 확인이 일치하지 않습니다." };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "로그인이 필요합니다." };

  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { ok: false, error: error.message };

  return { ok: true, message: "비밀번호가 변경되었습니다." };
}
