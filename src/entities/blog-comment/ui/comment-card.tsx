import { UserAvatar } from "@/entities/user";
import { Badge } from "@/shared/ui/badge";
import { formatRelativeTime } from "@/shared/lib/relative-time";
import { DeleteCommentButton } from "@/features/comment-delete";
import type { BlogComment } from "../model/types";

export function CommentCard({
  comment,
  currentUserId,
  canDelete,
  children,
}: {
  comment: BlogComment;
  currentUserId?: string;
  canDelete: boolean;
  children?: React.ReactNode;
}) {
  const isOwn = comment.author.id === currentUserId;
  return (
    <article className="flex gap-3 rounded-lg border border-border/60 bg-card/40 p-3">
      <UserAvatar name={comment.author.display_name} className="size-8 shrink-0" />
      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-medium">{comment.author.display_name}</span>
          {comment.author.role === "admin" && (
            <Badge variant="secondary" className="px-1.5 py-0 text-[10px] font-normal">
              관리자
            </Badge>
          )}
          {isOwn && (
            <span className="text-muted-foreground">(나)</span>
          )}
          <span className="text-muted-foreground">·</span>
          <time className="text-muted-foreground" dateTime={comment.created_at}>
            {formatRelativeTime(comment.created_at)}
          </time>
        </div>
        <p className="whitespace-pre-wrap break-words text-sm">{comment.body}</p>
        {(canDelete || children) && (
          <div className="flex items-center gap-2 pt-1">
            {children}
            {canDelete && <DeleteCommentButton commentId={comment.id} />}
          </div>
        )}
      </div>
    </article>
  );
}
