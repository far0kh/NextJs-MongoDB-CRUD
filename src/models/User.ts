import mongoose, { Schema } from "mongoose";

export interface User {
  _id: string;
  name: string;
  bio: string;
}

const UserSchema = new Schema<User>({
  name: { type: String, required: true, unique: true },
  bio: { type: String, required: true }
});

export const User =
  mongoose.models.User || mongoose.model<User>("User", UserSchema);
