"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { http } from "@/shared/api/http";
import type { Post } from "../model/types";

export const postKeys = {
  all: ["posts"] as const,
  list: (params: { q?: string; tag?: string }) =>
    ["posts", "list", params] as const,
  detail: (slug: string) => ["posts", "detail", slug] as const,
};

export function usePosts(params: { q?: string; tag?: string } = {}) {
  const { q = "", tag = "" } = params;
  return useQuery({
    queryKey: postKeys.list({ q, tag }),
    queryFn: async () => {
      const { data } = await http.get<{ posts: Post[] }>("/api/posts", {
        params: { q: q || undefined, tag: tag || undefined },
      });
      return data.posts;
    },
    staleTime: 30_000,
    // 태그·검색을 바꿔도 이전 목록을 유지 → 스켈레톤으로 붕괴(레이아웃 시프트) 방지
    placeholderData: keepPreviousData,
  });
}
