import { connectDb } from "@/lib/mongoDb";
import User from "@/schemas/user";
import { NextApiResponse } from "next";

export async function POST(req: Request, res: NextApiResponse) {
  const { name, email } = await req.json();

  await connectDb();

  await User.create({ name, email });

  return res.status(201).json({ message: "User created." });
}
