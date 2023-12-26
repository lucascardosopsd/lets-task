"use client";

import { sidebarLinks } from "@/constants/sidebar";
import Image from "next/image";
import { MdChevronLeft, MdChevronRight, MdOutlineLogout } from "react-icons/md";
import SidebarLink from "./SidebarLink";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = useSession();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`absolute top-2 left-2 bg-zinc-800 flex items-center text-zinc-600 p-2 rounded-md tablet:hidden transition${
          isOpen ? "hidden tablet:visible" : "visible"
        } `}
        onClick={toggle}
      >
        <MdChevronRight size="20" />
      </div>
      <div
        className={`flex flex-col justify-between items-center box !rounded-none tablet:rounded h-full my-auto w-full tablet:w-full text-zinc-400 absolute tablet:static transition tablet:max-w-52 ${
          isOpen ? "translate-x-0" : "-translate-x-full tablet:translate-x-0"
        }`}
      >
        <span className="flex items-center justify-center w-full">
          <MdChevronLeft
            size="25"
            className="text-zinc-700 tablet:hidden absolute right-2 top-2"
            onClick={toggle}
          />
          <div className="flex flex-col gap-2 items-center relative">
            <div className="relative h-16 w-16">
              <Image
                src={session?.user?.image ?? "/images/fake-user.jpg"}
                className="rounded-full object-cover h-full w-full border border-green-500"
                fill
                alt="Foto usuário"
              />
            </div>
            <p className="font-medium break-words">{session?.user?.name}</p>
          </div>
        </span>

        <ul className="gap-8 w-full">
          {sidebarLinks.map(({ icon, label, title }, index) => (
            <span onClick={toggle} key={index}>
              <SidebarLink Icon={icon} title={title} label={label} />
            </span>
          ))}
        </ul>

        <div
          className="flex gap-1 w-full px-10 hover:text-green-500 cursor-pointer"
          onClick={() => signOut()}
        >
          <MdOutlineLogout size="20" />
          <p>Sair</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
