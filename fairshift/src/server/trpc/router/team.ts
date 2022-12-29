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
  createTeam: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const team = await ctx.prisma.team.create({
        data: {
          name: input.name,
          ownerId: ctx.session.user.id,
        },
      });

      await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          teamId: team.id,
        },
      });

      return team;
    }),
  joinTeam: protectedProcedure
    .input(z.object({ teamId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          teamId: input.teamId,
        },
      });
    }),
  getTeamMembers: protectedProcedure
    .input(z.object({ teamId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.user.findMany({
        where: {
          teamId: input.teamId,
        },
      });
    }),
});
