import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/entities/user/server";
import { getProject } from "@/entities/project/server";
import { ProjectForm } from "@/features/project-compose";

export const metadata: Metadata = { title: "프로젝트 수정" };

type PageProps = { params: Promise<{ slug: string }> };

export default async function EditProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const current = await getCurrentUser();
  if (!current || current.profile.role !== "admin") {
    redirect(`/projects/${slug}`);
  }
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">프로젝트 수정</h1>
        <p className="text-sm text-muted-foreground">{project.name}</p>
      </header>
      <ProjectForm
        initial={{
          slug: project.slug,
          name: project.name,
          tagline: project.tagline,
          description: project.description,
          url: project.url,
          features: project.features,
          stack: project.stack,
          status: project.status,
          accent: project.accent,
          imageUrl: project.imageUrl,
          videoUrl: project.videoUrl,
          year: project.year,
        }}
      />
    </div>
  );
}
