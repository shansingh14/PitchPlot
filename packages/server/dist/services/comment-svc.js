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
  default: () => comment_svc_default
});
module.exports = __toCommonJS(comment_svc_exports);
var import_mongoose = require("mongoose");
const CommentSchema = new import_mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    postId: { type: String, required: true },
    userId: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { collection: "comments" }
);
const CommentModel = (0, import_mongoose.model)("Comment", CommentSchema);
function index() {
  return CommentModel.find();
}
function get(commentId) {
  return CommentModel.findOne({ id: commentId }).exec();
}
var comment_svc_default = { index, get };
