export interface User {
  id: string;
  username: string;
  email: string;
  profilePic?: string;
  location?: string;
  bio?: string
  createdAt: Date;
  friendsCount: number;
}