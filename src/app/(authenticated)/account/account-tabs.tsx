"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Paths from "@/constants/paths";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AccountTabs() {
  const currentTab = usePathname().split("/").pop();

  return (
    <Tabs
      defaultValue={currentTab}
      className="w-96 my-3 "
    >
      <TabsList>
        <TabsTrigger
          value="profile"
          asChild
        >
          <Link href={Paths.ProfilePath()}>Profile</Link>
        </TabsTrigger>
        <TabsTrigger value="password">
          <Link href={Paths.PasswordPath()}>Password</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
