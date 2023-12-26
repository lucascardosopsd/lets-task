"use server";

import mongoose from "mongoose";

const connectDb = async () => {
  if (mongoose?.connections[0]?.readyState) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Mongo Connected");
  } catch (error) {
    throw new Error("Error when connect mongo");
  }
};

export default connectDb;
