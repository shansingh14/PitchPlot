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
var mockposts_exports = {};
__export(mockposts_exports, {
  mockPosts: () => mockPosts
});
module.exports = __toCommonJS(mockposts_exports);
const mockPosts = [
  {
    id: "101",
    userId: "1",
    content: "Exploring Wonderland!",
    imageUrl: "https://example.com/wonderland.jpg",
    createdAt: /* @__PURE__ */ new Date(),
    likesCount: 2,
    likedBy: ["2", "3"],
    comments: []
  },
  {
    id: "102",
    userId: "2",
    content: "Can we fix it? Yes, we can!",
    createdAt: /* @__PURE__ */ new Date(),
    likesCount: 1,
    likedBy: ["1"],
    comments: []
  },
  {
    id: "103",
    userId: "3",
    content: "Silent movies are a lost art.",
    imageUrl: "https://example.com/charlie.jpg",
    createdAt: /* @__PURE__ */ new Date(),
    likesCount: 0,
    likedBy: [],
    comments: []
  },
  {
    id: "104",
    userId: "1",
    content: "Another day in Wonderland!",
    createdAt: /* @__PURE__ */ new Date(),
    likesCount: 1,
    likedBy: ["2"],
    comments: []
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mockPosts
});
