"use client";

import { useQuery } from "@tanstack/react-query";
import { http } from "@/shared/api/http";
import type { Project } from "../model/types";

export const projectKeys = {
  all: ["projects"] as const,
};

export function useProjects() {
  return useQuery({
    queryKey: projectKeys.all,
    queryFn: async () => {
      const { data } = await http.get<{ projects: Project[] }>("/api/projects");
      return data.projects;
    },
    staleTime: 60_000,
  });
}
