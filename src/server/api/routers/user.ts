import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { z } from "zod";
import { compare, hash } from "bcrypt";
import { generateVerificationCode } from "@/utils/utils";
import jwt from "jsonwebtoken";
import { env } from "@/env";

const JWT_SECRET = env.JWT_SECRET;

const JWT_EXPIRATION = 3600; // seconds

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
        select: {
          email: true,
        },
      });

      if (userExist) {
        const error = {
          code: "EMAIL_EXISTS",
          message:
            "The email you have chosen is already taken. Please choose a different email for your account.",
        };

        throw new Error(error.message); // Throw an error if the email is already taken
      }

      const hashedPassword = await hash(input.password, 10);
      const verificationCode = generateVerificationCode();

      try {
        const response = await fetch("http://localhost:3000/api/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: input.email,
            code: verificationCode,
          }),
        });

        console.log({response})
      } catch (err) {
        console.log({ err });
      }

      const user = await ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: hashedPassword,
          verificationCode: verificationCode,
        },
      });

      const tokenUser = {
        id: user.id,
        email: user.email,
        name: user.name,
      };

      // Generate JWT token
      const token = jwt.sign(tokenUser, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION,
      });

      return {
        user,
        token,
        message: "Please verify your account.",
      };
    }),
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
  getUserByToken: protectedProcedure
    .input(z.object({}))
    .query(async ({ ctx }) => {
      const tokenUser = ctx.user;

      const user = await ctx.db.user.findUnique({
        where: {
          id: tokenUser.id,
        },
        select: {
          id: true,
          email: true,
          name: true,
          Categories: true,
          emailVerified: true,
        },
      });

      return user;
    }),
  loginUser: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8).max(16),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          email: input.email,
        },
        select: {
          id: true,
          email: true,
          name: true,
          password: true,
          emailVerified: true,
        },
      });

      if (!user) {
        const error = {
          code: "EMAIL_DOESNOT_EXISTS",
          message: "Please create account first.",
        };

        throw new Error(error.message); // Throw an error if the account does not exist
      }

      const isPasswordValid = await compare(input.password, user.password);

      if (!isPasswordValid) {
        const error = {
          code: "INVALID_PASSWORD",
          message: "Invalid email or password.",
        };

        throw new Error(error.message);
      }

      // if (!user.emailVerified) {
      //   const error = {
      //     code: "NOT_VERIFIED",
      //     message: "Please verify your account and try again",
      //   };

      //   throw new Error(error.message);
      // }

      const tokenUser = {
        id: user.id,
        email: user.email,
        name: user.name,
      };

      // Generate JWT token
      const token = jwt.sign(tokenUser, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION,
      });

      return {
        tokenUser,
        token,
      };
    }),
  verifyEmail: protectedProcedure
    .input(
      z.object({
        verificationCode: z.number().min(8),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const tokenUser = ctx.user;

      const user = await ctx.db.user.findUnique({
        where: {
          email: tokenUser.email,
        },
        select: {
          verificationCode: true,
          emailVerified: true,
        },
      });

      if (!user) {
        const error = {
          code: "USERNAME_NOT_EXISTS",
          message: "Account does not exist.",
        };

        throw new Error(error.message); // Throw an error if the username is already taken
      }

      if (user.emailVerified !== null) {
        const error = {
          code: "ACCOUNT_ALREADY_VERIFIED",
          message: "Account is already verified. Please continue on homepage.",
        };

        throw new Error(error.message);
      }

      if (user.verificationCode !== input.verificationCode) {
        const error = {
          code: "INVALID_CODE",
          message: "Invalid verification code",
        };
        throw new Error(error.message);
      }

      await ctx.db.user.update({
        where: { email: tokenUser.email },
        data: {
          verificationCode: 11111111, // dummy verification code
          emailVerified: new Date(),
        },
      });

      return {
        userVerified: true,
        message: 'Account verified!'
      };
    }),
  toggleCategory: protectedProcedure
    .input(
      z.object({
        categoryId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const tokenUser = ctx.user;
      const userId = tokenUser.id;
      const categoryId = input.categoryId;

      const user = await ctx.db.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          emailVerified: true,
        },
      });

      if (!user?.emailVerified) {
        const error = {
          code: "NOT_VERIFIED",
          message: "Please verify your account and try again",
        };

        throw new Error(error.message);
      }

      const checkAlreadyExist = await ctx.db.user.findMany({
        where: {
          AND: [{ id: userId }, { Categories: { some: { id: categoryId } } }],
        },
      });

      if (checkAlreadyExist.length === 0) {
        await ctx.db.category.update({
          where: { id: categoryId },
          data: {
            Users: {
              connect: {
                id: userId,
              },
            },
          },
        });

        return {
          code: 200,
          message: `Added category successfully`,
        };
      } else {
        await ctx.db.category.update({
          where: { id: categoryId },
          data: {
            Users: {
              disconnect: {
                id: userId,
              },
            },
          },
        });

        return {
          code: 200,
          message: `Removed category successfully`,
        };
      }
    }),
});
