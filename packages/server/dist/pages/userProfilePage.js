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
var import_post_svc = require("../services/post-svc");
class UserProfilePage {
  user;
  posts;
  constructor(user) {
    this.user = user;
    this.posts = (0, import_post_svc.getUserPosts)(user.id);
  }
  render() {
    return (0, import_renderPage.default)({
      body: this.renderBody(),
      stylesheets: ["/styles/profile.css"]
    });
  }
  renderBody() {
    const { username, profilePic, followers, following } = this.user;
    const postsList = this.posts.map((post) => this.renderPost(post));
    const postCount = this.posts.length;
    return import_server.html`
      <body>
        <main class="user-profile">
          <section class="user-info">
            <img
              src="${profilePic}"
              alt="${username}'s profile picture"
              class="profile-pic"
            />
            <h2>${username}</h2>
            <p>
              Followers: ${followers.length} | Following: ${following.length}
            </p>
            <p>Posts: ${postCount}</p>
            <!-- Display post count -->
          </section>
          <section class="user-posts">
            <h3>${username}'s Posts</h3>
            ${postsList}
          </section>
        </main>
      </body>
    `;
  }
  renderPost(post) {
    const createdAtFormatted = post.createdAt.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
    return import_server.html`
      <div class="post">
        <h4>${post.content}</h4>
        <p>${createdAtFormatted}</p>
        <p>Likes: ${post.likesCount}</p>
      </div>
    `;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserProfilePage
});
