export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  author: string;
  publishedAt: string;
  readingMinutes: number;
  tags: string[];
  projectSlug?: string;
};
