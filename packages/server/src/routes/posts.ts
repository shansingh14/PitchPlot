// src/routes/posts.ts
import express, { Request, Response } from "express";
import PostService from "../services/post-svc";
import { Post } from "../models/post";

const router = express.Router();

router.get("/", (_, res: Response) => {
  PostService.index()
    .then((posts: Post[]) => res.json(posts))
    .catch((err) => res.status(500).send(err));
});

router.get("/user/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const posts = await PostService.getUserPosts(userId);
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

export default router;
