import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { getPost, posts, PostBody } from "@/entities/post";
import { getProject } from "@/entities/project";
import { Badge } from "@/shared/ui/badge";
import { Separator } from "@/shared/ui/separator";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
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
  const post = getPost(slug);
  if (!post) notFound();

  const project = post.projectSlug ? getProject(post.projectSlug) : undefined;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        블로그 전체
      </Link>

      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span>{formatDate(post.publishedAt)}</span>
          <span aria-hidden>·</span>
          <Clock className="size-3" />
          <span>{post.readingMinutes}분 읽기</span>
          <span aria-hidden>·</span>
          <span>{post.author}</span>
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
    </div>
  );
}
