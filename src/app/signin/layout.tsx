"use client";
import RedirectLogged from "@/components/RediectLogged";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <RedirectLogged>{children}</RedirectLogged>;
};

export default layout;
