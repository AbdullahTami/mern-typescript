import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import User from "../models/userModel";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  console.log(req.session);
  const authenticatedUserId = req.session.userId;
  console.log(authenticatedUserId);

  try {
    if (!authenticatedUserId)
      throw createHttpError(401, "User not authenticated");
    const user = await User.findById(authenticatedUserId).select("+email");
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

interface SignupBody {
  username?: string;
  email?: string;
  password?: string;
}

export const signup: RequestHandler<
  unknown,
  unknown,
  SignupBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const passwordRaw = req.body.password;

  try {
    if (!username || !email || !passwordRaw) {
      throw createHttpError(400, "Parameters missing");
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      throw createHttpError(
        409,
        "Username already taken. Please choose a different one or log in instead."
      );
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      throw createHttpError(
        409,
        "A user with this email address already exists! Please log in instead."
      );
    }

    const passwordHashed = await bcrypt.hash(passwordRaw, 10);

    const newUser = await User.create({
      username,
      email,
      password: passwordHashed,
    });
    req.session.userId = newUser._id;

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

interface LoginBody {
  username?: string;
  password?: string;
}

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    console.log(req.session);

    if (!username || !password) {
      throw createHttpError(400, "Parameters missing");
    }
    const user = await User.findOne({ username }).select("+password +email");
    if (!user) throw createHttpError(401, "Invalid credentials");

    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) throw createHttpError(400, "Parameters missing");

    req.session.userId = user._id;

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) return next(error);
    res.sendStatus(200);
  });
};
