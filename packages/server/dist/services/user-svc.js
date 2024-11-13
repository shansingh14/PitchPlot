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
  addUser: () => addUser,
  default: () => user_svc_default,
  deleteUser: () => deleteUser,
  getAllUsers: () => getAllUsers,
  getUserById: () => getUserById,
  updateUser: () => updateUser
});
module.exports = __toCommonJS(user_svc_exports);
var import_mongoose = require("mongoose");
const UserSchema = new import_mongoose.Schema(
  {
    id: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    profilePic: { type: String },
    bio: { type: String },
    createdAt: { type: Date, default: Date.now }
  },
  { collection: "users" }
);
const UserModel = (0, import_mongoose.model)("User", UserSchema);
async function getAllUsers() {
  return UserModel.find();
}
async function getUserById(id) {
  return UserModel.findById(id);
}
async function addUser(user) {
  return UserModel.create(user);
}
async function updateUser(id, update) {
  return UserModel.findByIdAndUpdate(id, update, { new: true });
}
async function deleteUser(id) {
  return UserModel.findByIdAndDelete(id);
}
var user_svc_default = { getAllUsers, getUserById, addUser, updateUser, deleteUser };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser
});
