import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/entities/user/server";
import { projects } from "@/entities/project";
import { PostForm } from "@/features/blog-compose";

export const metadata: Metadata = { title: "새 글" };

export default async function NewPostPage() {
  const current = await getCurrentUser();
  if (!current || current.profile.role !== "admin") {
    redirect("/blog");
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">새 글</h1>
        <p className="text-sm text-muted-foreground">
          Markdown으로 본문을 작성하면 글 페이지에서 동일한 스타일로 렌더링됩니다.
        </p>
      </header>
      <PostForm
        projects={projects.map((p) => ({ slug: p.slug, name: p.name }))}
      />
    </div>
  );
}
