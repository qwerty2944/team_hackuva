import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, Pencil } from "lucide-react";
import { getProject } from "@/entities/project/server";
import { PostCard } from "@/entities/post";
import { listPosts } from "@/entities/post/server";
import { getCurrentUser } from "@/entities/user/server";
import { Badge } from "@/shared/ui/badge";
import { buttonVariants } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import { Separator } from "@/shared/ui/separator";

type PageProps = { params: Promise<{ slug: string }> };

function ProjectMedia({
  videoUrl,
  imageUrl,
  url,
  name,
}: {
  videoUrl: string | null;
  imageUrl: string | null;
  url: string;
  name: string;
}) {
  if (videoUrl) {
    const frame =
      "mt-8 overflow-hidden rounded-xl border border-border/60 bg-black shadow-sm";
    // 로컬 mp4/webm 파일 → 네이티브 플레이어
    if (/\.(mp4|webm|mov)$/i.test(videoUrl)) {
      return (
        <div className={frame}>
          <video
            src={videoUrl}
            poster={imageUrl ?? undefined}
            controls
            playsInline
            preload="metadata"
            className="aspect-video w-full bg-black"
          />
        </div>
      );
    }
    const yt = videoUrl.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)/,
    );
    const drive = videoUrl.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
    const embed = yt
      ? `https://www.youtube.com/embed/${yt[1]}`
      : drive
        ? `https://drive.google.com/file/d/${drive[1]}/preview`
        : null;
    if (embed) {
      return (
        <div className={frame}>
          <iframe
            src={embed}
            title={`${name} 시연영상`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="aspect-video w-full"
          />
        </div>
      );
    }
  }
  if (imageUrl) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="mt-8 block overflow-hidden rounded-xl border border-border/60 bg-muted shadow-sm transition-shadow hover:shadow-lg"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={`${name} 화면`}
          className="w-full object-cover object-top"
        />
      </a>
    );
  }
  return null;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  const url = `/projects/${project.slug}`;
  const images = project.imageUrl ? [project.imageUrl] : undefined;
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
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.tagline,
      images,
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [project, allPosts, current] = await Promise.all([
    getProject(slug),
    listPosts(),
    getCurrentUser(),
  ]);
  if (!project) notFound();

  const related = allPosts.filter((p) => p.projectSlug === project.slug);
  const isAdmin = current?.profile.role === "admin";

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex items-center justify-between gap-2">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          프로젝트 전체
        </Link>
        {isAdmin && (
          <Link
            href={`/projects/${project.slug}/edit`}
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

      <ProjectMedia
        videoUrl={project.videoUrl}
        imageUrl={project.imageUrl}
        url={project.url}
        name={project.name}
      />

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
