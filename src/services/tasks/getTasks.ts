import clientPromise from "@/lib/mongoDb";
import Task from "@/schemas/task";

export default async function getTasks() {
  await clientPromise;

  try {
    return await Task.find().select("title description complete important");
  } catch (error) {
    throw new Error("Erro when get tasks");
  }
}
