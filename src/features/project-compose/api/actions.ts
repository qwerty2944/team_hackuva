"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/shared/api/supabase/server";
import { getCurrentUser } from "@/entities/user/server";
import { slugify, uniqueSlug } from "@/shared/lib/slugify";

export type ProjectComposeState =
  | { ok: true; slug: string }
  | { ok: false; error: string }
  | undefined;

function parseLines(raw: string, max = 40): string[] {
  return raw
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, max);
}

function parseCsv(raw: string, max = 20): string[] {
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, max);
}

function normaliseStatus(input: string): "live" | "beta" | "wip" {
  return input === "live" || input === "beta" ? input : "wip";
}

export async function saveProjectAction(
  _prev: ProjectComposeState,
  formData: FormData,
): Promise<ProjectComposeState> {
  const current = await getCurrentUser();
  if (!current || current.profile.role !== "admin") {
    return { ok: false, error: "관리자만 프로젝트를 등록할 수 있습니다." };
  }

  const existingSlug = String(formData.get("slug") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const tagline = String(formData.get("tagline") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();
  const features = parseLines(String(formData.get("features") ?? ""));
  const stack = parseCsv(String(formData.get("stack") ?? ""));
  const status = normaliseStatus(String(formData.get("status") ?? "wip"));
  const accent =
    String(formData.get("accent") ?? "").trim() ||
    "from-zinc-500/20 to-zinc-700/10";
  const imageUrl = String(formData.get("imageUrl") ?? "").trim() || null;
  const videoUrl = String(formData.get("videoUrl") ?? "").trim() || null;
  const yearRaw = String(formData.get("year") ?? "").trim();
  const year = yearRaw ? Number(yearRaw) : null;
  const roles = formData
    .getAll("roles")
    .map((r) => String(r).trim())
    .filter(Boolean);

  if (!name || !tagline || !description || !url) {
    return { ok: false, error: "이름, 태그라인, 소개, 라이브 URL은 필수입니다." };
  }
  if (!/^https?:\/\//i.test(url)) {
    return { ok: false, error: "URL은 http(s)로 시작해야 합니다." };
  }

  const supabase = await createSupabaseServerClient();

  if (existingSlug) {
    const { error } = await supabase
      .from("projects")
      .update({
        name,
        tagline,
        description,
        url,
        features,
        stack,
        status,
        accent,
        image_url: imageUrl,
        video_url: videoUrl,
        year,
        roles,
      })
      .eq("slug", existingSlug);
    if (error) return { ok: false, error: error.message };
    revalidatePath("/projects");
    revalidatePath(`/projects/${existingSlug}`);
    revalidatePath("/about");
    revalidatePath("/");
    redirect(`/projects/${existingSlug}`);
  }

  const slug = await uniqueSlug(slugify(name), async (candidate) => {
    const { data } = await supabase
      .from("projects")
      .select("slug")
      .eq("slug", candidate)
      .maybeSingle();
    return Boolean(data);
  });

  const { error } = await supabase.from("projects").insert({
    slug,
    name,
    tagline,
    description,
    url,
    features,
    stack,
    status,
    accent,
    image_url: imageUrl,
    video_url: videoUrl,
    year,
    roles,
    author_id: current.profile.id,
  });
  if (error) return { ok: false, error: error.message };

  revalidatePath("/projects");
  revalidatePath("/about");
  revalidatePath("/");
  redirect(`/projects/${slug}`);
}

export async function deleteProjectAction(slug: string) {
  const current = await getCurrentUser();
  if (!current || current.profile.role !== "admin") {
    return { ok: false as const, error: "관리자 권한이 필요합니다." };
  }
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("projects").delete().eq("slug", slug);
  if (error) return { ok: false as const, error: error.message };
  revalidatePath("/projects");
  revalidatePath("/about");
  revalidatePath("/");
  redirect("/projects");
}
