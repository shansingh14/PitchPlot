// src/index.ts
import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import UserService from "./services/user-svc";
import PostService from "./services/post-svc";
import CommentService from "./services/comment-svc";
import { UserProfilePage } from "./pages/userProfilePage";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;

connect("PitchPlot");

const staticDir = path.join(__dirname, "../../proto/public");
app.use(express.static(staticDir));

// User routes
app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users." });
  }
});

app.get("/user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await UserService.getUserById(id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: "User not found." });
  }
});

app.post("/user", async (req: Request, res: Response) => {
  try {
    const newUser = await UserService.addUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user." });
  }
});

// Post routes
app.get("/posts", async (req: Request, res: Response) => {
  try {
    const posts = await PostService.getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts." });
  }
});

app.get("/post/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await PostService.getPostById(id);
    res.json(post);
  } catch (error) {
    res.status(404).json({ error: "Post not found." });
  }
});

app.post("/post", async (req: Request, res: Response) => {
  try {
    const newPost = await PostService.addPost(req.body);
    console.log(req.body);
    console.log(res);
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create post." });
  }
});

// Comment routes
app.get("/comments/:postId", async (req: Request, res: Response) => {
  const { postId } = req.params;
  try {
    const comments = await CommentService.getCommentsByPostId(postId);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments." });
  }
});

app.post("/comment", async (req: Request, res: Response) => {
  try {
    const newComment = await CommentService.addComment(req.body);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Failed to create comment." });
  }
});

app
  .route("/user/profile/:id")
  .get(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const user = await UserService.getUserById(id);
      if (!user) {
        res.status(404).json({ error: "User not found." });
        return;
      }
      console.log(id)
      const posts = await PostService.getUserPosts(id);
      console.log(posts)
      res
        .set("Content-Type", "text/html")
        .send(UserProfilePage.render({ user, posts }));
    } catch (error) {
      res.status(500).json({ error: "Failed to load user profile." });
    }
  });



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
