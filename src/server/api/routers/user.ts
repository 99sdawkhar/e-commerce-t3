import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { hash } from "bcrypt"

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({
        name: z.string().min(2).max(30),
        email: z.string().email(),
        password: z.string().min(8).max(16),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userExist = await ctx.db.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (userExist) {
        const error = {
          code: "USERNAME_EXISTS",
          message:
            "The email you have chosen is already taken. Please choose a different email for your account.",
        };

        throw new Error(error.message); // Throw an error if the username is already taken
      }

      const hashedPassword = await hash(input.password, 10);
      // const isPasswordValid = await compare(password, user.password);

      const user = await ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: hashedPassword,
        },
      });
      return user;
  }),
  // get list of usernames
  getExistingEmails: publicProcedure.query(async ({ ctx }) => {
    
    const response = await ctx.db.user.findMany({
      where: {
        email: {
          not: null || "",
        },
      },
      select: {
        email: true,
      },
    });

    const emailList = response.map((item) => item.email);

    return emailList;
  }),
});
