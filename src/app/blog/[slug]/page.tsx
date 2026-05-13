import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Pencil } from "lucide-react";
import { PostBody } from "@/entities/post";
import { getPost } from "@/entities/post/server";
import { getCurrentUser } from "@/entities/user/server";
import { getProject } from "@/entities/project/server";
import { CommentThread } from "@/widgets/comment-thread";
import { LoadingOverlay } from "@/shared/ui/loading-overlay";
import { Badge } from "@/shared/ui/badge";
import { buttonVariants } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import { cn } from "@/shared/lib/utils";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const url = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      publishedTime: post.publishedAt,
      authors: [post.author.display_name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const [post, current] = await Promise.all([getPost(slug), getCurrentUser()]);
  if (!post) notFound();

  const project = post.projectSlug ? await getProject(post.projectSlug) : null;
  const isAdmin = current?.profile.role === "admin";

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex items-center justify-between gap-2">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          블로그 전체
        </Link>
        {isAdmin && (
          <Link
            href={`/blog/${post.slug}/edit`}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "gap-1.5",
            )}
          >
            <Pencil className="size-3.5" /> 수정
          </Link>
        )}
      </div>

      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span>{formatDate(post.publishedAt)}</span>
          <span aria-hidden>·</span>
          <Clock className="size-3" />
          <span>{post.readingMinutes}분 읽기</span>
          <span aria-hidden>·</span>
          <span>{post.author.display_name}</span>
        </div>
        <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        <p className="text-lg text-muted-foreground">{post.excerpt}</p>
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((t) => (
            <Badge key={t} variant="secondary" className="font-normal">
              {t}
            </Badge>
          ))}
        </div>
        {project && (
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-card/40 px-3 py-2 text-sm transition-colors hover:border-foreground/30"
          >
            <span className="text-muted-foreground">관련 프로젝트</span>
            <span className="font-medium">{project.name}</span>
          </Link>
        )}
      </header>

      <Separator className="my-10" />

      <PostBody markdown={post.body} />

      <Separator className="my-10" />

      <Suspense fallback={<LoadingOverlay label="댓글 불러오는 중" />}>
        <CommentThread postSlug={post.slug} />
      </Suspense>
    </div>
  );
}
