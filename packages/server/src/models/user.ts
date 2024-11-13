export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  profilePic?: string;
  bio?: string
  createdAt: Date;
}