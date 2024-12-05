// src/routes/posts.ts
import express, { Request, Response } from "express";
import PostService from "../services/post-svc";
import { Post } from "../models/post";
import { Types } from "mongoose";
import { CommentModel } from "../services/comment-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
  PostService.index()
    .then((posts: Post[]) => res.json(posts))
    .catch((err) => res.status(500).send(err));
});

router.get("/user/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const posts = await PostService.getUserPosts(userId)
    res.json(posts);
  } catch (error) {
    res.status(500).send("Error retrieving posts");
  }
});

router.get("/:postId", (req: Request, res: Response) => {
  const { postId } = req.params;

  PostService.getPostById(postId)
    .then((post: Post | null) => {
      if (post) {
        res.json(post);
      } else {
        res.status(404).send("Post not found");
      }
    })
    .catch((err) => res.status(500).send(err));
});

router.get("/:postId/comments", async (req: Request, res: Response) => {
  const { postId } = req.params;

  try {
    const comments = await PostService.getCommentsByPost(postId);
    res.status(200).json(comments); // Respond with the fetched comments
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

router.post("/", (req: Request, res: Response) => {
  PostService.createPost(req.body)
    .then((newPost: Post) => res.status(201).json(newPost))
    .catch((err) => res.status(500).send(err));
});

router.put("/:postId", (req: Request, res: Response) => {
  const { postId } = req.params;

  PostService.updatePost(postId, req.body)
    .then((updatedPost: Post | null) => {
      if (updatedPost) {
        res.json(updatedPost);
      } else {
        res.status(404).send("Post not found");
      }
    })
    .catch((err) => res.status(500).send(err));
});

router.delete("/:postId", (req: Request, res: Response) => {
  const { postId } = req.params;

  PostService.deletePost(postId)
    .then((deleted) => {
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).send("Post not found");
      }
    })
    .catch((err) => res.status(500).send(err));
});

router.post("/:postId/comments", async (req: Request, res: Response) => {
  const { postId } = req.params;
  const { userId, content } = req.body;

  if (!content || !userId) {
    res.status(400).json({ error: "Content and userId are required" });
  }

  try {
  
    // Create a new comment
    const newComment = new CommentModel({
      id: "comment" + Math.floor(Math.random() * 10000),
      postId,
      userId,
      content,
      createdAt: new Date(),
    });

    // Save the comment to the database
    const savedComment = await newComment.save();

    if (!savedComment) {
      res.status(500).json({ error: "_id is not assigned" });
    } else {
      await PostService.addCommentToPost(postId, savedComment);
    }
    
    res.status(201).json(savedComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    console.log(postId, userId, content);
    res.status(500).json({ error: "Failed to create comment" });
  }
});




export default router;
