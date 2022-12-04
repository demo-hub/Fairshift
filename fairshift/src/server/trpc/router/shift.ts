import { z } from "zod";
import generateShifts from "../services/generateShifts";

import { publicProcedure, router } from "../trpc";

export const shiftRouter = router({
  generateShifts: publicProcedure
    .input(
      z.object({
        totalEmployees: z.number(),
        shiftsPerDay: z.number(),
        hoursPerShift: z.number(),
        employeesPerShift: z.number(),
      })
    )
    .mutation(({ input }) => {
      return generateShifts(input);
    }),
});
