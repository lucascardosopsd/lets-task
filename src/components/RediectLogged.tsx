"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const RedirectLogged = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session?.user) {
    router.push("tasks");
    return <>{children}</>;
  }

  return <>{children}</>;
};

export default RedirectLogged;
