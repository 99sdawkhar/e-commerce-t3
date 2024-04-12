import { env } from "@/env";
import jwt, { type JwtPayload } from "jsonwebtoken";

const JWT_SECRET = env.JWT_SECRET;

export const decodeJwt = (token: string) => {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
}