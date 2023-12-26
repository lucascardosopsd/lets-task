import connectDb from "@/config/mongoDb";
import Task from "@/schemas/task";

export default async function getTasks() {
  await connectDb();

  try {
    return await Task.find().select("title description complete important");
  } catch (error) {
    throw new Error("Erro when get tasks");
  }
}
