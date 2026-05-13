export type Profile = {
  id: string;
  display_name: string;
  email: string;
};

export type CurrentUser = {
  user: { id: string; email?: string };
  profile: Profile;
};
