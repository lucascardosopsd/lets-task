import createTask from "@/services/task";
import { NextApiRequest } from "next";

export const POST = async (request: NextApiRequest) => {
  try {
    console.log(request.json());
    await createTask(request.json());
  } catch (error) {
    console.log(error?.message);
    throw new Error("Error when create task");
  }
};
