"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { LoadingButton } from "@/shared/ui/loading-button";
import { PasswordInput } from "@/shared/ui/password-input";
import { signupAction, type SignupState } from "../api/actions";

export function SignupForm() {
  const [state, formAction] = useActionState<SignupState, FormData>(
    signupAction,
    undefined,
  );

  return (
    <form action={formAction} className="grid gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="signup-name">표시 이름</Label>
        <Input
          id="signup-name"
          name="display_name"
          required
          maxLength={40}
          autoComplete="nickname"
          placeholder="방명록에 보일 이름"
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="signup-email">이메일</Label>
        <Input
          id="signup-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="signup-password">비밀번호</Label>
        <PasswordInput
          id="signup-password"
          name="password"
          required
          minLength={6}
          autoComplete="new-password"
          placeholder="6자 이상"
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="signup-confirm">비밀번호 다시 입력</Label>
        <PasswordInput
          id="signup-confirm"
          name="confirm"
          required
          minLength={6}
          autoComplete="new-password"
          placeholder="같은 비밀번호를 한 번 더"
        />
      </div>
      {state?.error ? (
        <p
          role="alert"
          className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {state.error}
        </p>
      ) : null}
      <LoadingButton className="mt-2 w-full" pendingLabel="가입 중...">
        가입하고 시작하기
      </LoadingButton>
      <p className="text-center text-sm text-muted-foreground">
        이미 계정이 있나요?{" "}
        <Link href="/login" className="text-foreground underline-offset-4 hover:underline">
          로그인
        </Link>
      </p>
    </form>
  );
}
