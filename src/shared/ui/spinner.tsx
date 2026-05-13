import { Loader2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const sizes = {
  xs: "size-3",
  sm: "size-4",
  md: "size-5",
  lg: "size-7",
  xl: "size-10",
} as const;

export function Spinner({
  size = "md",
  className,
  label = "로딩 중",
}: {
  size?: keyof typeof sizes;
  className?: string;
  label?: string;
}) {
  return (
    <span
      role="status"
      aria-live="polite"
      aria-label={label}
      className={cn("inline-flex items-center justify-center", className)}
    >
      <Loader2
        className={cn(sizes[size], "animate-spin text-muted-foreground")}
        aria-hidden
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}
