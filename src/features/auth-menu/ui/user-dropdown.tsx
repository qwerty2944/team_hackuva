"use client";

import Link from "next/link";
import { UserCog } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Badge } from "@/shared/ui/badge";
import { UserAvatar, type UserRole } from "@/entities/user";
import { LogoutMenuItem } from "@/features/auth-logout";

export function UserDropdown({
  displayName,
  email,
  role,
}: {
  displayName: string;
  email: string;
  role: UserRole;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label="내 계정 메뉴"
            className="flex items-center gap-2 rounded-full p-0.5 outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring"
          />
        }
      >
        <div className="relative">
          <UserAvatar name={displayName} className="size-8" />
          {role === "admin" && (
            <span
              aria-hidden
              className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border border-background bg-foreground"
            />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="grid gap-1">
          <div className="flex items-center gap-2">
            <span className="truncate text-sm font-medium">{displayName}</span>
            <Badge
              variant={role === "admin" ? "default" : "secondary"}
              className="px-1.5 py-0 text-[10px] font-normal"
            >
              {role === "admin" ? "관리자" : "회원"}
            </Badge>
          </div>
          <span className="truncate text-xs font-normal text-muted-foreground">
            {email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem render={<Link href="/account" />}>
          <UserCog className="mr-2 size-4" />내 계정
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <LogoutMenuItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
