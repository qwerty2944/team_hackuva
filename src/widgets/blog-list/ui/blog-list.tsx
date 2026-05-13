"use client";

import { useMemo } from "react";
import { PostCard, usePosts, posts as seed, allTags } from "@/entities/post";
import { SearchBar, TagFilter, useBlogFilters } from "@/features/blog-filters";
import { Skeleton } from "@/shared/ui/skeleton";

export function BlogList() {
  const { searchQuery, selectedTag } = useBlogFilters();
  const { data, isLoading, isError } = usePosts({
    q: searchQuery,
    tag: selectedTag,
  });
  const tags = useMemo(() => allTags(), []);
  const items = data ?? (isError ? seed : []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar />
        <TagFilter tags={tags} />
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
