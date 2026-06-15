export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      blog_comments: {
        Row: {
          author_id: string;
          body: string;
          created_at: string;
          id: number;
          parent_id: number | null;
          post_slug: string;
        };
        Insert: {
          author_id: string;
          body: string;
          created_at?: string;
          id?: number;
          parent_id?: number | null;
          post_slug: string;
        };
        Update: {
          author_id?: string;
          body?: string;
          created_at?: string;
          id?: number;
          parent_id?: number | null;
          post_slug?: string;
        };
        Relationships: [
          {
            foreignKeyName: "blog_comments_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "blog_comments_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "blog_comments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "blog_comments_post_slug_fkey";
            columns: ["post_slug"];
            isOneToOne: false;
            referencedRelation: "blog_posts";
            referencedColumns: ["slug"];
          },
        ];
      };
      blog_posts: {
        Row: {
          author_id: string;
          body: string;
          created_at: string;
          excerpt: string;
          id: number;
          project_slug: string | null;
          published_at: string;
          reading_minutes: number;
          slug: string;
          tags: string[];
          title: string;
          updated_at: string;
        };
        Insert: {
          author_id: string;
          body: string;
          created_at?: string;
          excerpt: string;
          id?: number;
          project_slug?: string | null;
          published_at?: string;
          reading_minutes?: number;
          slug: string;
          tags?: string[];
          title: string;
          updated_at?: string;
        };
        Update: {
          author_id?: string;
          body?: string;
          created_at?: string;
          excerpt?: string;
          id?: number;
          project_slug?: string | null;
          published_at?: string;
          reading_minutes?: number;
          slug?: string;
          tags?: string[];
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "blog_posts_project_slug_fkey";
            columns: ["project_slug"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["slug"];
          },
        ];
      };
      guestbook_entries: {
        Row: {
          author_id: string;
          body: string;
          created_at: string;
          id: number;
        };
        Insert: {
          author_id: string;
          body: string;
          created_at?: string;
          id?: never;
        };
        Update: {
          author_id?: string;
          body?: string;
          created_at?: string;
          id?: never;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          created_at: string;
          display_name: string;
          email: string;
          id: string;
          role: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          display_name: string;
          email: string;
          id: string;
          role?: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          display_name?: string;
          email?: string;
          id?: string;
          role?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      projects: {
        Row: {
          accent: string;
          author_id: string;
          created_at: string;
          description: string;
          features: string[];
          id: number;
          image_url: string | null;
          name: string;
          slug: string;
          sort_order: number;
          stack: string[];
          status: string;
          tagline: string;
          updated_at: string;
          url: string;
          video_url: string | null;
          year: number | null;
        };
        Insert: {
          accent?: string;
          author_id: string;
          created_at?: string;
          description: string;
          features?: string[];
          id?: number;
          image_url?: string | null;
          video_url?: string | null;
          year?: number | null;
          name: string;
          slug: string;
          sort_order?: number;
          stack?: string[];
          status?: string;
          tagline: string;
          updated_at?: string;
          url: string;
        };
        Update: {
          accent?: string;
          author_id?: string;
          created_at?: string;
          description?: string;
          features?: string[];
          id?: number;
          image_url?: string | null;
          video_url?: string | null;
          year?: number | null;
          name?: string;
          slug?: string;
          sort_order?: number;
          stack?: string[];
          status?: string;
          tagline?: string;
          updated_at?: string;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: "projects_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};
