"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/shared/ui/button";
import { Spinner } from "@/shared/ui/spinner";
import { deleteEntryAction } from "../api/actions";

export function DeleteEntryButton({ entryId }: { entryId: number }) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-xs"
      aria-label="삭제"
      disabled={pending}
      onClick={() => {
        if (!confirm("이 글을 삭제할까요?")) return;
        startTransition(async () => {
          const res = await deleteEntryAction(entryId);
          if (!res.ok) toast.error(res.error);
        });
      }}
    >
      {pending ? <Spinner size="xs" /> : <Trash2 className="size-3.5" />}
    </Button>
  );
}
