"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_express = __toESM(require("express"));
var import_path = __toESM(require("path"));
var import_userProfilePage = require("./pages/userProfilePage");
var import_feedPage = require("./pages/feedPage");
var import_user_svc = __toESM(require("./services/user-svc"));
var import_post_svc = __toESM(require("./services/post-svc"));
var import_mongo = require("./services/mongo");
var import_users = __toESM(require("./routes/users"));
var import_posts = __toESM(require("./routes/posts"));
var import_auth = __toESM(require("./routes/auth"));
var import_auth2 = require("./pages/auth");
const app = (0, import_express.default)();
const port = process.env.PORT || 3e3;
(0, import_mongo.connect)("PitchPlot");
app.use(import_express.default.json({ limit: "30mb" }));
const staticDir = import_path.default.join(__dirname, "../../proto/public");
app.use(import_express.default.static(staticDir));
console.log("Serving static files from:", staticDir);
app.use(import_express.default.json());
app.use("/auth", import_auth.default);
app.use("/api/users", import_auth.authenticateUser, import_users.default);
app.use("/api/posts", import_auth.authenticateUser, import_posts.default);
app.get("/login", (req, res) => {
  const page = new import_auth2.LoginPage();
  res.set("Content-Type", "text/html").send(page.render());
});
app.get("/feed", (req, res) => {
  const feedPage = import_feedPage.FeedPage.render();
  res.set("Content-Type", "text/html").send(feedPage);
});
app.get("/profile/:userId", (req, res) => {
  const { userId } = req.params;
  import_user_svc.default.getUserById(userId).then((user) => {
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    return import_post_svc.default.getUserPosts(userId).then((posts) => {
      const profilePage = import_userProfilePage.UserProfilePage.render({ userId });
      res.set("Content-Type", "text/html").send(profilePage);
    });
  }).catch((error) => {
    console.error("Error fetching data:", error);
    res.status(500).send("An error occurred while loading the profile");
  });
});
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
app.post(
  "/api/posts",
  asyncHandler(async (req, res) => {
    const { userId, content, image, link } = req.body;
    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }
    const imageBuffer = image ? Buffer.from(image, "base64") : void 0;
    console.log(image);
    console.log(imageBuffer);
    const newPost = {
      id: (Math.random() * 1e5).toString(),
      userId,
      content,
      image: imageBuffer,
      link: link || null,
      createdAt: /* @__PURE__ */ new Date(),
      likesCount: 0,
      likedBy: [],
      comments: []
    };
    const savedPost = await import_post_svc.default.addPost(newPost);
    res.status(201).json(savedPost);
  })
);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
