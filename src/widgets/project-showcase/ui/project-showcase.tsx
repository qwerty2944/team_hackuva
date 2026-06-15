"use client";

import { ProjectCard, useProjects } from "@/entities/project";
import { Skeleton } from "@/shared/ui/skeleton";

export function ProjectShowcase() {
  const { data, isLoading } = useProjects();
  const items = data ?? [];

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            만든 것들
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            해마다 만든 것들. 카드를 누르면 자세히 보거나 라이브로 갑니다.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading && items.length === 0
          ? Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-64 w-full" />
            ))
          : items.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
      </div>
    </section>
  );
}
