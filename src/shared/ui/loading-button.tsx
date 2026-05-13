"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";
import { Spinner } from "./spinner";
import { cn } from "@/shared/lib/utils";
import type { ComponentProps, ReactNode } from "react";

export function LoadingButton({
  children,
  pendingLabel,
  className,
  ...props
}: ComponentProps<typeof Button> & {
  pendingLabel?: ReactNode;
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      type={props.type ?? "submit"}
      aria-busy={pending || undefined}
      disabled={pending || props.disabled}
      className={cn("relative", className)}
      {...props}
    >
      {pending ? (
        <>
          <Spinner size="sm" className="mr-2" />
          {pendingLabel ?? children}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
