import { createSupabaseServerClient } from "@/shared/api/supabase/server";
import type { Project, ProjectStatus } from "../model/types";

type RawRow = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  features: string[];
  stack: string[];
  status: string;
  accent: string;
};

function asStatus(s: string): ProjectStatus {
  return s === "live" || s === "beta" ? s : "wip";
}

function mapRow(row: RawRow): Project {
  return {
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    description: row.description,
    url: row.url,
    features: row.features ?? [],
    stack: row.stack ?? [],
    status: asStatus(row.status),
    accent: row.accent,
  };
}

export async function listProjects(): Promise<Project[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("projects")
    .select(
      "slug, name, tagline, description, url, features, stack, status, accent",
    )
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) {
    console.error("[listProjects]", error);
    return [];
  }
  return ((data ?? []) as RawRow[]).map(mapRow);
}

export async function getProject(slug: string): Promise<Project | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("projects")
    .select(
      "slug, name, tagline, description, url, features, stack, status, accent",
    )
    .eq("slug", slug)
    .maybeSingle();
  if (error || !data) {
    if (error) console.error("[getProject]", error);
    return null;
  }
  return mapRow(data as RawRow);
}
