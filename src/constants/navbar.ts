import {
  MdBolt,
  MdCheck,
  MdHome,
  MdNotificationImportant,
} from "react-icons/md";

export const navbarLinks = [
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
  {
    label: "now",
    title: "Agora!",
    icon: MdBolt,
  },
];
