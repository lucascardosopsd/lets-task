import ProtectRoute from "@/components/ProtectRoute";
import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <ProtectRoute>
      <div className="mobile:flex h-svh mobile:h-screen">
        <Sidebar />
        {children}
      </div>
    </ProtectRoute>
  );
};

export default layout;
