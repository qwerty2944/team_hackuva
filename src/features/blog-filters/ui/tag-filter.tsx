"use client";

import { Badge } from "@/shared/ui/badge";
import { cn } from "@/shared/lib/utils";
import { useBlogFilters } from "../model/store";

export function TagFilter({ tags }: { tags: string[] }) {
  const { selectedTag, setSelectedTag } = useBlogFilters();

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <button
        type="button"
        onClick={() => setSelectedTag("")}
        className={cn(
          "rounded-md border px-2.5 py-1 text-xs transition-colors",
          selectedTag === ""
            ? "border-foreground bg-foreground text-background"
            : "border-border/60 text-muted-foreground hover:text-foreground",
        )}
      >
        전체
      </button>
      {tags.map((tag) => {
        const active = selectedTag === tag;
        return (
          <button
            key={tag}
            type="button"
            onClick={() => setSelectedTag(active ? "" : tag)}
            className="focus:outline-none"
          >
            <Badge
              variant={active ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-colors",
                !active && "hover:border-foreground/50",
              )}
            >
              {tag}
            </Badge>
          </button>
        );
      })}
    </div>
  );
}
