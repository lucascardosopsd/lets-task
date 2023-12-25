"use client";
import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex tablet:gap-5 h-screen">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
};

export default layout;
