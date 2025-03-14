import { NavItem } from "@/components/sidebar/type";
import Paths from "@/constants/paths";
import { LucideHome, LucideTicket, LucideUser } from "lucide-react";

export const navItems: NavItem[] = [
  {
    title: "All Tickets",
    icon: <LucideHome />,
    href: Paths.HomePath(),
  },
  {
    title: "My Tickets",
    icon: <LucideTicket />,
    href: Paths.TicketsPath(),
  },
  {
    title: "Profile",
    icon: <LucideUser />,
    href: Paths.ProfilePath(),
    useSeperator: true,
  },
];

export const closedClassName =
  "text-background opacity-0 transion-all duration-300 group-hover:z-40 group-hover-ml-4 group-hover:opacity-100 group-hover:bg-foreground group-hover:p-2 group-hover:rounded-md group-hover:text-primary";
