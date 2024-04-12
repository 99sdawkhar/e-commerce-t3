import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { generateFakeCategories } from "@/utils/faker";

export const categoryRouter = createTRPCRouter({
  generateFakeCategories: protectedProcedure
    .input(z.object({}))
    .mutation(async () => {
      return generateFakeCategories();
    }),
  // get an array of products for infinite scroll
  getCategories: protectedProcedure.query(async ({ ctx }) => {
    const items = await ctx.db.category.findMany({
      orderBy: {
        id: "asc",
      },
    });
    return items;
  }),
});
