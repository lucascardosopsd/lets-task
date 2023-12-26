"use server";
import connectDb from "@/lib/mongoDb";
import Task from "@/schemas/task";
import { revalidatePath } from "next/cache";

export default async function deleteTask(id: string) {
  await connectDb();

  try {
    await Task.deleteOne({ id });
    revalidatePath("/tasks");
  } catch (error) {
    throw new Error("Erro when create task.");
  }
}
