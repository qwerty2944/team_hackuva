export type CommentAuthor = {
  id: string;
  display_name: string;
  email: string;
  role: "admin" | "member";
};

export type BlogComment = {
  id: number;
  post_slug: string;
  parent_id: number | null;
  body: string;
  created_at: string;
  author: CommentAuthor;
};

export type CommentThreadNode = {
  comment: BlogComment;
  replies: BlogComment[];
};
