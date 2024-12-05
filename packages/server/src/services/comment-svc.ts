import { Schema, Types, model } from "mongoose";
import { PostComment } from "../models/comment";

const CommentSchema = new Schema<PostComment>(
  {
    id: { type: String, required: true , unique: true},
    postId: { type: String, required: true },
    userId: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "comments" }
);

export const CommentModel = model<PostComment>("Comment", CommentSchema);

function index(): Promise<Comment[]> {
  return CommentModel.find();
}

function get(commentId: string): Promise<PostComment | null> {
  return CommentModel.findOne({ id: commentId }).exec();
}

function create(commentData: PostComment): Promise<PostComment> {
  const comment = new CommentModel(commentData);
  return comment.save();
}

function getCommentsByPost(postId: string): Promise<PostComment[]> {
  return CommentModel.find({ postId }).exec();
}

export default { index, get, create, getCommentsByPost };

