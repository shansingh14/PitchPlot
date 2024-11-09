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
var comment_svc_exports = {};
__export(comment_svc_exports, {
  addComment: () => addComment,
  deleteComment: () => deleteComment,
  getComments: () => getComments,
  updateComment: () => updateComment
});
module.exports = __toCommonJS(comment_svc_exports);
var import_post_svc = require("./post-svc");
const comments = [];
function addComment(comment) {
  comments.push(comment);
  const post = (0, import_post_svc.getPost)(comment.postId);
  if (post) {
    post.comments.push(comment);
  }
}
function getComments(postId) {
  return comments.filter((comment) => comment.postId === postId);
}
function updateComment(id, updatedComment) {
  const comment = comments.find((comment2) => comment2.id === id);
  if (comment) {
    Object.assign(comment, updatedComment);
    return true;
  }
  return false;
}
function deleteComment(id) {
  const index = comments.findIndex((comment) => comment.id === id);
  if (index !== -1) {
    comments.splice(index, 1);
    return true;
  }
  return false;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addComment,
  deleteComment,
  getComments,
  updateComment
});
