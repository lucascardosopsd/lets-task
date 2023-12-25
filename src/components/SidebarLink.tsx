"use client";
import useSidebarStore from "@/context/sidebar";
import { IconType } from "react-icons";

interface NavbarLinkProps {
  label: string;
  title: string;
  Icon: IconType;
  classname?: string;
}

const NavbarLink = ({ Icon, title, label }: NavbarLinkProps) => {
  const { currentLabel, setLabel } = useSidebarStore();

  const isCurrent = label == currentLabel;

  return (
    <div
      className={`flex space-x-1 items-center hover:text-green-500 transition cursor-pointer px-10 py-2 ${
        isCurrent && "border-r-8 border-green-500 bg-zinc-800 text-green-500"
      }`}
      onClick={() => setLabel(label)}
    >
      <Icon size="20" />
      <div>{title}</div>
    </div>
  );
};

export default NavbarLink;
