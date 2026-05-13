"use client";

import Link from "next/link";
import { Pencil } from "lucide-react";
import { PostCard, usePosts } from "@/entities/post";
import { SearchBar, TagFilter, useBlogFilters } from "@/features/blog-filters";
import { Skeleton } from "@/shared/ui/skeleton";
import { buttonVariants } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

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
