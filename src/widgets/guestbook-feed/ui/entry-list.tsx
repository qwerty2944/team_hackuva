"use client";

import { AnimatePresence, motion } from "framer-motion";
import { EntryCard, type GuestbookEntry } from "@/entities/guestbook-entry";
import { staggerParent } from "@/shared/lib/motion";
import type { ReactNode } from "react";

export function EntryList({
  entries,
  deleteSlots,
}: {
  entries: GuestbookEntry[];
  deleteSlots: Record<number, ReactNode>;
}) {
  if (entries.length === 0) {
    return (
      <p className="rounded-md border border-dashed border-border/50 bg-card/30 px-4 py-12 text-center text-sm text-muted-foreground">
        아직 방명록이 없어요. 첫 글을 남겨보세요!
      </p>
    );
  }

  return (
    <motion.ul
      initial="hidden"
      animate="visible"
      variants={staggerParent}
      className="grid gap-3"
    >
      <AnimatePresence initial={false}>
        {entries.map((entry) => (
          <li key={entry.id}>
            <EntryCard entry={entry} action={deleteSlots[entry.id]} />
          </li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}
