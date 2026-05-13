export type PostAuthor = {
  id: string;
  display_name: string;
  email: string;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  author: PostAuthor;
  publishedAt: string;
  readingMinutes: number;
  tags: string[];
  projectSlug?: string;
};
