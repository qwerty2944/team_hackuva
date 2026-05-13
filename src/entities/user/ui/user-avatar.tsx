import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { cn } from "@/shared/lib/utils";

const PALETTE = [
  "from-rose-500/80 to-fuchsia-500/80",
  "from-sky-500/80 to-indigo-500/80",
  "from-emerald-500/80 to-teal-500/80",
  "from-amber-500/80 to-orange-500/80",
  "from-violet-500/80 to-purple-500/80",
];

function hashIndex(seed: string, mod: number) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h % mod;
}

export function UserAvatar({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const initial = (name?.trim()[0] ?? "?").toUpperCase();
  const gradient = PALETTE[hashIndex(name || initial, PALETTE.length)];

  return (
    <Avatar className={cn("size-9", className)}>
      <AvatarFallback
        className={cn(
          "bg-gradient-to-br text-sm font-semibold text-white",
          gradient,
        )}
      >
        {initial}
      </AvatarFallback>
    </Avatar>
  );
}
