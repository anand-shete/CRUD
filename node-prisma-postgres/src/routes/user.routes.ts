import { Router } from "express";
import {
  addCategoryToPost,
  createPost,
  deletePost,
  getAllCategories,
  getAllPosts,
  getPost,
  updatePost,
} from "../controllers/user.controller";

const router = Router();

router.post("/create-post", createPost);
router.get("/posts", getAllPosts);
router.get("/post/:postId", getPost);
router.put("/post/:postId", updatePost);
router.delete("/post/:postId", deletePost);

// categorize posts
router.post("/add-category/:postId", addCategoryToPost);
router.get("/categories", getAllCategories);

export default router;
