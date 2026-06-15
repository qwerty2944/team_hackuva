import { Suspense } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/features/toggle-theme";
import { AuthMenu } from "@/features/auth-menu";
import { Spinner } from "@/shared/ui/spinner";
import { NavLinks } from "./nav-links";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2 font-semibold tracking-tight"
        >
          <span className="grid size-7 place-items-center rounded-md bg-gradient-to-br from-foreground to-foreground/60 text-background">
            <span className="text-[11px] font-bold">Q</span>
          </span>
          <span>qwerty2944</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <NavLinks />
          <div className="ml-1">
            <ThemeToggle />
          </div>
          <div className="ml-1">
            <Suspense fallback={<Spinner size="sm" />}>
              <AuthMenu />
            </Suspense>
          </div>
        </nav>

        <div className="md:hidden">
          <MobileNav
            themeSlot={<ThemeToggle />}
            authSlot={
              <Suspense fallback={<Spinner size="sm" />}>
                <AuthMenu />
              </Suspense>
            }
          />
        </div>
      </div>
    </header>
  );
}
