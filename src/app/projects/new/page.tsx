import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/entities/user/server";
import { ProjectForm } from "@/features/project-compose";

export const metadata: Metadata = { title: "새 프로젝트" };

export default async function NewProjectPage() {
  const current = await getCurrentUser();
  if (!current || current.profile.role !== "admin") {
    redirect("/projects");
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">새 프로젝트</h1>
        <p className="text-sm text-muted-foreground">
          프로젝트 카드와 상세 페이지가 함께 만들어집니다.
        </p>
      </header>
      <ProjectForm />
    </div>
  );
}
