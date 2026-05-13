export type UserRole = "admin" | "member";

export type Profile = {
  id: string;
  display_name: string;
  email: string;
  role: UserRole;
};

export type CurrentUser = {
  user: { id: string; email?: string };
  profile: Profile;
};
