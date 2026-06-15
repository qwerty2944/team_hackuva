"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { useDebouncedValue } from "@/shared/lib/use-debounced-value";
import { useBlogFilters } from "../model/store";

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useBlogFilters();

  // 입력은 로컬에서 즉시 반영(타이핑 부드럽게), 쿼리를 트리거하는 store는 디바운스.
  const [value, setValue] = useState(searchQuery);
  const debounced = useDebouncedValue(value, 300);

  useEffect(() => {
    setSearchQuery(debounced);
  }, [debounced, setSearchQuery]);

  // 외부에서 필터가 초기화되면(reset 등) 입력값도 동기화.
  useEffect(() => {
    if (searchQuery === "") setValue("");
  }, [searchQuery]);

  return (
    <div className="relative w-full sm:max-w-sm">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="제목, 본문, 요약 검색"
        className="pl-9 pr-9"
        aria-label="포스트 검색"
      />
      {value && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 size-7 -translate-y-1/2"
          onClick={() => {
            setValue("");
            setSearchQuery("");
          }}
          aria-label="검색어 지우기"
        >
          <X className="size-3.5" />
        </Button>
      )}
    </div>
  );
}
