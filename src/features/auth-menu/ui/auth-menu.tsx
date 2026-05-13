import Link from "next/link";
import { getCurrentUser } from "@/entities/user/server";
import { UserDropdown } from "./user-dropdown";

export async function AuthMenu() {
  const current = await getCurrentUser();

  if (!current) {
    return (
      <Link
        href="/login"
        className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
      >
        로그인
      </Link>
    );
  }

  return (
    <UserDropdown
      displayName={current.profile.display_name}
      email={current.profile.email}
    />
  );
}
