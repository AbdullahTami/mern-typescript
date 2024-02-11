import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import env from "./validateEnv";

interface UserId {
  userId: Types.ObjectId;
}

export const createJWT = (payload: UserId) => {
  const token = jwt.sign(payload, env.SECRET_KEY, {
    expiresIn: env.EXPIRES_IN,
  });
  return token;
};
