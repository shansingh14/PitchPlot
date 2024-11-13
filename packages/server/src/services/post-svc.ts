import { Schema, model } from "mongoose";
import { Post } from "../models/post";


const PostSchema = new Schema<Post>({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  likesCount: { type: Number, default: 0 },
  likedBy: [{ type: String }],
  comments: [{ type: String }],
});

const PostModel = model<Post>("Post", PostSchema);

function getUserPosts(userId: string): Promise<Post[]> {
  return PostModel.find({ userId }).exec();
}

function addPost(newPost: Post): Promise<Post> {
  return PostModel.create(newPost);
}

function index(): Promise<Post[]> {
  return PostModel.find().exec();
}

function getPostById(postId: string): Promise<Post | null> {
  return PostModel.findOne({ id: postId }).exec();
}

function createPost(postData: Partial<Post>): Promise<Post> {
  return PostModel.create(postData);
}

function updatePost(postId: string, updatedData: Partial<Post>): Promise<Post | null> {
  return PostModel.findOneAndUpdate({ id: postId }, updatedData, { new: true }).exec();
}

function deletePost(postId: string): Promise<{ deletedCount?: number }> {
  return PostModel.deleteOne({ id: postId }).exec();
}

export default {
  index,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getUserPosts,
  addPost,
};
