import { z } from "zod";

import { protectedProcedure, router } from "../trpc";

export const teamRouter = router({
  getUserTeam: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: {
          id: input.userId,
        },
        include: {
          team: true,
        },
      });
    }),
});
