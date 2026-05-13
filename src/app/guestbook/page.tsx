import type { Metadata } from "next";
import { Suspense } from "react";
import { GuestbookHero } from "@/widgets/guestbook-hero";
import { GuestbookFeed } from "@/widgets/guestbook-feed";
import { LoadingOverlay } from "@/shared/ui/loading-overlay";

export const metadata: Metadata = { title: "방명록" };

export default function GuestbookPage() {
  return (
    <>
      <GuestbookHero />
      <Suspense fallback={<LoadingOverlay label="방명록 불러오는 중" />}>
        <GuestbookFeed />
      </Suspense>
    </>
  );
}
