"use client";
import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    // <ProtectRoute>
    <div className="flex h-screen">
      <Sidebar />
      {children}
    </div>
    // </ProtectRoute>
  );
};

export default layout;
