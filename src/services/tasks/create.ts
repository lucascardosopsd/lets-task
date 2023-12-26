"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { TaskProps } from "@/types/task";
import connectDb from "@/lib/mongoDb";
import Task from "@/schemas/task";
import User from "@/schemas/user";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export default async function createTask(
  data: Omit<TaskProps, "_id" | "userId">
) {
  await connectDb();

  const session = await getServerSession(authOptions);

  const userId = await User.findOne({ email: session?.user?.email }, "id");

  try {
    await Task.create({ ...data, userId });
    revalidatePath("/tasks");
  } catch (error) {
    throw new Error("Erro when create task.");
  }
}
