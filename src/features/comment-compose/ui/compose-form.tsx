"use client";

import { useActionState, useEffect, useRef } from "react";
import { Textarea } from "@/shared/ui/textarea";
import { LoadingButton } from "@/shared/ui/loading-button";
import {
  composeCommentAction,
  type CommentComposeState,
} from "../api/actions";

export function CommentComposeForm({
  postSlug,
  parentId,
  placeholder = "댓글을 남겨주세요…",
  pendingLabel = "올리는 중...",
  submitLabel = "댓글 달기",
  compact = false,
  onSuccess,
}: {
  postSlug: string;
  parentId?: number;
  placeholder?: string;
  pendingLabel?: string;
  submitLabel?: string;
  compact?: boolean;
  onSuccess?: () => void;
}) {
  const [state, formAction] = useActionState<CommentComposeState, FormData>(
    composeCommentAction,
    undefined,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.ok) {
      formRef.current?.reset();
      onSuccess?.();
    }
  }, [state, onSuccess]);

  return (
    <form ref={formRef} action={formAction} className="grid gap-2">
      <input type="hidden" name="post_slug" value={postSlug} />
      {parentId != null && (
        <input type="hidden" name="parent_id" value={String(parentId)} />
      )}
      <Textarea
        name="body"
        required
        maxLength={1000}
        rows={compact ? 2 : 3}
        placeholder={placeholder}
      />
      {state && !state.ok ? (
        <p
          role="alert"
          className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive"
        >
          {state.error}
        </p>
      ) : null}
      <LoadingButton
        pendingLabel={pendingLabel}
        size="sm"
        className="justify-self-start"
      >
        {submitLabel}
      </LoadingButton>
    </form>
  );
}
