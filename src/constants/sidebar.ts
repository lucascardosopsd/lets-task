import { IconType } from "react-icons";
import {
  MdCheck,
  MdHome,
  MdNotificationImportant,
  MdIndeterminateCheckBox,
} from "react-icons/md";

export type labelOptions = "all" | "important" | "common" | "complete";

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
    label: "common",
    title: "Comuns",
    icon: MdIndeterminateCheckBox,
  },
  {
    label: "complete",
    title: "Feito",
    icon: MdCheck,
  },
];
