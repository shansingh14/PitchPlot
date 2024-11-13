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
const PostSchema = new import_mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  likesCount: { type: Number, default: 0 },
  likedBy: [{ type: String }],
  comments: [{ type: String }]
});
const PostModel = (0, import_mongoose.model)("Post", PostSchema);
function getUserPosts(userId) {
  return PostModel.find({ userId }).exec();
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
var post_svc_default = {
  index,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getUserPosts,
  addPost
};
