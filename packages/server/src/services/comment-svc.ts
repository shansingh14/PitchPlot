import { Schema, model, Types } from "mongoose";
import { PostComment } from "../models/comment";

// Define the Mongoose schema for the comment directly within the service file
const CommentSchema = new Schema<PostComment>(
  {
    postId: { type: Schema.Types.String, ref: "Post", required: true },
    userId: { type: Schema.Types.String, ref: "User", required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "comments" }
);

const CommentModel = model<PostComment>("Comment", CommentSchema);

export async function getCommentsByPostId(postId: string) {
  return CommentModel.find({ postId });
}

export async function addComment(comment: PostComment) {
  return CommentModel.create(comment);
}

export async function deleteComment(id: string) {
  return CommentModel.findByIdAndDelete(id);
}

export default { getCommentsByPostId, addComment, deleteComment };
