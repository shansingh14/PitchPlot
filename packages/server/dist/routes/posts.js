"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var posts_exports = {};
__export(posts_exports, {
  default: () => posts_default
});
module.exports = __toCommonJS(posts_exports);
var import_express = __toESM(require("express"));
var import_post_svc = __toESM(require("../services/post-svc"));
var import_comment_svc = require("../services/comment-svc");
const router = import_express.default.Router();
router.get("/", (_, res) => {
  import_post_svc.default.index().then((posts) => res.json(posts)).catch((err) => res.status(500).send(err));
});
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const posts = await import_post_svc.default.getUserPosts(userId);
    res.json(posts);
  } catch (error) {
    res.status(500).send("Error retrieving posts");
  }
});
router.get("/:postId", (req, res) => {
  const { postId } = req.params;
  import_post_svc.default.getPostById(postId).then((post) => {
    if (post) {
      res.json(post);
    } else {
      res.status(404).send("Post not found");
    }
  }).catch((err) => res.status(500).send(err));
});
router.get("/:postId/comments", async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await import_post_svc.default.getCommentsByPost(postId);
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});
router.post("/", (req, res) => {
  import_post_svc.default.createPost(req.body).then((newPost) => res.status(201).json(newPost)).catch((err) => res.status(500).send(err));
});
router.put("/:postId", (req, res) => {
  const { postId } = req.params;
  import_post_svc.default.updatePost(postId, req.body).then((updatedPost) => {
    if (updatedPost) {
      res.json(updatedPost);
    } else {
      res.status(404).send("Post not found");
    }
  }).catch((err) => res.status(500).send(err));
});
router.delete("/:postId", (req, res) => {
  const { postId } = req.params;
  import_post_svc.default.deletePost(postId).then((deleted) => {
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).send("Post not found");
    }
  }).catch((err) => res.status(500).send(err));
});
router.post("/:postId/comments", async (req, res) => {
  const { postId } = req.params;
  const { userId, content } = req.body;
  if (!content || !userId) {
    res.status(400).json({ error: "Content and userId are required" });
  }
  try {
    const newComment = new import_comment_svc.CommentModel({
      id: "comment" + Math.floor(Math.random() * 1e4),
      postId,
      userId,
      content,
      createdAt: /* @__PURE__ */ new Date()
    });
    const savedComment = await newComment.save();
    if (!savedComment) {
      res.status(500).json({ error: "_id is not assigned" });
    } else {
      await import_post_svc.default.addCommentToPost(postId, savedComment);
    }
    res.status(201).json(savedComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    console.log(postId, userId, content);
    res.status(500).json({ error: "Failed to create comment" });
  }
});
var posts_default = router;
