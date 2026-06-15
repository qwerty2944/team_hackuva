"use client";

import Link from "next/link";
import { Pencil } from "lucide-react";
import { PostCard, usePosts, type Post } from "@/entities/post";
import { SearchBar, TagFilter, useBlogFilters } from "@/features/blog-filters";
import { Skeleton } from "@/shared/ui/skeleton";
import { buttonVariants } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

// 알려진 시리즈 — 순서대로, 각 글은 처음 매칭되는 시리즈에 들어간다.
const SERIES: { label: string; match: (tags: string[]) => boolean }[] = [
  { label: "Zustand 상태관리", match: (t) => t.includes("Zustand") },
  { label: "React Query", match: (t) => t.includes("React Query") },
  { label: "TypeScript", match: (t) => t.includes("TypeScript") },
];
const OTHER_LABEL = "그 외 기록";

type Group = { label: string; posts: Post[] };

function groupBySeries(posts: Post[]): Group[] {
  const buckets = new Map<string, Post[]>();
  for (const series of SERIES) buckets.set(series.label, []);
  const other: Post[] = [];

  for (const post of posts) {
    const series = SERIES.find((s) => s.match(post.tags));
    if (series) buckets.get(series.label)!.push(post);
    else other.push(post);
  }

  const byOldest = (a: Post, b: Post) =>
    a.publishedAt.localeCompare(b.publishedAt); // 1부 → 마지막 부

  const groups: Group[] = [];
  for (const series of SERIES) {
    const posts = buckets.get(series.label)!;
    if (posts.length > 0) groups.push({ label: series.label, posts: [...posts].sort(byOldest) });
  }
  if (other.length > 0) groups.push({ label: OTHER_LABEL, posts: other }); // 최신순 유지
  return groups;
}

export function BlogList({
  tags,
  isAdmin,
}: {
  tags: string[];
  isAdmin: boolean;
}) {
  const { searchQuery, selectedTag } = useBlogFilters();
  const { data, isLoading } = usePosts({ q: searchQuery, tag: selectedTag });
  const items = data ?? [];

  // 검색·태그 필터가 없을 때만 시리즈별로 묶어서 보여준다.
  const grouped = !searchQuery && !selectedTag;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar />
        <div className="flex items-center gap-2">
          <TagFilter tags={tags} />
          {isAdmin && (
            <Link
              href="/blog/new"
              className={cn(buttonVariants({ size: "sm" }), "gap-1.5")}
            >
              <Pencil className="size-3.5" /> 새 글
            </Link>
          )}
        </div>
      </div>

      {isLoading && items.length === 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-44 w-full" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-md border border-dashed border-border/60 p-10 text-center text-sm text-muted-foreground">
          조건에 맞는 글이 없어요.
        </div>
      ) : grouped ? (
        <div className="space-y-10">
          {groupBySeries(items).map((group) => (
            <section key={group.label} className="space-y-4">
              <div className="flex items-baseline gap-2 border-b border-border/60 pb-2">
                <h2 className="text-lg font-semibold tracking-tight">
                  {group.label}
                </h2>
                <span className="text-sm text-muted-foreground">
                  {group.posts.length}편
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {group.posts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
