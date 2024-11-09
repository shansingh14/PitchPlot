
import { User } from "../models/user";

const users: User[] = []; 

export function createUser(user: User): void {
  users.push(user);
}

export function getUser(id: string): User | undefined {
  return users.find((user) => user.id === id);
}

export function getAllUsers(): User[] {
  return users;
}


export function followUser(userId: string, followId: string): void {
  const user = getUser(userId);
  const followUser = getUser(followId);

  if (user && followUser && !user.following.includes(followId)) {
    user.following.push(followId);
    followUser.followers.push(userId);
  }
}


export function unfollowUser(userId: string, unfollowId: string): void {
  const user = getUser(userId);
  const unfollowUser = getUser(unfollowId);

  if (user && unfollowUser) {
    user.following = user.following.filter((id) => id !== unfollowId);
    unfollowUser.followers = unfollowUser.followers.filter(
      (id) => id !== userId
    );
  }
}

export function updateUser(id: string, updatedUser: Partial<User>): boolean {
  const user = getUser(id);
  if (user) {
    Object.assign(user, updatedUser);
    return true;
  }
  return false;
}

export function deleteUser(id: string): boolean {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users.splice(index, 1);
    return true;
  }
  return false;
}
