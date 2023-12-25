"use client";
import { IconType } from "react-icons";

interface NavbarLinkProps {
  label: string;
  title: string;
  Icon: IconType;
  classname?: string;
}

const NavbarLink = ({ Icon, title, label }: NavbarLinkProps) => {
  const current = label == "all";

  return (
    <div
      className={`flex space-x-1 items-center hover:text-green-500 transition cursor-pointer px-10 py-2 ${
        current && "border-r-8 border-green-500 bg-zinc-800 text-green-500"
      }`}
    >
      <Icon size="20" />
      <div>{title}</div>
    </div>
  );
};

export default NavbarLink;
