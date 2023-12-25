"use client";

import { navbarLinks } from "@/constants/navbar";
import Image from "next/image";
import { MdChevronLeft, MdOutlineLogout } from "react-icons/md";
import NavbarLink from "./NavbarLink";

const Sidebar = () => {
  return (
    <div className="flex flex-col justify-between items-center box min-h-full w-1/2 tablet:w-1/6 text-zinc-400 relative">
      <MdChevronLeft
        size="25"
        className="absolute right-2 top-2 text-zinc-700"
      />
      <div className="flex flex-col space-y-2 items-center">
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
        {navbarLinks.map(({ icon, label, title }, index) => (
          <NavbarLink Icon={icon} title={title} label={label} key={index} />
        ))}
      </ul>

      <div className="flex space-x-1 w-full px-10">
        <MdOutlineLogout size="20" />
        <p>Sair</p>
      </div>
    </div>
  );
};

export default Sidebar;
