import { Suspense } from "react";
import { getCurrentUser } from "@/entities/user/server";
import { WelcomeToast } from "./welcome-toast";

async function Bridge() {
  const current = await getCurrentUser();
  if (!current) return null;
  return (
    <WelcomeToast
      displayName={current.profile.display_name}
      role={current.profile.role}
    />
  );
}

export function WelcomeBridge() {
  return (
    <Suspense fallback={null}>
      <Bridge />
    </Suspense>
  );
}
