
import express, { Request, Response } from "express";
import path from "path";
import { User } from "./models/user";
import { Post } from "./models/post";
import { PostComment } from "./models/comment";
import {
  createUser,
  followUser,
  unfollowUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "./services/user-svc";
import {
  createPost,
  getFeed,
  likePost,
  unlikePost,
  getPost,
  getAllPosts,
  updatePost,
  deletePost,
} from "./services/post-svc";
import {
  addComment,
  getComments,
  deleteComment,
  updateComment,
} from "./services/comment-svc";
import { UserProfilePage } from "./pages/userProfilePage";
import { mockUsers } from "./mockusers";
import { mockComments } from "./mockcomments";
import { mockPosts } from "./mockposts";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = path.join(__dirname, "../../proto/public");
app.use(express.static(staticDir));

app.post("/register", (req: Request, res: Response) => {
  const user: User = req.body;
  createUser(user);
  res.status(201).send("User registered");
});


app.get("/users", (req: Request, res: Response) => {
  const users = getAllUsers();
  res.json(users);
});

app.get("/user/:userId", (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = getUser(userId);
  if (user) {
    const page = new UserProfilePage(user);
    res.set("Content-Type", "text/html").send(page.render());
  } else {
    res.status(404).send("User not found");
  }
});

app.put("/user/:id", (req: Request, res: Response) => {
  const updatedUser = req.body;
  const success = updateUser(req.params.id, updatedUser);
  success ? res.send("User updated") : res.status(404).send("User not found");
});


app.delete("/user/:id", (req: Request, res: Response) => {
  const success = deleteUser(req.params.id);
  success ? res.send("User deleted") : res.status(404).send("User not found");
});


app.post("/user/:id/follow", (req: Request, res: Response) => {
  const { id } = req.params;
  const { followId } = req.body;
  followUser(id, followId);
  res.send("User followed");
});


app.post("/user/:id/unfollow", (req: Request, res: Response) => {
  const { id } = req.params;
  const { unfollowId } = req.body;
  unfollowUser(id, unfollowId);
  res.send("User unfollowed");
});

app.post("/post", (req: Request, res: Response) => {
  const post: Post = req.body;
  createPost(post);
  res.status(201).send("Post created");
});

app.get("/posts", (req: Request, res: Response) => {
  const posts = getAllPosts();
  res.json(posts);
});

app.get("/post/:id", (req: Request, res: Response) => {
  const post = getPost(req.params.id);
  post ? res.json(post) : res.status(404).send("Post not found");
});

app.put("/post/:id", (req: Request, res: Response) => {
  const updatedPost = req.body;
  const success = updatePost(req.params.id, updatedPost);
  success ? res.send("Post updated") : res.status(404).send("Post not found");
});

app.delete("/post/:id", (req: Request, res: Response) => {
  const success = deletePost(req.params.id);
  success ? res.send("Post deleted") : res.status(404).send("Post not found");
});

app.post("/post/:id/like", (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.body;
  likePost(id, userId);
  res.send("Post liked");
});

app.post("/post/:id/unlike", (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.body;
  unlikePost(id, userId);
  res.send("Post unliked");
});

app.get("/feed/:userId", (req: Request, res: Response) => {
  const user = getUser(req.params.userId);
  if (user) {
    const feed = getFeed(req.params.userId, user.following);
    res.json(feed);
  } else {
    res.status(404).send("User not found");
  }
});

app.post("/post/:id/comment", (req: Request, res: Response) => {
  const { id } = req.params;
  const comment: PostComment = req.body;
  comment.postId = id;
  addComment(comment);
  res.status(201).send("Comment added");
});

app.get("/post/:id/comments", (req: Request, res: Response) => {
  const comments = getComments(req.params.id);
  res.json(comments);
});

app.put("/post/:postId/comment/:commentId", (req: Request, res: Response) => {
  const { commentId } = req.params;
  const updatedComment = req.body;
  const success = updateComment(commentId, updatedComment);
  success
    ? res.send("Comment updated")
    : res.status(404).send("Comment not found");
});

app.delete(
  "/post/:postId/comment/:commentId",
  (req: Request, res: Response) => {
    const { commentId } = req.params;
    const success = deleteComment(commentId);
    success
      ? res.send("Comment deleted")
      : res.status(404).send("Comment not found");
  }
);


mockUsers.forEach(user => createUser(user));
mockPosts.forEach(post => createPost(post));
mockComments.forEach(comment => addComment(comment));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
