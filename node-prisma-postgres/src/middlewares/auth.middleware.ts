import { NextFunction, Request, Response } from "express";
import prisma from "../config/prisma.config";
import jwt from "jsonwebtoken";
import { Token } from "../types/express";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["token"];
  if (!token) {
    return res.status(401).json({ error: "Token not found" });
  }
  const decoded = jwt.decode(token) as Token;

  const user = await prisma.user.findUnique({
    where: {
      email: decoded.email,
      name: decoded.name,
    },
  });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  req.user = user;
  next();
};
