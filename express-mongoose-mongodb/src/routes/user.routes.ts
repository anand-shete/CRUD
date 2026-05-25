import { Request, Response, Router } from "express";
import { User } from "../models/user.model.js";
import { Types } from "mongoose";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.find().lean();
    return res.status(200).json(users);
  } catch (error: any) {
    console.log("error fetching users", error);
    return res.status(500).json({ message: "Error fetching users" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const userId = new Types.ObjectId(req.params.id as string);
    const user = await User.findOne({ _id: userId }).lean();
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    return res.status(200).json(user);
  } catch (error: any) {
    console.log("error fetching users", error);
    return res.status(500).json({ message: "Error fetching users" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    if (!req.body?.username || !req.body?.password || !req.body?.email) {
      return res.status(400).json({ message: "All fields required" });
    }

    const checkUniqueUsername = await User.countDocuments({ username: req.body.username });
    if (checkUniqueUsername > 0) {
      return res.status(409).json({ message: "Username taken" });
    }

    const checkUniqueEmail = await User.countDocuments({ email: req.body.email });
    if (checkUniqueEmail > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    await User.insertOne({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    return res.status(200).json({ message: "User created" });
  } catch (error) {
    console.log("error creating user", error);
    return res.status(500).json({ message: "Error creating user" });
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const userId = new Types.ObjectId(req.params.id as string);
    const username = req.body.newUsername;
    if (!username) {
      return res.status(400).json({ message: "newUsername is required" });
    }

    const checkUserExists = await User.countDocuments({ _id: userId });
    if (checkUserExists > 0) {
      return res.status(409).json({ message: "User does not exists" });
    }

    const checkUsernameExists = await User.countDocuments({ username: req.body.newUsername });
    if (checkUsernameExists > 0) {
      return res.status(409).json({ message: "Username taken" });
    }

    await User.updateOne({ _id: userId }, { username: req.body.newUsername });

    return res.status(200).json({ message: "Username updated successfully" });
  } catch (error) {
    console.log("username could not be updated", error);
    return res.status(500).json({ message: "error updating username" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const userId = new Types.ObjectId(req.params.id as string);

    const checkUserExists = await User.countDocuments({ _id: userId });
    if (checkUserExists > 0) {
      return res.status(409).json({ message: "User does not exists" });
    }

    await User.deleteOne({ _id: userId });

    return res.status(200).json({ message: "Username deleted successfully" });
  } catch (error) {
    console.log("user could not be deleted", error);
    return res.status(500).json({ message: "error deleting username" });
  }
});

export default router;
