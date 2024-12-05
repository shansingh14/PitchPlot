import { Schema, Types, model } from "mongoose";
import { Post } from "../models/post";
import { PostComment } from "models";
import { CommentModel } from "./comment-svc";



const PostSchema = new Schema<Post>({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: Buffer, default: null },
  createdAt: { type: Date, default: Date.now },
  likesCount: { type: Number, default: 0 },
  likedBy: [{ type: String }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

const PostModel = model<Post>("Post", PostSchema);

async function getUserPosts(userId: string): Promise<Post[]> {
  const posts = await PostModel.find({ userId }).exec();
  console.log("backend")
  console.log(posts.map((post) => post.image));
  return posts.map((post) => ({
    id: post.id,
    userId: post.userId,
    content: post.content,
    image: post.image
      ? post.image.toString("base64").startsWith("data:image/")
        ? post.image.toString("base64")
        : `data:image/jpeg;base64,${post.image.toString("base64")}`
      : null,
    createdAt: post.createdAt,
    likesCount: post.likesCount,
    likedBy: post.likedBy,
    comments: post.comments,
  }));
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

function addCommentToPost(postId: string, commentId: PostComment) {
  return PostModel.findOneAndUpdate(
    { id: postId },
    { $push: { comments: commentId._id } },
    { new: true }
  )
    .exec()
    .then((updatedPost) => {
      if (!updatedPost) {
        console.error(`No post found with id: ${postId}`);
        return null;
      }
      console.log("Updated Post:", updatedPost);
      return updatedPost;
    })
    .catch((error) => {
      console.error("Error updating post:", error);
      throw error;
    });
}

async function getCommentsByPost(postId: string): Promise<PostComment[]> {
  try {
    const post = await PostModel.findOne({ id: postId }).exec();

    if (!post) {
      throw new Error(`Post with id ${postId} not found`);
    }

    // If comments are ObjectIds, fetch the actual documents
    const comments = await CommentModel.find({
      _id: { $in: post.comments },
    }).exec();

    return comments; // This is now the actual Comment documents
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
}

export default {
  index,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getUserPosts,
  addPost,
  addCommentToPost,
  getCommentsByPost,
};
