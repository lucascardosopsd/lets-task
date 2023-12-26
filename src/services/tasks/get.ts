import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDb from "@/lib/mongoDb";
import Task from "@/schemas/task";
import User from "@/schemas/user";
import { getServerSession } from "next-auth";

export default async function getTasks({ query = {} }: { query?: Object }) {
  await connectDb();

  const session = await getServerSession(authOptions);

  const userId = await User.findOne({ email: session?.user?.email }, "id");

  try {
    return await Task.find(
      { userId },
      "id title description complete important userId"
    );
  } catch (error) {
    throw new Error("Error when get tasks");
  }
}
