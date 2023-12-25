"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const ProtectRoute = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session?.user) {
    return children;
  }

  router.push("signin");

  return <></>;
};

export default ProtectRoute;
