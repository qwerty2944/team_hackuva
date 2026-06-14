export type ProjectStatus = "live" | "beta" | "wip";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  features: string[];
  stack: string[];
  status: ProjectStatus;
  accent: string;
  imageUrl: string | null;
};
