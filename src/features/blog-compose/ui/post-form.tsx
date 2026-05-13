"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";
import { MarkdownEditor } from "@/shared/ui/markdown-editor";
import { LoadingButton } from "@/shared/ui/loading-button";
import { savePostAction, type BlogComposeState } from "../api/actions";

type Project = { slug: string; name: string };

export function PostForm({
  initial,
  projects,
}: {
  initial?: {
    slug: string;
    title: string;
    excerpt: string;
    body: string;
    tags: string[];
    projectSlug?: string;
  };
  projects: Project[];
}) {
  const [state, formAction] = useActionState<BlogComposeState, FormData>(
    savePostAction,
    undefined,
  );
  const [tags, setTags] = useState((initial?.tags ?? []).join(", "));

  return (
    <form action={formAction} className="grid gap-5">
      {initial?.slug && (
        <input type="hidden" name="slug" value={initial.slug} />
      )}
      <div className="grid gap-1.5">
        <Label htmlFor="post-title">제목</Label>
        <Input
          id="post-title"
          name="title"
          required
          maxLength={200}
          defaultValue={initial?.title}
          placeholder="글 제목"
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="post-excerpt">요약</Label>
        <Textarea
          id="post-excerpt"
          name="excerpt"
          required
          maxLength={500}
          rows={2}
          defaultValue={initial?.excerpt}
          placeholder="목록에 보일 한 줄 요약"
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="post-tags">태그 (쉼표로 구분)</Label>
        <Input
          id="post-tags"
          name="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="예: AI, 케이스스터디"
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="post-project">관련 프로젝트</Label>
        <select
          id="post-project"
          name="project_slug"
          defaultValue={initial?.projectSlug ?? ""}
          className="h-9 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <option value="">(없음)</option>
          {projects.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-1.5">
        <Label>본문 (Markdown)</Label>
        <MarkdownEditor name="body" defaultValue={initial?.body ?? ""} />
      </div>
      {state && !state.ok ? (
        <p
          role="alert"
          className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {state.error}
        </p>
      ) : null}
      <SubmitButton editing={Boolean(initial?.slug)} />
    </form>
  );
}

function SubmitButton({ editing }: { editing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <LoadingButton
      pendingLabel={editing ? "수정 중..." : "발행 중..."}
      className="justify-self-start"
      disabled={pending}
    >
      {editing ? "수정 저장" : "발행하기"}
    </LoadingButton>
  );
}
