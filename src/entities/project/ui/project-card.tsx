import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { cn } from "@/shared/lib/utils";
import type { Project, ProjectStatus } from "../model/types";

const statusLabel: Record<ProjectStatus, string> = {
  live: "Live",
  beta: "Beta",
  wip: "WIP",
};

const roleClass: Record<string, string> = {
  앱: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-300",
  "웹 프론트": "bg-sky-500/15 text-sky-600 dark:text-sky-300",
  백엔드: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
};

export function RoleBadges({ roles }: { roles: string[] }) {
  if (roles.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {roles.map((r) => (
        <span
          key={r}
          className={cn(
            "rounded px-1.5 py-0.5 text-[11px] font-medium",
            roleClass[r] ?? "bg-muted text-muted-foreground",
          )}
        >
          {r}
        </span>
      ))}
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden border-border/60 transition-all hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-lg",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60",
          project.accent,
        )}
      />
      {project.imageUrl && (
        <div className="relative aspect-video overflow-hidden border-b border-border/60 bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.imageUrl}
            alt={`${project.name} 미리보기`}
            loading="lazy"
            className="size-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
          />
          {project.videoUrl && (
            <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur">
              <Play className="size-3 fill-current" /> 시연영상
            </span>
          )}
        </div>
      )}
      <CardHeader className="relative">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <CardTitle className="text-xl tracking-tight">
              {project.name}
            </CardTitle>
            <CardDescription>{project.tagline}</CardDescription>
          </div>
          <Badge variant="secondary" className="shrink-0 uppercase">
            {statusLabel[project.status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="relative space-y-4">
        <RoleBadges roles={project.roles} />
        <p className="text-sm text-muted-foreground">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <Badge key={s} variant="outline" className="bg-background/40">
              {s}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-3 pt-2 text-sm">
          <Link
            href={`/projects/${project.slug}`}
            className="font-medium underline-offset-4 hover:underline"
          >
            자세히 보기
          </Link>
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            라이브
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
