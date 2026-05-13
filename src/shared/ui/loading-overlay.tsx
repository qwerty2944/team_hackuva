import { Spinner } from "./spinner";
import { cn } from "@/shared/lib/utils";

export function LoadingOverlay({
  className,
  label,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-[40vh] w-full items-center justify-center",
        className,
      )}
    >
      <Spinner size="xl" label={label} />
    </div>
  );
}
