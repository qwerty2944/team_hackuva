export function slugify(input: string): string {
  const base = input
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return base || "post";
}

export async function uniqueSlug(
  base: string,
  exists: (candidate: string) => Promise<boolean>,
): Promise<string> {
  const seed = slugify(base);
  if (!(await exists(seed))) return seed;
  for (let i = 2; i < 1000; i++) {
    const candidate = `${seed}-${i}`;
    if (!(await exists(candidate))) return candidate;
  }
  return `${seed}-${Date.now()}`;
}
