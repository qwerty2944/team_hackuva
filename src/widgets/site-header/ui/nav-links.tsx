"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/shared/config";
import { cn } from "@/shared/lib/utils";

export function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {siteConfig.nav.map((item) => {
        const active =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm transition-colors",
              active
                ? "bg-secondary text-secondary-foreground"
                : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}
