import { Router } from "express";
import { login, signupUser } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", signupUser);
router.post("/login", login);

export default router;
