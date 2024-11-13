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
var user_svc_exports = {};
__export(user_svc_exports, {
  default: () => user_svc_default
});
module.exports = __toCommonJS(user_svc_exports);
var import_mongoose = require("mongoose");
const UserSchema = new import_mongoose.Schema({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  passwordHash: { type: String, required: true },
  profilePic: { type: String },
  bio: { type: String },
  createdAt: { type: Date, default: Date.now },
  friendsCount: { type: Number, default: 0 }
});
const UserModel = (0, import_mongoose.model)("User", UserSchema);
function index() {
  return UserModel.find().exec();
}
function getUserById(userId) {
  return UserModel.findOne({ id: userId }).exec();
}
function createUser(userData) {
  return UserModel.create(userData);
}
function updateUser(userId, updatedData) {
  return UserModel.findOneAndUpdate({ id: userId }, updatedData, { new: true }).exec();
}
function deleteUser(userId) {
  return UserModel.deleteOne({ id: userId }).exec();
}
var user_svc_default = { index, getUserById, createUser, updateUser, deleteUser };
