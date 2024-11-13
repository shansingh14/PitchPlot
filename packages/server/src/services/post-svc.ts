import { Schema, model, Document, Types } from "mongoose";
import { Post } from "../models/post";

const PostSchema = new Schema<Post>(
  {
    id: { type: String },
    userId: {type: String},
    content: { type: String},
    image: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
    likesCount: { type: Number, default: 0 },
    likedBy: [{ type: Schema.Types.ObjectId as any, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId as any, ref: "Comment" }],
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
