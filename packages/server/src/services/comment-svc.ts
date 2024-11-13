import { Schema, model } from "mongoose";
import { PostComment } from "../models/comment";

const CommentSchema = new Schema<PostComment>(
  {
    id: { type: String, required: true, unique: true },
    postId: { type: String, required: true },
    userId: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "comments" }
);

const CommentModel = model<Comment>("Comment", CommentSchema);

function index(): Promise<Comment[]> {
  return CommentModel.find();
}

function get(commentId: string): Promise<Comment | null> {
  return CommentModel.findOne({ id: commentId }).exec();
}

export default { index, get };
