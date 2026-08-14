"use client";

import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export const SocialLoginButton = () => {
  const [isPending, startTransition] = useTransition();

  function onClick(provider: "github") {
    startTransition(async () => {
      await authClient.signIn.social({
        provider,
      });
    });
  }

  return (
    <Button disabled={isPending} onClick={() => onClick("github")}>
      Github
    </Button>
  );
};
