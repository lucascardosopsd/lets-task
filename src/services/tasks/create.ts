"use server";

import { TaskProps } from "@/app/types/task";
import connectDb from "@/config/mongoDb";
import Task from "@/schemas/task";
import { revalidatePath } from "next/cache";

export default async function createTask(data: TaskProps) {
  await connectDb();

  try {
    await Task.create(data);
    revalidatePath("/tasks");
  } catch (error) {
    throw new Error("Erro when create task.");
  }
}
