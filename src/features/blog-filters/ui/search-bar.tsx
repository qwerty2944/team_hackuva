"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { useBlogFilters } from "../model/store";

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useBlogFilters();

  return (
    <div className="relative w-full sm:max-w-sm">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="제목, 본문, 요약 검색"
        className="pl-9 pr-9"
        aria-label="포스트 검색"
      />
      {searchQuery && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 size-7 -translate-y-1/2"
          onClick={() => setSearchQuery("")}
          aria-label="검색어 지우기"
        >
          <X className="size-3.5" />
        </Button>
      )}
    </div>
  );
}
