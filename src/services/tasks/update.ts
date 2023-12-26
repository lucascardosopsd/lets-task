"use server";
import { TaskProps } from "@/types/task";
import connectDb from "@/lib/mongoDb";
import Task from "@/schemas/task";
import { revalidatePath } from "next/cache";

export default async function updateTask(
  data: Partial<TaskProps>,
  _id: string
) {
  await connectDb();

  try {
    await Task.findOneAndUpdate({ _id }, data);

    revalidatePath("/tasks");
  } catch (error) {
    throw new Error("Erro when create task.");
  }
}
