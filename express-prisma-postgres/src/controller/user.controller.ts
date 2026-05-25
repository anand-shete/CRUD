import type { Request, Response } from "express";
import { prisma } from "../config/prisma";
import bcrypt, { compare } from "bcrypt";
import crypto from "node:crypto";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();

  return res.status(200).json({ success: true, data: users });
};

export const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id as string;
  if (!userId) throw new Error("Invalid user id");

  const user = await prisma.user.findFirst({ where: { id: userId } });

  return res.status(200).json({ success: true, data: user });
};

export const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ success: false, error: "All fields required" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
    },
  });

  return res.status(200).json({ success: true, message: "User created successfully" });
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  if ((!username && !email) || !password) {
    return res.status(400).json({
      success: false,
      error: "Username or Email and Password required",
    });
  }

  const user = await prisma.user.findFirst({ where: { OR: [{ username, email }] } });
  if (!user) throw new Error("User not found");

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) throw new Error("Incorrect password");

  const payload = { id: user?.id, username: user?.username };
  const token = crypto.createHash("sha256").update(JSON.stringify(payload)).digest("hex");

  return res.status(200).json({ success: true, token });
};

export const updateUsername = async (req: Request, res: Response) => {
  const { username, newUsername, password } = req.body;
  if (!username || !newUsername || !password) {
    return res.status(400).json({
      success: false,
      error: "Username, newUsername and Password required",
    });
  }

  const checkUserExists = await prisma.user.findFirstOrThrow({
    where: { username },
    select: { password: true },
  });
  if (!checkUserExists) throw new Error("User does not exists");

  const comparePassword = await bcrypt.compare(password, checkUserExists.password);
  if (!comparePassword) throw new Error("Incorrect password");

  await prisma.user.update({ where: { username }, data: { username: newUsername } });

  return res.status(200).json({ success: true, message: "username updated successfully" });
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id as string;
  if (!userId) throw new Error("Invalid user id");

  await prisma.user.delete({ where: { id: userId } });

  return res.status(200).json({ success: true, message: "User deleted successfully" });
};
