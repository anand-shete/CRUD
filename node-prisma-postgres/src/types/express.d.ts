import { UserRole } from "@prisma/client";
import Request from "express";

interface Token {
  name: string;
  email: string;
  role: UserRole;
  iat: number;
}
interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

declare module "express-serve-static-core" {
  interface Request {
    user: User;
  }
}
