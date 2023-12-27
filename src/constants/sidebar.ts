import { IconType } from "react-icons";
import { MdCheck, MdHome, MdNotificationImportant } from "react-icons/md";

export type labelOptions = "all" | "important" | "now" | "complete";

interface SidebarLink {
  label: labelOptions;
  title: string;
  icon: IconType;
}

export const sidebarLinks: SidebarLink[] = [
  {
    label: "all",
    title: "Todas",
    icon: MdHome,
  },
  {
    label: "important",
    title: "Importante",
    icon: MdNotificationImportant,
  },
  {
    label: "complete",
    title: "Feito",
    icon: MdCheck,
  },
  // {
  //   label: "now",
  //   title: "Hoje!",
  //   icon: MdBolt,
  // },
];
