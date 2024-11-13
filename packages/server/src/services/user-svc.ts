import { Schema, model } from "mongoose";
import { User } from "../models/user";

const UserSchema = new Schema<User>(
  {
    id: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    profilePic: { type: String },
    bio: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "users" }
);

const UserModel = model<User>("User", UserSchema);

export async function getAllUsers() {
  return UserModel.find();
}

export async function getUserById(id: string) {
  return UserModel.findById(id);
}

export async function addUser(user: User) {
  return UserModel.create(user);
}

export async function updateUser(id: string, update: Partial<User>) {
  return UserModel.findByIdAndUpdate(id, update, { new: true });
}

export async function deleteUser(id: string) {
  return UserModel.findByIdAndDelete(id);
}

export default { getAllUsers, getUserById, addUser, updateUser, deleteUser };
