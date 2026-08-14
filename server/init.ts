import { cache } from "react";

import { headers } from "next/headers";

import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export const createTRPCContext = cache(async () => {
  const response = await auth.api.getSession({
    headers: await headers(),
  });
  const session = response?.session ?? null;
  const user = response?.user ?? null;
  return { db, auth: { session, user } };
});

type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
});

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.auth.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Not authenticated",
    });
  }

  return next({
    ctx: {
      auth: ctx.auth,
    },
  });
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
