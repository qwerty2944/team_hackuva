import type { Metadata } from "next";
import { siteConfig } from "@/shared/config";
import { listProjects } from "@/entities/project/server";
import { Separator } from "@/shared/ui/separator";
import { Badge } from "@/shared/ui/badge";
import { buttonVariants } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

export const metadata: Metadata = {
  title: "소개",
  description: "qwerty2944(최재영)가 누구인지, 무엇을 만드는지.",
};

const SKILL_GROUPS: { label: string; items: string[] }[] = [
  { label: "앱 (크로스플랫폼)", items: ["Flutter", "Dart", "Riverpod", "Electron"] },
  {
    label: "웹 프론트",
    items: ["Next.js", "React", "TypeScript", "React Query", "Zustand", "Tailwind CSS"],
  },
  { label: "백엔드", items: ["NestJS", "Supabase", "Node.js", "PostgreSQL"] },
  { label: "인프라 · DevOps", items: ["AWS", "Vercel", "Firebase"] },
  { label: "AI · 시선추적", items: ["RAG (pgvector)", "Claude", "Gemini", "eyedid / SeeSo", "WebGL"] },
];

export default async function AboutPage() {
  const projects = await listProjects();
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <header className="space-y-4">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">
          About
        </p>
        <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          qwerty2944.
        </h1>
        <p className="text-lg text-muted-foreground">
          웹과 크로스플랫폼 앱을 만드는 개발자 최재영입니다. 아이디어를 라이브
          서비스로 끝까지 끌고 가보는 걸 좋아합니다.
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
        <h2 className="text-xl font-semibold tracking-tight">제가 믿는 것</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>· 앱(Flutter)·웹(Next.js)·백엔드(NestJS·Supabase)를 한 사람이 끝까지.</li>
          <li>· 아이디어 → 데모 → 라이브를 며칠·몇 주 안에. (Claude·Cursor로 고속 개발)</li>
          <li>· 시선추적·AI/RAG처럼 어려운 걸 실제 쓰는 제품으로.</li>
          <li>· 외주든 사이드든, 한 명에게 진짜 쓸 만한 걸 만든다.</li>
        </ul>
      </section>

      <Separator className="my-10" />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">기술 스택</h2>
        <dl className="space-y-3">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.label}
              className="flex flex-col gap-1.5 sm:flex-row sm:gap-4"
            >
              <dt className="w-36 shrink-0 pt-0.5 text-sm text-muted-foreground">
                {group.label}
              </dt>
              <dd className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <Badge key={item} variant="secondary">
                    {item}
                  </Badge>
                ))}
              </dd>
            </div>
          ))}
        </dl>
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
              {p.url ? (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  라이브 ↗
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
