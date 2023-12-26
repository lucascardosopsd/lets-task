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
let clientToAuth: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global.mongoClientPromise) {
    client = new MongoClient(uri, options);
    global.mongoClientPromise = client.connect();
  }
  clientToAuth = global.mongoClientPromise as Promise<MongoClient>;
} else {
  client = new MongoClient(uri, options);
  clientToAuth = client.connect();
}

export default clientToAuth;
