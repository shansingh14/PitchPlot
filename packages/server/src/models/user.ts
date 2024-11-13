export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  profilePic?: string;
  location?: string;
  bio?: string
  createdAt: Date;
  friendsCount: number;
}