"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var post_svc_exports = {};
__export(post_svc_exports, {
  default: () => post_svc_default
});
module.exports = __toCommonJS(post_svc_exports);
var import_mongoose = require("mongoose");
var import_comment_svc = require("./comment-svc");
const PostSchema = new import_mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: Buffer, default: null },
  createdAt: { type: Date, default: Date.now },
  likesCount: { type: Number, default: 0 },
  likedBy: [{ type: String }],
  comments: [{ type: import_mongoose.Schema.Types.ObjectId, ref: "Comment" }]
});
const PostModel = (0, import_mongoose.model)("Post", PostSchema);
async function getUserPosts(userId) {
  const posts = await PostModel.find({ userId }).exec();
  console.log("backend");
  console.log(posts.map((post) => post.image));
  return posts.map((post) => ({
    id: post.id,
    userId: post.userId,
    content: post.content,
    image: post.image ? post.image.toString("base64").startsWith("data:image/") ? post.image.toString("base64") : `data:image/jpeg;base64,${post.image.toString("base64")}` : null,
    createdAt: post.createdAt,
    likesCount: post.likesCount,
    likedBy: post.likedBy,
    comments: post.comments
  }));
}
function addPost(newPost) {
  return PostModel.create(newPost);
}
function index() {
  return PostModel.find().exec();
}
function getPostById(postId) {
  return PostModel.findOne({ id: postId }).exec();
}
function createPost(postData) {
  return PostModel.create(postData);
}
function updatePost(postId, updatedData) {
  return PostModel.findOneAndUpdate({ id: postId }, updatedData, { new: true }).exec();
}
function deletePost(postId) {
  return PostModel.deleteOne({ id: postId }).exec();
}
function addCommentToPost(postId, commentId) {
  return PostModel.findOneAndUpdate(
    { id: postId },
    { $push: { comments: commentId._id } },
    { new: true }
  ).exec().then((updatedPost) => {
    if (!updatedPost) {
      console.error(`No post found with id: ${postId}`);
      return null;
    }
    console.log("Updated Post:", updatedPost);
    return updatedPost;
  }).catch((error) => {
    console.error("Error updating post:", error);
    throw error;
  });
}
async function getCommentsByPost(postId) {
  try {
    const post = await PostModel.findOne({ id: postId }).exec();
    if (!post) {
      throw new Error(`Post with id ${postId} not found`);
    }
    const comments = await import_comment_svc.CommentModel.find({
      _id: { $in: post.comments }
    }).exec();
    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
}
var post_svc_default = {
  index,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getUserPosts,
  addPost,
  addCommentToPost,
  getCommentsByPost
};
