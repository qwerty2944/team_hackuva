import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,theme(colors.foreground/8%),transparent_60%)]"
      />
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs text-muted-foreground">
          <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
          작은 팀, 라이브 서비스 세 개
        </p>
        <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
          We are <span className="text-muted-foreground/80">Team</span>{" "}
          <span className="bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
            Hackuva.
          </span>
        </h1>
        <p className="mt-5 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg">
          해커톤에서 시작한 아이디어를 라이브 서비스로 끝까지 밀어보는 팀입니다.
          진료를 정리해주는 AI, 보드게임 매칭, 단톡방 시맨틱 검색 — 만든 것과
          만드는 중인 것을 여기에 기록합니다.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/projects"
            className={cn(buttonVariants({ size: "lg" }))}
          >
            프로젝트 보기
            <ArrowRight className="ml-1.5 size-4" />
          </Link>
          <Link
            href="/blog"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            블로그 읽기
          </Link>
        </div>
      </div>
    </section>
  );
}
