import Link from "next/link";
import { listEntries } from "@/entities/guestbook-entry/server";
import { getCurrentUser } from "@/entities/user/server";
import { ComposeForm } from "@/features/guestbook-compose";
import { DeleteEntryButton } from "@/features/guestbook-delete-entry";
import { EntryList } from "./entry-list";
import { Card } from "@/shared/ui/card";

export async function GuestbookFeed() {
  const [entries, current] = await Promise.all([
    listEntries(),
    getCurrentUser(),
  ]);

  const deleteButtons = current
    ? Object.fromEntries(
        entries
          .filter((e) => e.author_id === current.user.id)
          .map((e) => [e.id, <DeleteEntryButton key={e.id} entryId={e.id} />]),
      )
    : {};

  return (
    <div className="mx-auto grid w-full max-w-3xl gap-6 px-4 pb-24">
      {current ? (
        <ComposeForm displayName={current.profile.display_name} />
      ) : (
        <Card className="gap-2 border-dashed border-border/60 bg-card/50 p-5 text-center backdrop-blur">
          <p className="text-sm text-muted-foreground">
            방명록을 남기려면 로그인이 필요해요.
          </p>
          <div className="flex justify-center gap-2 text-sm">
            <Link
              href="/login?next=/guestbook"
              className="rounded-md bg-primary px-3 py-1.5 font-medium text-primary-foreground hover:bg-primary/90"
            >
              로그인
            </Link>
            <Link
              href="/signup"
              className="rounded-md border border-border/60 px-3 py-1.5 hover:bg-secondary/60"
            >
              회원가입
            </Link>
          </div>
        </Card>
      )}

      <EntryList entries={entries} deleteSlots={deleteButtons} />
    </div>
  );
}
