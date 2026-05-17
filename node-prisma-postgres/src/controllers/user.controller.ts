import { Request, Response } from "express";
import prisma from "../config/prisma.config";
import { PostCategory } from "@prisma/client";

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    // include the Foreign key relations
    const posts = await prisma.post.findMany({
      include: {
        categories: true,
        comments: true,
        author: true,
      },
    });

    return res.status(200).json(posts);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: error || "Internal Server Error" });
  }
};
export const createPost = async (req: Request, res: Response) => {
  try {
    const { title } = req.body as { title: string };
    if (!title) {
      return res.status(400).json({ error: "All fields are required" });
    }

    await prisma.post.create({
      data: {
        title,
        authorId: req.user.id,
      },
    });

    return res.status(201).json({ message: "Blog Post created" });
  } catch (error) {
    console.log("error creating blog", error);
    return res.status(500).json({ error: error || "Internal Server Error" });
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.postId;
    if (!postId) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const post = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
    });
    if (!post) {
      return res.status(404).json({ error: "Post doesn't exists" });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: error || "Internal Server Error" });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { title } = req.body as { title: string };
    if (!title) {
      return res.status(400).json({ erorr: "Title is required" });
    }

    const postId = req.params.postId;
    if (!postId) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    await prisma.post.update({
      where: {
        id: Number(postId),
      },
      data: {
        title,
      },
    });

    return res.status(200).json({ message: "Title updated successfully" });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: error || "Internal Server Error" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.postId;
    if (!postId) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const result = await prisma.post.delete({
      where: {
        id: Number(postId),
      },
    });

    return res.status(200).json(result);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: error || "Internal Server Error" });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    // You could go on and on and on..
    // const query = await prisma.category.findMany({
    //   include: {
    //     posts: {
    //       include: {
    //         categories: {
    //           include: {
    //             posts: true,
    //           },
    //         },
    //       },
    //     },
    //   },
    // });
    const query = await prisma.category.findMany({
      include: {
        posts: true,
      },
    });

    return res.status(200).json(query);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: error || "Internal Server Error" });
  }
};

export const addCategoryToPost = async (req: Request, res: Response) => {
  try {
    const { category } = req.body as { category: PostCategory };
    if (!Object.values(PostCategory).includes(category)) {
      return res.status(400).json({ error: "Invalid Category" });
    }

    const postId = req.params.postId;
    if (!postId) {
      return res.status(400).json({ error: "Invalid Post ID" });
    }

    const user = await prisma.category.create({
      data: {
        name: category,
        posts: {
          connect: { id: Number(postId) },
        },
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: error || "Internal Server Error" });
  }
};
export const categories = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: error || "Internal Server Error" });
  }
};
