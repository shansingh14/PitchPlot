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
var renderPage_exports = {};
__export(renderPage_exports, {
  default: () => renderPage
});
module.exports = __toCommonJS(renderPage_exports);
var import_server = require("@calpoly/mustang/server");
const defaults = {
  stylesheets: [
    "/styles/token.css",
    "/styles/navbar.css",
    "/styles/feedpage.css",
    "/styles/modal.css"
  ],
  scripts: [
    `import { define } from "@calpoly/mustang";
import { UserProfile } from "/scripts/user-profile.js";
import { FeedList } from "/scripts/feed-list.js";
import { NavBar } from "/scripts/nav-bar.js";
import { CreatePostButton } from "/scripts/create-post.js";
import { ModalComponent } from "/scripts/modal-component.js";
import { UserPost } from "/scripts/user-post.js";

define({
  "user-profile": UserProfile,
  "feed-list": FeedList,
  "nav-bar": NavBar,
  "create-post": CreatePostButton,
  "modal-component": ModalComponent,
  "user-post" : UserPost,
});
    `
  ],
  googleFontURL: "https://fonts.googleapis.com/css2?family=Kanit:wght@400;700&display=swap",
  imports: {
    "@calpoly/mustang": "https://unpkg.com/@calpoly/mustang"
  }
};
function renderPage(page) {
  return (0, import_server.renderWithDefaults)(page, defaults);
}
