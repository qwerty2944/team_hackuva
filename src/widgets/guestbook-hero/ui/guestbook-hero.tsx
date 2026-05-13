"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/shared/lib/gsap";

export function GuestbookHero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".hero-eyebrow", { y: 16, opacity: 0, duration: 0.5 })
          .from(
            ".hero-title-char",
            {
              y: 40,
              opacity: 0,
              stagger: 0.025,
              duration: 0.6,
            },
            "-=0.2",
          )
          .from(
            ".hero-sub",
            { y: 12, opacity: 0, duration: 0.5 },
            "-=0.3",
          )
          .from(
            ".hero-glow",
            { scale: 0.6, opacity: 0, duration: 0.9, ease: "power2.out" },
            "<",
          );
      }, ref);
      return () => ctx.revert();
    },
    { scope: ref },
  );

  const title = "방명록";

  return (
    <section
      ref={ref}
      className="relative mx-auto w-full max-w-4xl px-4 pt-16 pb-10 text-center"
    >
      <div
        aria-hidden
        className="hero-glow pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-64 w-2/3 rounded-full bg-gradient-to-br from-primary/20 via-fuchsia-500/10 to-sky-500/20 blur-3xl"
      />
      <p className="hero-eyebrow text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Team Hackuva · Guestbook
      </p>
      <h1 className="mt-3 text-5xl font-semibold tracking-tight sm:text-6xl">
        {Array.from(title).map((c, i) => (
          <span
            key={i}
            className="hero-title-char inline-block bg-gradient-to-br from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent"
          >
            {c}
          </span>
        ))}
      </h1>
      <p className="hero-sub mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
        다녀간 흔적을 남겨주세요. 따뜻한 한 마디가 큰 힘이 됩니다.
      </p>
    </section>
  );
}
