import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthFormShell } from "@/widgets/auth-form-shell";
import { SignupForm } from "@/features/auth-signup";
import { getCurrentSession } from "@/shared/api/supabase/server";

export const metadata: Metadata = { title: "회원가입" };

export default async function SignupPage() {
  const session = await getCurrentSession();
  if (session) redirect("/guestbook");
  return (
    <AuthFormShell title="Team Hackuva에 오신 걸 환영해요" description="이메일 한 줄이면 바로 시작할 수 있어요.">
      <SignupForm />
    </AuthFormShell>
  );
}
