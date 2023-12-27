import Sidebar from "@/components/Sidebar";
import { checkSession } from "@/tools/checkSession";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  if (!(await checkSession())) {
    redirect("/");
  }

  return (
    <div className="mobile:flex h-svh mobile:h-screen">
      <Sidebar />
      {children}
    </div>
  );
};

export default layout;
