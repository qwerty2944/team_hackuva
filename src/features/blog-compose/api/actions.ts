"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/shared/api/supabase/server";
import { getCurrentUser } from "@/entities/user/server";
import { slugify, uniqueSlug } from "@/shared/lib/slugify";

export type BlogComposeState =
  | { ok: true; slug: string }
  | { ok: false; error: string }
  | undefined;

function readingMinutes(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function parseTags(raw: string): string[] {
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 10);
}

export async function savePostAction(
  _prev: BlogComposeState,
  formData: FormData,
): Promise<BlogComposeState> {
  const current = await getCurrentUser();
  if (!current || current.profile.role !== "admin") {
    return { ok: false, error: "관리자만 글을 작성할 수 있습니다." };
  }

  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const tagsRaw = String(formData.get("tags") ?? "");
  const projectSlugRaw = String(formData.get("project_slug") ?? "").trim();
  const existingSlug = String(formData.get("slug") ?? "").trim();

  if (!title || !excerpt || !body) {
    return { ok: false, error: "제목, 요약, 본문은 필수입니다." };
  }
  if (title.length > 200) {
    return { ok: false, error: "제목은 200자 이하로 입력해 주세요." };
  }
  if (excerpt.length > 500) {
    return { ok: false, error: "요약은 500자 이하로 입력해 주세요." };
  }

  const supabase = await createSupabaseServerClient();
  const tags = parseTags(tagsRaw);
  const project_slug = projectSlugRaw || null;
  const reading_minutes = readingMinutes(body);

  if (existingSlug) {
    const { error } = await supabase
      .from("blog_posts")
      .update({ title, excerpt, body, tags, project_slug, reading_minutes })
      .eq("slug", existingSlug);
    if (error) return { ok: false, error: error.message };
    revalidatePath("/blog");
    revalidatePath(`/blog/${existingSlug}`);
    redirect(`/blog/${existingSlug}`);
  }

  const slug = await uniqueSlug(slugify(title), async (candidate) => {
    const { data } = await supabase
      .from("blog_posts")
      .select("slug")
      .eq("slug", candidate)
      .maybeSingle();
    return Boolean(data);
  });

  const { error } = await supabase.from("blog_posts").insert({
    slug,
    title,
    excerpt,
    body,
    author_id: current.profile.id,
    tags,
    project_slug,
    reading_minutes,
  });
  if (error) return { ok: false, error: error.message };

  revalidatePath("/blog");
  redirect(`/blog/${slug}`);
}

export async function deletePostAction(slug: string) {
  const current = await getCurrentUser();
  if (!current || current.profile.role !== "admin") {
    return { ok: false as const, error: "관리자 권한이 필요합니다." };
  }
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("blog_posts").delete().eq("slug", slug);
  if (error) return { ok: false as const, error: error.message };
  revalidatePath("/blog");
  redirect("/blog");
}
