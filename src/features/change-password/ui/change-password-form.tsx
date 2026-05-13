"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Label } from "@/shared/ui/label";
import { LoadingButton } from "@/shared/ui/loading-button";
import { PasswordInput } from "@/shared/ui/password-input";
import {
  changePasswordAction,
  type ChangePasswordState,
} from "../api/actions";

export function ChangePasswordForm() {
  const [state, formAction] = useActionState<ChangePasswordState, FormData>(
    changePasswordAction,
    undefined,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.ok) {
      toast.success(state.message);
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="grid gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="new-password">새 비밀번호</Label>
        <PasswordInput
          id="new-password"
          name="password"
          required
          minLength={6}
          autoComplete="new-password"
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="confirm-password">새 비밀번호 확인</Label>
        <PasswordInput
          id="confirm-password"
          name="confirm"
          required
          minLength={6}
          autoComplete="new-password"
        />
      </div>
      {state && !state.ok ? (
        <p
          role="alert"
          className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {state.error}
        </p>
      ) : null}
      <LoadingButton className="mt-1 w-full" pendingLabel="변경 중...">
        비밀번호 변경
      </LoadingButton>
    </form>
  );
}
