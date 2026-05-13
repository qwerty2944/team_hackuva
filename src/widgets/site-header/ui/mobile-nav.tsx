"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { siteConfig } from "@/shared/config";
import { cn } from "@/shared/lib/utils";

export function MobileNav({
  themeSlot,
  authSlot,
}: {
  themeSlot: React.ReactNode;
  authSlot: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger
        render={
          <button
            type="button"
            aria-label="메뉴 열기"
            className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        }
      >
        <Menu className="size-5" />
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop
          className="fixed inset-0 z-50 bg-black/40 duration-150 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0"
        />
        <DialogPrimitive.Popup
          className="fixed inset-y-0 right-0 z-50 flex h-full w-72 max-w-[80vw] flex-col gap-6 border-l border-border/60 bg-background p-6 shadow-xl duration-200 data-open:animate-in data-open:slide-in-from-right data-closed:animate-out data-closed:slide-out-to-right focus:outline-none"
        >
          <DialogPrimitive.Title className="sr-only">
            메뉴
          </DialogPrimitive.Title>

          <div className="flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 font-semibold tracking-tight"
            >
              <span className="grid size-7 place-items-center rounded-md bg-gradient-to-br from-foreground to-foreground/60 text-background">
                <span className="text-[11px] font-bold">H</span>
              </span>
              <span>Team Hackuva</span>
            </Link>
            <DialogPrimitive.Close
              render={
                <button
                  type="button"
                  aria-label="메뉴 닫기"
                  className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                />
              }
            >
              <X className="size-4" />
            </DialogPrimitive.Close>
          </div>

          <nav className="flex flex-col gap-1">
            {siteConfig.nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2.5 text-sm transition-colors",
                    active
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto space-y-3 border-t border-border/60 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">테마</span>
              {themeSlot}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">계정</span>
              {authSlot}
            </div>
          </div>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
