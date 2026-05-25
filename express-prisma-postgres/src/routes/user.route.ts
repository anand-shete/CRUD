import { Router } from "express";
import { asyncHandler } from "../middleware/handler.middleware";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  loginUser,
  updateUsername,
} from "../controller/user.controller";

const router = Router();

router.get("/", asyncHandler(getAllUsers));
router.post("/create", asyncHandler(createUser));
router.post("/login", asyncHandler(loginUser));
router.post("/update-username", asyncHandler(updateUsername));
router.get("/:id", asyncHandler(getUserById));
router.delete("/:id", asyncHandler(deleteUser));

export default router;
