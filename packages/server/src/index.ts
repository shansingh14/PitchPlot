// src/index.ts
import express, { NextFunction } from "express";
import { Request, Response, Application } from "express";
import path from "path";
import { UserProfilePage } from "./pages/userProfilePage";
import { FeedPage } from "./pages/feedPage";
import UserService from "./services/user-svc";
import PostService from "./services/post-svc";
import { connect } from "./services/mongo";
import usersRouter from "./routes/users";
import postsRouter from "./routes/posts";
import auth, { authenticateUser } from "./routes/auth";
import { LoginPage } from "./pages/auth";
import jwt from "jsonwebtoken";

const app = express();
const port = process.env.PORT || 3000;

connect("PitchPlot");

app.use(express.json({ limit: "30mb" }));

const staticDir = path.join(__dirname, "../../proto/public");
app.use(express.static(staticDir));

console.log("Serving static files from:", staticDir);

app.use(express.json());
app.use("/auth", auth);
app.use("/api/users", authenticateUser, usersRouter);
app.use("/api/posts", authenticateUser, postsRouter);


app.get("/login", (req: Request, res: Response) => {
  const page = new LoginPage();
  res.set("Content-Type", "text/html").send(page.render());
});

app.get("/feed", (req: Request, res: Response) => {
  const feedPage = FeedPage.render();
  res.set("Content-Type", "text/html").send(feedPage);
});


app.get("/profile/:userId", (req: Request, res: Response) => {
  const { userId } = req.params;

  UserService.getUserById(userId)
    .then((user) => {
      if (!user) {
        res.status(404).send("User not found");
        return;
      }

      return PostService.getUserPosts(userId).then((posts) => {
        const profilePage = UserProfilePage.render({ userId });
        res.set("Content-Type", "text/html").send(profilePage);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).send("An error occurred while loading the profile");
    });
});

const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

app.post(
  "/api/posts",
  asyncHandler(async (req: Request, res: Response) => {
    const {userId, content, image, link } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }
    const imageBuffer = image ? Buffer.from(image, "base64") : undefined;

    console.log(image);
    console.log(imageBuffer);

    const newPost = {
      id: (Math.random() * 100000).toString(),
      userId,
      content,
      image: imageBuffer,
      link: link || null,
      createdAt: new Date(),
      likesCount: 0,
      likedBy: [],
      comments: [],
    };

    const savedPost = await PostService.addPost(newPost);
    res.status(201).json(savedPost);
  })
);

app.put("/api/users/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { bio, location } = req.body;

  if (!bio && !location) {
    res
      .status(400)
      .json({ error: "At least one field (bio or location) is required." });
  }

  try {
    const updatedUser = await UserService.updateUser(userId, { bio, location });
    if (!updatedUser) {
      res.status(404).json({ error: "User not found." });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user information." });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
