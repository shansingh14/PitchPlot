import { PostComment } from "./comment";

export interface Post {
  id: string;
  userId: string; 
  content: string;
  image?: string;
  createdAt: Date;
  likesCount: number;
  likedBy: string[]; 
  comments: PostComment[];
}
