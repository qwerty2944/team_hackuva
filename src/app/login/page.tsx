import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthFormShell } from "@/widgets/auth-form-shell";
import { LoginForm } from "@/features/auth-login";
import { getCurrentSession } from "@/shared/api/supabase/server";

export const metadata: Metadata = { title: "로그인" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const session = await getCurrentSession();
  const params = await searchParams;
  if (session) redirect(params.next || "/guestbook");
  return (
    <AuthFormShell title="다시 만나서 반가워요" description="이메일과 비밀번호로 로그인하세요.">
      <LoginForm next={params.next} />
    </AuthFormShell>
  );
}
