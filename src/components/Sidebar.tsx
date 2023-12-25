"use client";

import { sidebarLinks } from "@/constants/sidebar";
import Image from "next/image";
import { MdChevronLeft, MdChevronRight, MdOutlineLogout } from "react-icons/md";
import SidebarLink from "./SidebarLink";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className="absolute top-4 left-4 bg-zinc-800 flex items-center text-zinc-600 p-2 rounded-md tablet:hidden"
        onClick={toggle}
      >
        <MdChevronRight size="20" />
      </div>
      <div
        className={`flex flex-col justify-between items-center box h-full w-1/2 tablet:w-1/6 text-zinc-400 absolute tablet:static transition ${
          isOpen ? "translate-x-0" : "-translate-x-96"
        }`}
      >
        <div
          className="flex flex-col space-y-2 items-center relative"
          onClick={toggle}
        >
          <MdChevronLeft
            size="25"
            className="absolute -right-8 -top-2 text-zinc-700 tablet:hidden"
          />
          <div className="relative h-16 w-16">
            <Image
              src="/images/fake-user.jpg"
              className="rounded-full object-cover h-full w-full border border-green-500"
              fill
              alt="Foto usuário"
            />
          </div>
          <p className="font-medium break-words">Nome Usuário</p>
        </div>

        <ul className="space-y-4 w-full">
          {sidebarLinks.map(({ icon, label, title }, index) => (
            <SidebarLink Icon={icon} title={title} label={label} key={index} />
          ))}
        </ul>

        <div className="flex space-x-1 w-full px-10">
          <MdOutlineLogout size="20" />
          <p>Sair</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
