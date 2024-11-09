
import { PostComment } from "../models/comment";
import { getPost } from "./post-svc";

const comments: PostComment[] = []; 


export function addComment(comment: PostComment): void {
  comments.push(comment);
  const post = getPost(comment.postId);
  if (post) {
    post.comments.push(comment);
  }
}

export function getComments(postId: string): PostComment[] {
  return comments.filter((comment) => comment.postId === postId);
}

export function updateComment(
  id: string,
  updatedComment: Partial<PostComment>
): boolean {
  const comment = comments.find((comment) => comment.id === id);
  if (comment) {
    Object.assign(comment, updatedComment);
    return true;
  }
  return false;
}


export function deleteComment(id: string): boolean {
  const index = comments.findIndex((comment) => comment.id === id);
  if (index !== -1) {
    comments.splice(index, 1);
    return true;
  }
  return false;
}
