export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  profilePic?: string;
  createdAt: Date;
  following: string[];
  followers: string[];
}