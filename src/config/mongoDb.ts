import mongoose from "mongoose";

const connectDb = async () =>
  mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI as string);

export default connectDb;
