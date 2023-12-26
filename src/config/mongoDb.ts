import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Mongo Connected");
  } catch (error) {
    throw new Error("Error when connect mongodb");
  }
};

export default connectDb;
