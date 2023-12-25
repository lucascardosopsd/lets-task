"use client";
import ProtectRoute from "@/components/ProtectRoute";
import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <ProtectRoute>
      <div className="flex tablet:gap-5 h-screen">
        <Sidebar />
        <main>{children}</main>
      </div>
    </ProtectRoute>
  );
};

export default layout;
