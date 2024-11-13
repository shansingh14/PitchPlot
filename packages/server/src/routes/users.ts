
import express, { Request, Response } from "express";
import UserService from "../services/user-svc";
import { User } from "../models/user";

const router = express.Router();


router.get("/", (_, res: Response) => {
  UserService.index()
    .then((users: User[]) => res.json(users))
    .catch((err) => res.status(500).send(err));
});


router.get("/:userId", (req: Request, res: Response) => {
  const { userId } = req.params;

  UserService.getUserById(userId)
    .then((user: User | null) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((err) => res.status(500).send(err));
});


router.post("/", (req: Request, res: Response) => {
  UserService.createUser(req.body)
    .then((newUser: User) => res.status(201).json(newUser))
    .catch((err) => res.status(500).send(err));
});


router.put("/:userId", (req: Request, res: Response) => {
  const { userId } = req.params;

  UserService.updateUser(userId, req.body)
    .then((updatedUser: User | null) => {
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((err) => res.status(500).send(err));
});


router.delete("/:userId", (req: Request, res: Response) => {
  const { userId } = req.params;

  UserService.deleteUser(userId)
    .then((deleted) => {
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((err) => res.status(500).send(err));
});

export default router;

