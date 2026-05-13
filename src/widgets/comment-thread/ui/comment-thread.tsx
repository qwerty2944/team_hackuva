import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { listThread } from "@/entities/blog-comment/server";
import { CommentCard } from "@/entities/blog-comment";
import { getCurrentUser } from "@/entities/user/server";
import { CommentComposeForm } from "@/features/comment-compose";
import { buttonVariants } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import { ReplyToggle } from "./reply-row";

export async function CommentThread({ postSlug }: { postSlug: string }) {
  const [thread, current] = await Promise.all([
    listThread(postSlug),
    getCurrentUser(),
  ]);
  const total =
    thread.reduce((acc, t) => acc + 1 + t.replies.length, 0);
  const isAdmin = current?.profile.role === "admin";
  const currentId = current?.profile.id;

  return (
    <section className="space-y-5">
      <header className="flex items-center gap-2">
        <MessageSquare className="size-4 text-muted-foreground" />
        <h2 className="text-lg font-semibold tracking-tight">
          댓글 <span className="text-muted-foreground">({total})</span>
        </h2>
      </header>

      {current ? (
        <CommentComposeForm postSlug={postSlug} />
      ) : (
        <div className="rounded-lg border border-dashed border-border/60 p-5 text-center text-sm text-muted-foreground">
          댓글을 남기려면{" "}
          <Link
            href={`/login?next=/blog/${postSlug}`}
            className={cn(
              buttonVariants({ variant: "link", size: "sm" }),
              "h-auto p-0",
            )}
          >
            로그인
          </Link>{" "}
          이 필요합니다.
        </div>
      )}

      {thread.length === 0 ? (
        <p className="rounded-md border border-dashed border-border/60 p-6 text-center text-sm text-muted-foreground">
          아직 댓글이 없어요. 첫 댓글을 남겨주세요.
        </p>
      ) : (
        <ul className="space-y-4">
          {thread.map(({ comment, replies }) => {
            const canDeleteRoot =
              isAdmin || comment.author.id === currentId;
            return (
              <li key={comment.id} className="space-y-3">
                <CommentCard
                  comment={comment}
                  currentUserId={currentId}
                  canDelete={canDeleteRoot}
                >
                  {current && (
                    <ReplyToggle postSlug={postSlug} parentId={comment.id} />
                  )}
                </CommentCard>
                {replies.length > 0 && (
                  <ul className="space-y-3 border-l border-border/60 pl-4">
                    {replies.map((r) => {
                      const canDelete = isAdmin || r.author.id === currentId;
                      return (
                        <li key={r.id}>
                          <CommentCard
                            comment={r}
                            currentUserId={currentId}
                            canDelete={canDelete}
                          />
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
