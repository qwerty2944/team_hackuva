"use client";

import { LogOut } from "lucide-react";
import { useTransition } from "react";
import { DropdownMenuItem } from "@/shared/ui/dropdown-menu";
import { logoutAction } from "../api/actions";

export function LogoutMenuItem() {
  const [pending, startTransition] = useTransition();

  return (
    <DropdownMenuItem
      disabled={pending}
      onClick={(e) => {
        e.preventDefault();
        startTransition(() => {
          void logoutAction();
        });
      }}
      variant="destructive"
    >
      <LogOut className="mr-2 size-4" />
      {pending ? "로그아웃 중..." : "로그아웃"}
    </DropdownMenuItem>
  );
}
