import type { Metadata } from "next";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { ProjectCard } from "@/entities/project";
import type { Project } from "@/entities/project/model/types";
import { listProjects } from "@/entities/project/server";
import { getCurrentUser } from "@/entities/user/server";
import { buttonVariants } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

export const metadata: Metadata = {
  title: "프로젝트",
  description: "qwerty2944(최재영)가 해마다 만든 프로젝트들.",
};

// listProjects()는 이미 year 내림차순 정렬 → 순서를 유지하며 연도별로 묶는다.
function groupByYear(projects: Project[]) {
  const groups: { year: number | null; items: Project[] }[] = [];
  for (const p of projects) {
    const last = groups[groups.length - 1];
    if (last && last.year === p.year) last.items.push(p);
    else groups.push({ year: p.year, items: [p] });
  }
  return groups;
}

export default async function ProjectsPage() {
  const [projects, current] = await Promise.all([
    listProjects(),
    getCurrentUser(),
  ]);
  const isAdmin = current?.profile.role === "admin";
  const groups = groupByYear(projects);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <header className="mb-12 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            프로젝트
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            해마다 만든 것들 — 외주, 사이드 프로젝트, 공모전까지.
          </p>
        </div>
        {isAdmin && (
          <Link
            href="/projects/new"
            className={cn(buttonVariants({ size: "sm" }), "gap-1.5")}
          >
            <Pencil className="size-3.5" /> 새 프로젝트
          </Link>
        )}
      </header>
      {projects.length === 0 ? (
        <p className="rounded-md border border-dashed border-border/60 p-10 text-center text-sm text-muted-foreground">
          아직 등록된 프로젝트가 없어요.
        </p>
      ) : (
        <div className="space-y-14">
          {groups.map((group) => (
            <section key={group.year ?? "etc"}>
              <div className="mb-5 flex items-baseline gap-3 border-b border-border/60 pb-2">
                <h2 className="text-2xl font-bold tracking-tight tabular-nums">
                  {group.year ?? "그 외"}
                </h2>
                <span className="text-sm text-muted-foreground">
                  {group.items.length}개
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
