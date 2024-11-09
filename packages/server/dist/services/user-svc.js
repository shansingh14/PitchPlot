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
  createUser: () => createUser,
  deleteUser: () => deleteUser,
  followUser: () => followUser,
  getAllUsers: () => getAllUsers,
  getUser: () => getUser,
  unfollowUser: () => unfollowUser,
  updateUser: () => updateUser
});
module.exports = __toCommonJS(user_svc_exports);
const users = [];
function createUser(user) {
  users.push(user);
}
function getUser(id) {
  return users.find((user) => user.id === id);
}
function getAllUsers() {
  return users;
}
function followUser(userId, followId) {
  const user = getUser(userId);
  const followUser2 = getUser(followId);
  if (user && followUser2 && !user.following.includes(followId)) {
    user.following.push(followId);
    followUser2.followers.push(userId);
  }
}
function unfollowUser(userId, unfollowId) {
  const user = getUser(userId);
  const unfollowUser2 = getUser(unfollowId);
  if (user && unfollowUser2) {
    user.following = user.following.filter((id) => id !== unfollowId);
    unfollowUser2.followers = unfollowUser2.followers.filter(
      (id) => id !== userId
    );
  }
}
function updateUser(id, updatedUser) {
  const user = getUser(id);
  if (user) {
    Object.assign(user, updatedUser);
    return true;
  }
  return false;
}
function deleteUser(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users.splice(index, 1);
    return true;
  }
  return false;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createUser,
  deleteUser,
  followUser,
  getAllUsers,
  getUser,
  unfollowUser,
  updateUser
});
