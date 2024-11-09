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
var import_server = require("@calpoly/mustang/server");
var import_renderPage = __toESM(require("./renderPage"));
class UserProfilePage {
  static render(data) {
    return (0, import_renderPage.default)({
      body: this.renderBody(data),
      stylesheets: ["/styles/profile.css"],
      scripts: ["/scripts/user-post.js"]
    });
  }
  static renderBody({ user, posts }) {
    return import_server.html`
      <main class="profile-page">
        <section class="user-info">
          <h1>${user.username}</h1>
          <p>${user.bio}</p>
          <p>Joined: ${user.createdAt.toDateString()}</p>
        </section>

        <section class="user-posts">
          <h2>${user.username}'s Posts</h2>
          ${posts.length > 0 ? posts.map((post) => this.renderPost(post)) : import_server.html`<p>No posts yet.</p>`}
        </section>
      </main>
    `;
  }
  static renderPost(post) {
    return import_server.html`
      <article class="post">
        <h3>${post.id}</h3>
        <p>${post.content}</p>
        <p>Posted on: ${post.createdAt.toDateString()}</p>
        <p>${post.likesCount} Likes, ${post.comments.length} Comments</p>
      </article>
    `;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserProfilePage
});
