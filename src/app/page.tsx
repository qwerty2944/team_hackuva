import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/widgets/hero";
import { ProjectShowcase } from "@/widgets/project-showcase";
import { PostCard } from "@/entities/post";
import { listPosts } from "@/entities/post/server";
import { buttonVariants } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

export default async function HomePage() {
  const recent = (await listPosts()).slice(0, 4);

  return (
    <>
      <Hero />
      <ProjectShowcase />
      <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              최근 글
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              만든 과정을 짧게 남겨둔 노트.
            </p>
          </div>
          <Link
            href="/blog"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            전체 보기
            <ArrowRight className="ml-1 size-3.5" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {recent.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
    </>
  );
}
