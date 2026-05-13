import type { Metadata } from "next";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { ProjectCard } from "@/entities/project";
import { listProjects } from "@/entities/project/server";
import { getCurrentUser } from "@/entities/user/server";
import { buttonVariants } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

export const metadata: Metadata = {
  title: "프로젝트",
  description: "Team Hackuva가 만든 라이브 서비스들.",
};

export default async function ProjectsPage() {
  const [projects, current] = await Promise.all([
    listProjects(),
    getCurrentUser(),
  ]);
  const isAdmin = current?.profile.role === "admin";

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <header className="mb-10 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            프로젝트
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            해커톤 프로토타입에서 시작해 라이브로 운영 중인 서비스들.
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
