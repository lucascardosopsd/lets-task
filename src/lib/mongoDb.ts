import mongoose from "mongoose";
import { MongoClient, MongoClientOptions } from "mongodb";

declare const global: {
  mongoClientPromise?: Promise<MongoClient>;
};

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri: string = process.env.MONGODB_URI;
const options: MongoClientOptions = {};

let client: MongoClient;
let mongoClientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global.mongoClientPromise) {
    client = new MongoClient(uri, options);
    global.mongoClientPromise = client.connect();
  }
  mongoClientPromise = global.mongoClientPromise as Promise<MongoClient>;
} else {
  client = new MongoClient(uri, options);
  mongoClientPromise = client.connect();
}

const connectDb = async () => {
  if (mongoose.connections[0]?.readyState) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Mongo Connected");
  } catch (error) {
    throw new Error("Error when connecting to MongoDB using Mongoose");
  }
};

export { mongoClientPromise, connectDb };
