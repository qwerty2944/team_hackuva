import type { Metadata } from "next";
import { siteConfig } from "@/shared/config";
import { projects } from "@/entities/project";
import { Separator } from "@/shared/ui/separator";
import { buttonVariants } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

export const metadata: Metadata = {
  title: "팀 소개",
  description: "Team Hackuva가 누구인지, 무엇을 만드는지.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <header className="space-y-4">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">
          About
        </p>
        <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Team Hackuva.
        </h1>
        <p className="text-lg text-muted-foreground">
          저희는 해커톤에서 만난 작은 팀이고, 아이디어를 라이브 서비스로
          끝까지 끌고 가보는 걸 좋아합니다.
        </p>
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noreferrer"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          GitHub에서 보기 ↗
        </a>
      </header>

      <Separator className="my-10" />

      <section className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">우리가 믿는 것</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>· 데모는 며칠, 라이브는 몇 주 안에.</li>
          <li>· 사용자 한 명에게 진짜로 쓸 만한 걸 만든다.</li>
          <li>· UI는 절제, 기능은 또렷하게.</li>
        </ul>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">지금까지 만든 것</h2>
        <ul className="space-y-2">
          {projects.map((p) => (
            <li
              key={p.slug}
              className="flex items-baseline justify-between gap-4 border-b border-border/60 py-3 last:border-b-0"
            >
              <div>
                <p className="font-medium">{p.name}</p>
                <p className="text-sm text-muted-foreground">{p.tagline}</p>
              </div>
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                라이브 ↗
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
