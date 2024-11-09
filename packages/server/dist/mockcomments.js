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
var mockcomments_exports = {};
__export(mockcomments_exports, {
  mockComments: () => mockComments
});
module.exports = __toCommonJS(mockcomments_exports);
const mockComments = [
  {
    id: "201",
    userId: "2",
    postId: "101",
    content: "Looks amazing, Alice!",
    createdAt: /* @__PURE__ */ new Date()
  },
  {
    id: "202",
    userId: "1",
    postId: "102",
    content: "Thanks, Bob!",
    createdAt: /* @__PURE__ */ new Date()
  },
  {
    id: "203",
    userId: "3",
    postId: "104",
    content: "Wonderland never gets old.",
    createdAt: /* @__PURE__ */ new Date()
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mockComments
});
