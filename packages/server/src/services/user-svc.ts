import { Schema, model } from "mongoose";
import { User } from "../models/user";

const UserSchema = new Schema<User>({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  passwordHash: { type: String, required: true },
  profilePic: { type: String },
  bio: { type: String },
  createdAt: { type: Date, default: Date.now },
  friendsCount: {type: Number, default: 0}
});

const UserModel = model<User>("User", UserSchema);

function index(): Promise<User[]> {
  return UserModel.find().exec();
}

function getUserById(userId: string): Promise<User | null> {
  return UserModel.findOne({ id: userId }).exec();
}

function createUser(userData: Partial<User>): Promise<User> {
  return UserModel.create(userData);
}

function updateUser(userId: string, updatedData: Partial<User>): Promise<User | null> {
  return UserModel.findOneAndUpdate({ id: userId }, updatedData, { new: true }).exec();
}

function deleteUser(userId: string): Promise<{ deletedCount?: number }> {
  return UserModel.deleteOne({ id: userId }).exec();
}

export default { index, getUserById, createUser, updateUser, deleteUser };
