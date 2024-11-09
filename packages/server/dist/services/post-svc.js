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
  addPost: () => addPost,
  default: () => post_svc_default,
  deletePost: () => deletePost,
  getAllPosts: () => getAllPosts,
  getPostById: () => getPostById,
  getUserPosts: () => getUserPosts,
  updatePost: () => updatePost
});
module.exports = __toCommonJS(post_svc_exports);
var import_mongoose = require("mongoose");
const PostSchema = new import_mongoose.Schema(
  {
    content: { type: String, required: true },
    image: { type: String, default: "" },
    userId: {
      type: import_mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    createdAt: { type: Date, default: Date.now },
    likesCount: { type: Number, default: 0 },
    comments: [{ type: import_mongoose.Schema.Types.ObjectId, ref: "Comment" }]
    // Updated comments type
  },
  { collection: "posts" }
);
const PostModel = (0, import_mongoose.model)("Post", PostSchema);
async function getAllPosts() {
  return PostModel.find();
}
async function getPostById(id) {
  return PostModel.findById(id);
}
async function addPost(post) {
  return PostModel.create(post);
}
async function updatePost(id, update) {
  return PostModel.findByIdAndUpdate(id, update, { new: true });
}
async function deletePost(id) {
  return PostModel.findByIdAndDelete(id);
}
function getUserPosts(userId) {
  return PostModel.find({ userId }).exec();
}
var post_svc_default = { getAllPosts, getPostById, addPost, updatePost, deletePost, getUserPosts };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addPost,
  deletePost,
  getAllPosts,
  getPostById,
  getUserPosts,
  updatePost
});
