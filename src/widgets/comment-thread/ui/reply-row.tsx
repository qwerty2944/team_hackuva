"use client";

import { useState } from "react";
import { Reply } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { CommentComposeForm } from "@/features/comment-compose";

export function ReplyToggle({
  postSlug,
  parentId,
}: {
  postSlug: string;
  parentId: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-7 gap-1 px-2 text-xs text-muted-foreground"
        onClick={() => setOpen((o) => !o)}
      >
        <Reply className="size-3" />
        {open ? "답글 취소" : "답글"}
      </Button>
      {open && (
        <div className="mt-2">
          <CommentComposeForm
            postSlug={postSlug}
            parentId={parentId}
            placeholder="답글을 남겨주세요…"
            pendingLabel="올리는 중..."
            submitLabel="답글 달기"
            compact
            onSuccess={() => setOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
