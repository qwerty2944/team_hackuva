import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/entities/user/server";
import { getPost } from "@/entities/post/server";
import { projects } from "@/entities/project";
import { PostForm } from "@/features/blog-compose";

export const metadata: Metadata = { title: "글 수정" };

type PageProps = { params: Promise<{ slug: string }> };

export default async function EditPostPage({ params }: PageProps) {
  const { slug } = await params;
  const current = await getCurrentUser();
  if (!current || current.profile.role !== "admin") {
    redirect(`/blog/${slug}`);
  }
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">글 수정</h1>
        <p className="text-sm text-muted-foreground">{post.title}</p>
      </header>
      <PostForm
        initial={{
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          body: post.body,
          tags: post.tags,
          projectSlug: post.projectSlug,
        }}
        projects={projects.map((p) => ({ slug: p.slug, name: p.name }))}
      />
    </div>
  );
}
