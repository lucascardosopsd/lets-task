"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDb } from "@/lib/mongoDb";
import Task from "@/schemas/task";
import User from "@/schemas/user";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export default async function deleteTasksCompleted() {
  await connectDb();

  const session = await getServerSession(authOptions);

  const userId = await User.findOne({ email: session?.user?.email }, "id");

  try {
    await Task.deleteMany({ complete: true, userId });
    revalidatePath("/tasks");
  } catch (error) {
    console.log(error);
    throw new Error("Erro when delete task.");
  }
}
