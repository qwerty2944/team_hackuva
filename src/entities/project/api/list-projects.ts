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
  image_url: string | null;
  video_url: string | null;
  year: number | null;
  roles: string[];
  ios_url: string | null;
  android_url: string | null;
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
    imageUrl: row.image_url ?? null,
    videoUrl: row.video_url ?? null,
    year: row.year ?? null,
    roles: row.roles ?? [],
    iosUrl: row.ios_url ?? null,
    androidUrl: row.android_url ?? null,
  };
}

export async function listProjects(): Promise<Project[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("projects")
    .select(
      "slug, name, tagline, description, url, features, stack, status, accent, image_url, video_url, year, roles, ios_url, android_url",
    )
    .order("year", { ascending: false, nullsFirst: false })
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
      "slug, name, tagline, description, url, features, stack, status, accent, image_url, video_url, year, roles, ios_url, android_url",
    )
    .eq("slug", slug)
    .maybeSingle();
  if (error || !data) {
    if (error) console.error("[getProject]", error);
    return null;
  }
  return mapRow(data as RawRow);
}
