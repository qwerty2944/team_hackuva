import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { getProject, projects } from "@/entities/project";
import { posts } from "@/entities/post";
import { PostCard } from "@/entities/post";
import { Badge } from "@/shared/ui/badge";
import { buttonVariants } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import { Separator } from "@/shared/ui/separator";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const url = `/projects/${project.slug}`;
  return {
    title: project.name,
    description: project.tagline,
    keywords: [project.name, ...project.stack],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: project.name,
      description: project.tagline,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.tagline,
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = posts.filter((p) => p.projectSlug === project.slug);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        프로젝트 전체
      </Link>

      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="uppercase">
            {project.status}
          </Badge>
          {project.stack.map((s) => (
            <Badge key={s} variant="outline" className="font-normal">
              {s}
            </Badge>
          ))}
        </div>
        <h1 className="text-4xl font-semibold tracking-tight">
          {project.name}
        </h1>
        <p className="text-lg text-muted-foreground">{project.tagline}</p>
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className={cn(buttonVariants())}
        >
          라이브 서비스 열기
          <ArrowUpRight className="ml-1.5 size-4" />
        </a>
      </header>

      <Separator className="my-10" />

      <section className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">소개</h2>
        <p className="text-muted-foreground">{project.description}</p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">기능</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {project.features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2 rounded-md border border-border/60 bg-card/40 p-3 text-sm"
            >
              <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </section>

      {related.length > 0 && (
        <>
          <Separator className="my-10" />
          <section className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">관련 글</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
