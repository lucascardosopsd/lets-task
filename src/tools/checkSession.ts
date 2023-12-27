import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const checkSession = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return false;
  }

  return true;
};
