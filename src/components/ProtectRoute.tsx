"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const ProtectRoute = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();

  if (session?.user) {
    return children;
  }

  redirect("/");
};

export default ProtectRoute;
