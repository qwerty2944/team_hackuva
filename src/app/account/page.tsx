import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthFormShell } from "@/widgets/auth-form-shell";
import { ChangePasswordForm } from "@/features/change-password";
import { UserAvatar } from "@/entities/user";
import { getCurrentSession } from "@/shared/api/supabase/server";

export const metadata: Metadata = { title: "내 계정" };

export default async function AccountPage() {
  const session = await getCurrentSession();
  if (!session) redirect("/login?next=/account");

  return (
    <AuthFormShell title="내 계정" description="비밀번호를 변경할 수 있어요.">
      <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-background/50 p-3">
        <UserAvatar name={session.profile.display_name} />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">
            {session.profile.display_name}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {session.profile.email}
          </p>
        </div>
      </div>
      <ChangePasswordForm />
    </AuthFormShell>
  );
}
