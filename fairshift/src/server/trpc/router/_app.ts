import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { shiftRouter } from "./shift";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  shift: shiftRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
