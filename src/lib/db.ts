/** @format */

import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI || "");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export const disconnectDb = async () => {
  await mongoose.disconnect();
};
