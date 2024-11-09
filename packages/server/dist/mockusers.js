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
var mockusers_exports = {};
__export(mockusers_exports, {
  mockUsers: () => mockUsers
});
module.exports = __toCommonJS(mockusers_exports);
const mockUsers = [
  {
    id: "1",
    username: "alice_wonder",
    email: "alice@example.com",
    passwordHash: "hashed_password_1",
    profilePic: "https://example.com/alice.jpg",
    createdAt: /* @__PURE__ */ new Date(),
    following: ["2", "3"],
    followers: ["2"]
  },
  {
    id: "2",
    username: "bob_builder",
    email: "bob@example.com",
    passwordHash: "hashed_password_2",
    profilePic: "https://example.com/bob.jpg",
    createdAt: /* @__PURE__ */ new Date(),
    following: ["1"],
    followers: ["1", "3"]
  },
  {
    id: "3",
    username: "charlie_chaplin",
    email: "charlie@example.com",
    passwordHash: "hashed_password_3",
    profilePic: "https://example.com/charlie.jpg",
    createdAt: /* @__PURE__ */ new Date(),
    following: ["1", "2"],
    followers: []
  },
  {
    id: "4",
    username: "diana_prince",
    email: "diana@example.com",
    passwordHash: "hashed_password_4",
    profilePic: "https://example.com/diana.jpg",
    createdAt: /* @__PURE__ */ new Date(),
    following: [],
    followers: []
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mockUsers
});
