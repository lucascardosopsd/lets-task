"use server";
import { connectDb } from "@/lib/mongoDb";
import Task from "@/schemas/task";

export default async function deleteManyTasks(ids: string[]) {
  await connectDb();

  try {
    await Task.deleteMany({
      _id: { $in: ids },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Erro when delete task.");
  }
}
