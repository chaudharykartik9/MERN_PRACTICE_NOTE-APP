import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { User } from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";

const SALT_ROUNDS = 10;

const signToken = (userId: string) =>
  jwt.sign({ sub: userId }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  } as jwt.SignOptions);

const toPublicUser = (user: { _id: unknown; name: string; email: string }) => ({
  id: String(user._id),
  name: user.name,
  email: user.email,
});

export const registerUser = async (input: {
  name: string;
  email: string;
  password: string;
}) => {
  const existing = await User.findOne({ email: input.email.toLowerCase() });
  if (existing) throw new AppError(409, "Email already registered");

  const password = await bcrypt.hash(input.password, SALT_ROUNDS);
  const user = await User.create({ ...input, password });
  return { user: toPublicUser(user), token: signToken(String(user._id)) };
};

export const loginUser = async (input: { email: string; password: string }) => {
  const user = await User.findOne({ email: input.email.toLowerCase() });
  // same message for unknown email and wrong password: don't reveal which one failed
  const valid = user && (await bcrypt.compare(input.password, user.password));
  if (!user || !valid) throw new AppError(401, "Invalid email or password");

  return { user: toPublicUser(user), token: signToken(String(user._id)) };
};

export const getUserById = async (id: string) => {
  const user = await User.findById(id);
  if (!user) throw new AppError(401, "User no longer exists");
  return toPublicUser(user);
};
