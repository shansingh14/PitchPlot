import { PostComment } from "./comment";

export interface Post {
  id: string;
  userId: string; 
  content: string;
  imageUrl?: string;
  createdAt: Date;
  likesCount: number;
  likedBy: string[]; 
  comments: PostComment[];
}
