"use client";

import { motion } from "framer-motion";
import { Card } from "@/shared/ui/card";
import { UserAvatar } from "@/entities/user";
import { formatRelativeTime } from "@/shared/lib/relative-time";
import { fadeUp } from "@/shared/lib/motion";
import type { GuestbookEntry } from "../model/types";
import type { ReactNode } from "react";

export function EntryCard({
  entry,
  action,
}: {
  entry: GuestbookEntry;
  action?: ReactNode;
}) {
  return (
    <motion.div variants={fadeUp} layout>
      <Card className="group relative gap-3 border-border/60 bg-card/70 p-5 backdrop-blur transition-colors hover:border-border">
        <div className="flex items-start gap-3">
          <UserAvatar name={entry.author.display_name} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span className="truncate font-medium">
                {entry.author.display_name}
              </span>
              <span className="truncate text-xs text-muted-foreground">
                {entry.author.email}
              </span>
              <span className="text-xs text-muted-foreground">·</span>
              <time
                className="text-xs text-muted-foreground"
                dateTime={entry.created_at}
              >
                {formatRelativeTime(entry.created_at)}
              </time>
            </div>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
              {entry.body}
            </p>
          </div>
          {action ? (
            <div className="opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
              {action}
            </div>
          ) : null}
        </div>
      </Card>
    </motion.div>
  );
}
