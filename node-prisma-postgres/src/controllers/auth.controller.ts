import prisma from "../config/prisma.config";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const signupUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body as {
      name: string;
      email: string;
      password: string;
    };
    if (!name || !email || !password) {
      return res.status(401).json({ message: "All fields are required" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return res.status(201).json({ message: "User created successfully" });
  } catch (error: unknown) {
    // generally, a prismaError class is created to handle all known prisma errors
    console.log("error creating user", error);
    return res.status(500).json({ error: error || "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    // strict schema validations using zod
    const { email, password } = req.body as { email: string; password: string };
    if (!email || !password) {
      return res.status(401).json({ message: "All fields are required" });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    const payload = { email: user.email, name: user.name, role: user.role };
    const token = jwt.sign(payload, "SECRET123");

    // different based on NODE_ENV
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 10,
    });

    return res.status(200).json({ message: "Login success", token });
  } catch (error) {
    console.log("login error", error);
    return res.status(500).json({ message: error || "Internal Server Error" });
  }
};
