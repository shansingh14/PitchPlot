import { Schema, model, Document, Types } from "mongoose";
import { Post } from "../models/post";

// Define Post schema with ObjectId types for creatorId and comments
const PostSchema = new Schema<Post>(
  {
    content: { type: String, required: true },
    image: { type: String, default: "" },
    userId: {
      type: Schema.Types.ObjectId as any,
      ref: "User",
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
    likesCount: { type: Number, default: 0 },
    comments: [{ type: Schema.Types.ObjectId as any, ref: "Comment" }], // Updated comments type
  },
  { collection: "posts" }
);

const PostModel = model<Post>("Post", PostSchema);

export async function getAllPosts() {
  return PostModel.find();
}

export async function getPostById(id: string) {
  return PostModel.findById(id);
}

export async function addPost(post: Post) {
  return PostModel.create(post);
}

export async function updatePost(id: string, update: Partial<Post>) {
  return PostModel.findByIdAndUpdate(id, update, { new: true });
}

export async function deletePost(id: string) {
  return PostModel.findByIdAndDelete(id);
}

export function getUserPosts(userId: string) {
  return PostModel.find({ userId: userId }).exec();
}

export default { getAllPosts, getPostById, addPost, updatePost, deletePost, getUserPosts};
