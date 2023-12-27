"use server";
import { connectDb } from "@/lib/mongoDb";
import Task from "@/schemas/task";

export default async function deleteTask(_id: string) {
  await connectDb();

  try {
    await Task.findByIdAndDelete({ _id });
  } catch (error) {
    console.log(error);
    throw new Error("Erro when delete task.");
  }
}
