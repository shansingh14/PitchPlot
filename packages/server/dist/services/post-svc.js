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
  createPost: () => createPost,
  deletePost: () => deletePost,
  getAllPosts: () => getAllPosts,
  getFeed: () => getFeed,
  getPost: () => getPost,
  getUserPosts: () => getUserPosts,
  likePost: () => likePost,
  unlikePost: () => unlikePost,
  updatePost: () => updatePost
});
module.exports = __toCommonJS(post_svc_exports);
const posts = [];
function createPost(post) {
  posts.push(post);
}
function getPost(id) {
  return posts.find((post) => post.id === id);
}
function getFeed(userId, following) {
  return posts.filter((post) => following.includes(post.userId));
}
function getUserPosts(userId) {
  return posts.filter((post) => post.userId === userId);
}
function getAllPosts() {
  return posts;
}
function likePost(postId, userId) {
  const post = getPost(postId);
  if (post && !post.likedBy.includes(userId)) {
    post.likedBy.push(userId);
    post.likesCount++;
  }
}
function unlikePost(postId, userId) {
  const post = getPost(postId);
  if (post && post.likedBy.includes(userId)) {
    post.likedBy = post.likedBy.filter((id) => id !== userId);
    post.likesCount--;
  }
}
function updatePost(id, updatedPost) {
  const post = getPost(id);
  if (post) {
    Object.assign(post, updatedPost);
    return true;
  }
  return false;
}
function deletePost(id) {
  const index = posts.findIndex((post) => post.id === id);
  if (index !== -1) {
    posts.splice(index, 1);
    return true;
  }
  return false;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createPost,
  deletePost,
  getAllPosts,
  getFeed,
  getPost,
  getUserPosts,
  likePost,
  unlikePost,
  updatePost
});
