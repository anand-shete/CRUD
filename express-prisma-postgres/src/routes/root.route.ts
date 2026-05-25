import { Router, type Request, type Response } from "express";
import { asyncHandler } from "../middleware/handler.middleware";
import { healthCheck } from "../controller/base.controller";

const router = Router();

router.get("/health", asyncHandler(healthCheck));

export default router;
