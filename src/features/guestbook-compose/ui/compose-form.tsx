"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Textarea } from "@/shared/ui/textarea";
import { LoadingButton } from "@/shared/ui/loading-button";
import { Card } from "@/shared/ui/card";
import { UserAvatar } from "@/entities/user";
import { composeEntryAction, type ComposeState } from "../api/actions";

const MAX = 1000;

export function ComposeForm({
  displayName,
}: {
  displayName: string;
}) {
  const [state, formAction] = useActionState<ComposeState, FormData>(
    composeEntryAction,
    undefined,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (state?.ok) {
      formRef.current?.reset();
      setCount(0);
      toast.success("방명록이 등록되었습니다.");
    }
  }, [state]);

  return (
    <Card className="gap-3 border-border/60 bg-card/70 p-5 backdrop-blur">
      <form ref={formRef} action={formAction} className="grid gap-3">
        <div className="flex items-start gap-3">
          <UserAvatar name={displayName} />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">{displayName}</p>
            <p className="text-xs text-muted-foreground">
              따뜻한 한 마디를 남겨주세요
            </p>
          </div>
        </div>
        <Textarea
          name="body"
          rows={3}
          maxLength={MAX}
          required
          placeholder="방명록을 작성해 주세요..."
          onChange={(e) => setCount(e.currentTarget.value.length)}
          className="resize-none bg-background/50"
        />
        {state && !state.ok ? (
          <p
            role="alert"
            className="text-sm text-destructive"
          >
            {state.error}
          </p>
        ) : null}
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs tabular-nums text-muted-foreground">
            {count}/{MAX}
          </span>
          <LoadingButton size="sm" pendingLabel="등록 중...">
            등록
          </LoadingButton>
        </div>
      </form>
    </Card>
  );
}
