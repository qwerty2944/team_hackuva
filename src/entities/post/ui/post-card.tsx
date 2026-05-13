import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import type { Post } from "../model/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <Card className="h-full border-border/60 transition-colors hover:border-foreground/30">
        <CardHeader>
          <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>{formatDate(post.publishedAt)}</span>
            <span aria-hidden>·</span>
            <Clock className="size-3" />
            <span>{post.readingMinutes}분 읽기</span>
          </div>
          <CardTitle className="text-lg leading-snug tracking-tight transition-colors group-hover:text-foreground/90">
            {post.title}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {post.excerpt}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-end justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((t) => (
              <Badge key={t} variant="secondary" className="font-normal">
                {t}
              </Badge>
            ))}
          </div>
          <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
        </CardContent>
      </Card>
    </Link>
  );
}
