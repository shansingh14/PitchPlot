import { Schema, model, Types, Document } from "mongoose";

export interface PostComment extends Document {
  id: string
  postId: string;
  userId: string;
  content: string;
  createdAt: Date;
}
