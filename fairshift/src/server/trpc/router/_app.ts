import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { shiftRouter } from "./shift";
import { teamRouter } from "./team";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  shift: shiftRouter,
  team: teamRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
