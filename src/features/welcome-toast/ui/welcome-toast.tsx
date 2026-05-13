"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import type { UserRole } from "@/entities/user";

export function WelcomeToast({
  displayName,
  role,
}: {
  displayName: string;
  role: UserRole;
}) {
  const params = useSearchParams();
  const router = useRouter();
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    if (params.get("welcome") !== "1") return;
    firedRef.current = true;

    const label = role === "admin" ? "관리자" : "회원";
    toast.success(`환영합니다, ${displayName} ${label}님`, {
      description:
        role === "admin"
          ? "글 작성/수정 권한이 있습니다."
          : "댓글로 글에 의견을 남길 수 있어요.",
    });

    const next = new URLSearchParams(params);
    next.delete("welcome");
    const qs = next.toString();
    router.replace(qs ? `?${qs}` : "?", { scroll: false });
  }, [params, role, displayName, router]);

  return null;
}
