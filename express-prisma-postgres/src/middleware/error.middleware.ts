import type { NextFunction, Request, Response } from "express";
import { prismaError } from "prisma-better-errors";

export const prismaErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name?.startsWith("Prisma") || err.code?.startsWith("P")) {
    const formattedError = new prismaError(err);

    return res.status(formattedError.statusCode || 400).json({
      success: false,
      error: formattedError.title || "Database Error",
      message: formattedError.message,
      meta: formattedError.metaData,
    });
  }

  res.status(500).json({
    success: false,
    error: err.message || "Internal Server Error",
    message: err.message,
  });
};
