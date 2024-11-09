
import { Post } from "../models/post";

const posts: Post[] = []; 


export function createPost(post: Post): void {
  posts.push(post);
}


export function getPost(id: string): Post | undefined {
  return posts.find((post) => post.id === id);
}


export function getFeed(userId: string, following: string[]): Post[] {
  return posts.filter((post) => following.includes(post.userId));
}

export function getUserPosts(userId: string): Post[] {
  return posts.filter((post) => post.userId === userId);
}

export function getAllPosts(): Post[] {
  return posts;
}


export function likePost(postId: string, userId: string): void {
  const post = getPost(postId);
  if (post && !post.likedBy.includes(userId)) {
    post.likedBy.push(userId);
    post.likesCount++;
  }
}


export function unlikePost(postId: string, userId: string): void {
  const post = getPost(postId);
  if (post && post.likedBy.includes(userId)) {
    post.likedBy = post.likedBy.filter((id) => id !== userId);
    post.likesCount--;
  }
}

export function updatePost(id: string, updatedPost: Partial<Post>): boolean {
  const post = getPost(id);
  if (post) {
    Object.assign(post, updatedPost);
    return true;
  }
  return false;
}


export function deletePost(id: string): boolean {
  const index = posts.findIndex((post) => post.id === id);
  if (index !== -1) {
    posts.splice(index, 1);
    return true;
  }
  return false;
}
