import { checkSession } from "@/tools/checkSession";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  if (await checkSession()) {
    redirect("/tasks");
  }
  return <>{children}</>;
};

export default layout;
