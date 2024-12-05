"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var userProfilePage_exports = {};
__export(userProfilePage_exports, {
  UserProfilePage: () => UserProfilePage
});
module.exports = __toCommonJS(userProfilePage_exports);
var import_renderPage = __toESM(require("./renderPage"));
var import_server = require("@calpoly/mustang/server");
class UserProfilePage {
  static render({ userId }) {
    return (0, import_renderPage.default)({
      body: import_server.html`
        <nav-bar></nav-bar>
        <user-profile src="/api/users/${userId}"></user-profile>
        <feed-list src="/api/posts"></feed-list>
      `,
      scripts: [
        `
        import { define } from "@calpoly/mustang";
        import { UserPost } from "/scripts/user-post.js";

        define({
          "user-post": UserPost,
        });
        `
      ],
      stylesheets: [
        "/styles/profile.css",
        "/styles/navbar.css",
        "/styles/token.css"
      ]
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserProfilePage
});
