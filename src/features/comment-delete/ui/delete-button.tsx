"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/shared/ui/button";
import { Spinner } from "@/shared/ui/spinner";
import { deleteCommentAction } from "../api/actions";

export function DeleteCommentButton({ commentId }: { commentId: number }) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      aria-label="삭제"
      disabled={pending}
      className="h-7 gap-1 px-2 text-xs text-muted-foreground"
      onClick={() => {
        if (!confirm("이 댓글을 삭제할까요?")) return;
        startTransition(async () => {
          const res = await deleteCommentAction(commentId);
          if (!res.ok) toast.error(res.error);
        });
      }}
    >
      {pending ? <Spinner size="xs" /> : <Trash2 className="size-3" />}
      삭제
    </Button>
  );
}
