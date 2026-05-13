"use client";

import { motion } from "framer-motion";
import { Card } from "@/shared/ui/card";
import { fadeUp, staggerParent } from "@/shared/lib/motion";
import { cn } from "@/shared/lib/utils";
import type { ReactNode } from "react";

export function AuthFormShell({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerParent}
      className={cn(
        "mx-auto flex w-full max-w-md flex-col gap-6 px-4 py-16",
        className,
      )}
    >
      <motion.div variants={fadeUp} className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </motion.div>
      <motion.div variants={fadeUp}>
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-foreground/10 via-transparent to-foreground/5 blur-2xl"
          />
          <Card className="gap-4 border-border/60 bg-card/80 p-6 backdrop-blur">
            {children}
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
}
