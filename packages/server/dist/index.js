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
var import_mongo = require("./services/mongo");
var import_user_svc = __toESM(require("./services/user-svc"));
var import_post_svc = __toESM(require("./services/post-svc"));
var import_comment_svc = __toESM(require("./services/comment-svc"));
var import_userProfilePage = require("./pages/userProfilePage");
var import_path = __toESM(require("path"));
const app = (0, import_express.default)();
const port = process.env.PORT || 3e3;
(0, import_mongo.connect)("PitchPlot");
const staticDir = import_path.default.join(__dirname, "../../proto/public");
app.use(import_express.default.static(staticDir));
app.get("/users", async (req, res) => {
  try {
    const users = await import_user_svc.default.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users." });
  }
});
app.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await import_user_svc.default.getUserById(id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: "User not found." });
  }
});
app.post("/user", async (req, res) => {
  try {
    const newUser = await import_user_svc.default.addUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user." });
  }
});
app.get("/posts", async (req, res) => {
  try {
    const posts = await import_post_svc.default.getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts." });
  }
});
app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await import_post_svc.default.getPostById(id);
    res.json(post);
  } catch (error) {
    res.status(404).json({ error: "Post not found." });
  }
});
app.post("/post", async (req, res) => {
  try {
    const newPost = await import_post_svc.default.addPost(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post." });
  }
});
app.get("/comments/:postId", async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await import_comment_svc.default.getCommentsByPostId(postId);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments." });
  }
});
app.post("/comment", async (req, res) => {
  try {
    const newComment = await import_comment_svc.default.addComment(req.body);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Failed to create comment." });
  }
});
app.route("/user/profile/:id").get(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await import_user_svc.default.getUserById(id);
    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }
    console.log(id);
    const posts = await import_post_svc.default.getUserPosts(id);
    console.log(posts);
    res.set("Content-Type", "text/html").send(import_userProfilePage.UserProfilePage.render({ user, posts }));
  } catch (error) {
    res.status(500).json({ error: "Failed to load user profile." });
  }
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
