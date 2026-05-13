export type GuestbookEntry = {
  id: number;
  author_id: string;
  body: string;
  created_at: string;
  author: {
    display_name: string;
    email: string;
  };
};
