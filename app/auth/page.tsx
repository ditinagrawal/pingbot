import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { AuthView } from "@/modules/auth/views/auth-view";

export default async function AuthPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session?.user) {
    redirect("/");
  }
  return <AuthView />;
}
