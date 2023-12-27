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
        className={`absolute mobile:static top-2 left-0 bottom-2 my-auto h-20 w-5 bg-zinc-800 flex items-center text-zinc-600 rounded-r-md mobile:hidden transition z-50 ${
          isOpen ? "hidden mobile:visible" : "visible"
        } `}
        onClick={toggle}
      >
        <MdChevronRight size="18" />
      </div>
      <div
        className={`flex flex-col justify-between items-center box !rounded-none mobile:rounded h-full my-auto w-full mobile:w-full text-zinc-400 absolute mobile:static transition mobile:max-w-52 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full mobile:translate-x-0"
        }`}
      >
        <span className="flex items-center justify-center w-full">
          <MdChevronLeft
            size="40"
            className="text-zinc-700 mobile:hidden absolute right-2 top-2"
            onClick={toggle}
          />
          <div className="flex flex-col gap-2 items-center relative">
            <div className="relative h-32 w-32 mobile:h-16 mobile:w-16">
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
          className="flex items-center gap-1 w-full px-10 hover:text-green-500 cursor-pointer"
          onClick={() => signOut()}
        >
          <MdOutlineLogout className="text-4xl mobile:text-xl" />
          <p className="text-xl mobile:text-lg">Sair</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
