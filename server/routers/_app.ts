import { createTRPCRouter, publicProcedure } from "../init";

export const appRouter = createTRPCRouter({
  usersCount: publicProcedure.query(({ ctx }) => {
    return {
      count: ctx.db.user.count(),
    };
  }),
});

export type AppRouter = typeof appRouter;
