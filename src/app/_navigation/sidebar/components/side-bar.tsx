"use client";

import { SidebarItem } from "@/app/_navigation/sidebar/components/side-bar-item";
import { navItems } from "@/app/_navigation/sidebar/constants";
import Paths from "@/constants/paths";
import { useAuth } from "@/context/auth-context";
import { getActivePath } from "@/helper";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function SideBar() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isLogin } = useAuth();
  const curPath = usePathname();
  const closestItem = getActivePath(
    curPath,
    navItems.map((item) => item.href),
    [Paths.SignUpPath(), Paths.LoginPath()]
  );

  const handleSidebarToggle: (open: boolean) => void = (open: boolean) => {
    setIsTransitioning(true);
    setIsSidebarOpen(open);
    setTimeout(() => setIsTransitioning(false), 200);
  };

  if (!isLogin) return <div className=""></div>;

  return (
    <nav
      className={clsx("h-screen border-r pt-24 motion-preset-slide-right", {
        "duration-200": isTransitioning,
        "md:w-60 w-[78px]": isSidebarOpen,
        "w-[78px]": !isSidebarOpen,
      })}
      onMouseEnter={() => handleSidebarToggle(true)}
      onMouseLeave={() => handleSidebarToggle(false)}
    >
      <div className="px-3 py-2">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <SidebarItem
              key={item.title}
              isOpen={isSidebarOpen}
              navItem={item}
              isActive={item.href === closestItem}
            ></SidebarItem>
          ))}
        </nav>
      </div>
    </nav>
  );
}
