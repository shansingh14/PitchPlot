"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_express = __toESM(require("express"));
var import_path = __toESM(require("path"));
var import_user_svc = require("./services/user-svc");
var import_post_svc = require("./services/post-svc");
var import_comment_svc = require("./services/comment-svc");
var import_userProfilePage = require("./pages/userProfilePage");
var import_mockusers = require("./mockusers");
var import_mockcomments = require("./mockcomments");
var import_mockposts = require("./mockposts");
const app = (0, import_express.default)();
const port = process.env.PORT || 3e3;
const staticDir = import_path.default.join(__dirname, "../../proto/public");
app.use(import_express.default.static(staticDir));
app.post("/register", (req, res) => {
  const user = req.body;
  (0, import_user_svc.createUser)(user);
  res.status(201).send("User registered");
});
app.get("/users", (req, res) => {
  const users = (0, import_user_svc.getAllUsers)();
  res.json(users);
});
app.get("/user/:userId", (req, res) => {
  const { userId } = req.params;
  const user = (0, import_user_svc.getUser)(userId);
  if (user) {
    const page = new import_userProfilePage.UserProfilePage(user);
    res.set("Content-Type", "text/html").send(page.render());
  } else {
    res.status(404).send("User not found");
  }
});
app.put("/user/:id", (req, res) => {
  const updatedUser = req.body;
  const success = (0, import_user_svc.updateUser)(req.params.id, updatedUser);
  success ? res.send("User updated") : res.status(404).send("User not found");
});
app.delete("/user/:id", (req, res) => {
  const success = (0, import_user_svc.deleteUser)(req.params.id);
  success ? res.send("User deleted") : res.status(404).send("User not found");
});
app.post("/user/:id/follow", (req, res) => {
  const { id } = req.params;
  const { followId } = req.body;
  (0, import_user_svc.followUser)(id, followId);
  res.send("User followed");
});
app.post("/user/:id/unfollow", (req, res) => {
  const { id } = req.params;
  const { unfollowId } = req.body;
  (0, import_user_svc.unfollowUser)(id, unfollowId);
  res.send("User unfollowed");
});
app.post("/post", (req, res) => {
  const post = req.body;
  (0, import_post_svc.createPost)(post);
  res.status(201).send("Post created");
});
app.get("/posts", (req, res) => {
  const posts = (0, import_post_svc.getAllPosts)();
  res.json(posts);
});
app.get("/post/:id", (req, res) => {
  const post = (0, import_post_svc.getPost)(req.params.id);
  post ? res.json(post) : res.status(404).send("Post not found");
});
app.put("/post/:id", (req, res) => {
  const updatedPost = req.body;
  const success = (0, import_post_svc.updatePost)(req.params.id, updatedPost);
  success ? res.send("Post updated") : res.status(404).send("Post not found");
});
app.delete("/post/:id", (req, res) => {
  const success = (0, import_post_svc.deletePost)(req.params.id);
  success ? res.send("Post deleted") : res.status(404).send("Post not found");
});
app.post("/post/:id/like", (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  (0, import_post_svc.likePost)(id, userId);
  res.send("Post liked");
});
app.post("/post/:id/unlike", (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  (0, import_post_svc.unlikePost)(id, userId);
  res.send("Post unliked");
});
app.get("/feed/:userId", (req, res) => {
  const user = (0, import_user_svc.getUser)(req.params.userId);
  if (user) {
    const feed = (0, import_post_svc.getFeed)(req.params.userId, user.following);
    res.json(feed);
  } else {
    res.status(404).send("User not found");
  }
});
app.post("/post/:id/comment", (req, res) => {
  const { id } = req.params;
  const comment = req.body;
  comment.postId = id;
  (0, import_comment_svc.addComment)(comment);
  res.status(201).send("Comment added");
});
app.get("/post/:id/comments", (req, res) => {
  const comments = (0, import_comment_svc.getComments)(req.params.id);
  res.json(comments);
});
app.put("/post/:postId/comment/:commentId", (req, res) => {
  const { commentId } = req.params;
  const updatedComment = req.body;
  const success = (0, import_comment_svc.updateComment)(commentId, updatedComment);
  success ? res.send("Comment updated") : res.status(404).send("Comment not found");
});
app.delete(
  "/post/:postId/comment/:commentId",
  (req, res) => {
    const { commentId } = req.params;
    const success = (0, import_comment_svc.deleteComment)(commentId);
    success ? res.send("Comment deleted") : res.status(404).send("Comment not found");
  }
);
import_mockusers.mockUsers.forEach((user) => (0, import_user_svc.createUser)(user));
import_mockposts.mockPosts.forEach((post) => (0, import_post_svc.createPost)(post));
import_mockcomments.mockComments.forEach((comment) => (0, import_comment_svc.addComment)(comment));
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
