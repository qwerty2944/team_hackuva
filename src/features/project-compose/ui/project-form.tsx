"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";
import { LoadingButton } from "@/shared/ui/loading-button";
import { saveProjectAction, type ProjectComposeState } from "../api/actions";

const ROLE_OPTIONS = ["앱", "데스크톱앱", "웹 프론트", "백엔드"];

const ACCENT_PRESETS: Array<{ label: string; value: string }> = [
  { label: "Zinc (기본)", value: "from-zinc-500/20 to-zinc-700/10" },
  { label: "Sky", value: "from-sky-500/20 to-cyan-500/10" },
  { label: "Amber", value: "from-amber-500/20 to-orange-500/10" },
  { label: "Yellow", value: "from-yellow-400/30 to-amber-500/10" },
  { label: "Emerald", value: "from-emerald-500/20 to-teal-500/10" },
  { label: "Violet", value: "from-violet-500/20 to-fuchsia-500/10" },
  { label: "Rose", value: "from-rose-500/20 to-pink-500/10" },
];

export function ProjectForm({
  initial,
}: {
  initial?: {
    slug: string;
    name: string;
    tagline: string;
    description: string;
    url: string;
    features: string[];
    stack: string[];
    status: "live" | "beta" | "wip";
    accent: string;
    imageUrl: string | null;
    videoUrl: string | null;
    year: number | null;
    roles: string[];
    iosUrl: string | null;
    androidUrl: string | null;
  };
}) {
  const [state, formAction] = useActionState<ProjectComposeState, FormData>(
    saveProjectAction,
    undefined,
  );

  return (
    <form action={formAction} className="grid gap-5">
      {initial?.slug && (
        <input type="hidden" name="slug" value={initial.slug} />
      )}
      <div className="grid gap-1.5">
        <Label htmlFor="project-name">이름</Label>
        <Input
          id="project-name"
          name="name"
          required
          maxLength={120}
          defaultValue={initial?.name}
          placeholder="예: Realtime Doctor"
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="project-tagline">태그라인 (한 줄)</Label>
        <Input
          id="project-tagline"
          name="tagline"
          required
          maxLength={200}
          defaultValue={initial?.tagline}
          placeholder="카드 상단 한 줄 설명"
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="project-description">소개</Label>
        <Textarea
          id="project-description"
          name="description"
          required
          rows={4}
          maxLength={1000}
          defaultValue={initial?.description}
          placeholder="2-4 문장 정도의 소개"
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="project-url">라이브 URL</Label>
        <Input
          id="project-url"
          name="url"
          type="url"
          required
          defaultValue={initial?.url}
          placeholder="https://example.com"
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="project-image">스크린샷 URL (선택)</Label>
        <Input
          id="project-image"
          name="imageUrl"
          type="text"
          defaultValue={initial?.imageUrl ?? ""}
          placeholder="예: /projects/my-site.png 또는 https://..."
        />
      </div>
      <div className="grid gap-1.5 sm:grid-cols-2 sm:gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="project-year">연도 (선택)</Label>
          <Input
            id="project-year"
            name="year"
            type="number"
            min={2000}
            max={2100}
            defaultValue={initial?.year ?? ""}
            placeholder="예: 2026"
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="project-video">시연영상 URL (선택)</Label>
          <Input
            id="project-video"
            name="videoUrl"
            type="text"
            defaultValue={initial?.videoUrl ?? ""}
            placeholder="YouTube 또는 Google Drive 링크"
          />
        </div>
      </div>
      <div className="grid gap-1.5">
        <Label>기여 (뱃지)</Label>
        <div className="flex flex-wrap gap-4">
          {ROLE_OPTIONS.map((r) => (
            <label key={r} className="flex items-center gap-1.5 text-sm">
              <input
                type="checkbox"
                name="roles"
                value={r}
                defaultChecked={initial?.roles?.includes(r)}
                className="size-4 rounded border-input accent-foreground"
              />
              {r}
            </label>
          ))}
        </div>
      </div>
      <div className="grid gap-1.5 sm:grid-cols-2 sm:gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="project-ios">App Store URL (선택)</Label>
          <Input
            id="project-ios"
            name="iosUrl"
            type="text"
            defaultValue={initial?.iosUrl ?? ""}
            placeholder="https://apps.apple.com/..."
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="project-android">Play Store URL (선택)</Label>
          <Input
            id="project-android"
            name="androidUrl"
            type="text"
            defaultValue={initial?.androidUrl ?? ""}
            placeholder="https://play.google.com/..."
          />
        </div>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="project-stack">기술 스택 (쉼표로 구분)</Label>
        <Input
          id="project-stack"
          name="stack"
          defaultValue={initial?.stack.join(", ")}
          placeholder="예: Next.js, Supabase, OpenAI"
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="project-features">기능 (한 줄에 하나)</Label>
        <Textarea
          id="project-features"
          name="features"
          rows={5}
          defaultValue={initial?.features.join("\n")}
          placeholder={"실시간 한·영 혼용 전사\n감별진단 자동 제시"}
        />
      </div>
      <div className="grid gap-1.5 sm:grid-cols-2 sm:gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="project-status">상태</Label>
          <select
            id="project-status"
            name="status"
            defaultValue={initial?.status ?? "wip"}
            className="h-9 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="live">Live</option>
            <option value="beta">Beta</option>
            <option value="wip">WIP</option>
          </select>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="project-accent">카드 그라데이션</Label>
          <select
            id="project-accent"
            name="accent"
            defaultValue={initial?.accent ?? ACCENT_PRESETS[0].value}
            className="h-9 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {ACCENT_PRESETS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
            {initial?.accent &&
              !ACCENT_PRESETS.some((p) => p.value === initial.accent) && (
                <option value={initial.accent}>{initial.accent}</option>
              )}
          </select>
        </div>
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
      pendingLabel={editing ? "저장 중..." : "등록 중..."}
      className="justify-self-start"
      disabled={pending}
    >
      {editing ? "수정 저장" : "프로젝트 등록"}
    </LoadingButton>
  );
}
