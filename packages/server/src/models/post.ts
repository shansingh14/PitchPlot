import { PostComment } from "./comment";

export interface Post {
  id: string;
  userId: string; 
  content: string;
  image?: Buffer | string | null;
  createdAt: Date;
  likesCount: number;
  likedBy: string[]; 
  comments: string[];
}
