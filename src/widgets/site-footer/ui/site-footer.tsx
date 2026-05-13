import Link from "next/link";
import { siteConfig } from "@/shared/config";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. 만들어보고 싶은
          것을 만듭니다.
        </p>
        <div className="flex items-center gap-4">
          <Link href="/projects" className="hover:text-foreground">
            프로젝트
          </Link>
          <Link href="/blog" className="hover:text-foreground">
            블로그
          </Link>
          <Link href="/about" className="hover:text-foreground">
            팀 소개
          </Link>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 hover:text-foreground"
            aria-label="GitHub"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
