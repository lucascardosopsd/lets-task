"use server";
import { connectDb } from "@/lib/mongoDb";
import Task from "@/schemas/task";
import { revalidatePath } from "next/cache";

export default async function deleteManyTasks(ids: string[]) {
  await connectDb();

  try {
    await Task.deleteMany({
      _id: { $in: ids },
    });
    revalidatePath("/tasks");
  } catch (error) {
    console.log(error);
    throw new Error("Erro when delete task.");
  }
}
