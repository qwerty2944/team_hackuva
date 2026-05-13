import type { Metadata } from "next";
import { ProjectCard, projects } from "@/entities/project";

export const metadata: Metadata = {
  title: "프로젝트",
  description: "Team Hackuva가 만든 라이브 서비스들.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          프로젝트
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          해커톤 프로토타입에서 시작해 라이브로 운영 중인 서비스 세 개.
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
