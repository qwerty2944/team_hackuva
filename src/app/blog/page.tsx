import type { Metadata } from "next";
import { BlogList } from "@/widgets/blog-list";
import { allTags } from "@/entities/post/server";
import { getCurrentUser } from "@/entities/user/server";

export const metadata: Metadata = {
  title: "블로그",
  description: "qwerty2944가 만들고 배운 과정을 기록하는 곳.",
};

export default async function BlogPage() {
  const [tags, current] = await Promise.all([allTags(), getCurrentUser()]);
  const isAdmin = current?.profile.role === "admin";
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          블로그
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          제품을 어떻게 만들었는지, 어떤 결정을 했는지에 대한 짧은 기록.
        </p>
      </header>
      <BlogList tags={tags} isAdmin={isAdmin} />
    </div>
  );
}
