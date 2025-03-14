"use client";
import { isTimeToRefreshToken } from "@/action/cookie";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Paths from "@/constants/paths";
import { useAuth } from "@/context/auth-context";
import { logOut } from "@/features/auth/actions/log-out";
import { LucideChevronDown } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export function Account() {
  // const [loginStatus, setUserLoginStatus] = useState(false);

  // const { isLogin } = useAuth();
  const { isLogin, updateLoginStatus, isFetched } = useAuth();
  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    if (isLogin) {
      const checkLoginStatus = async () => {
        isTimeToRefreshToken();
      };

      const interval = setInterval(async () => {
        await checkLoginStatus();
      }, 30 * 60 * 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isLogin]);

  const handleLogOut = async () => {
    await logOut();
    updateLoginStatus(false);
    redirect(Paths.LoginPath());
  };

  if (!isFetched) {
    return null;
  }

  return (
    <div className="flex-1">
      {isLogin ? (
        <div className="flex-1">
          <DropdownMenu
            onOpenChange={setOpen}
            open={isOpen}
          >
            <DropdownMenuTrigger asChild>
              <div className="flex flex-row items-center gap-x-1">
                <Avatar className="motion-preset-shake ">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <LucideChevronDown
                  className={`transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogOut}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex-1">
          <Button
            asChild
            variant="outline"
            // size="lg"
            className="max-w-40 mr-[0.5rem]"
          >
            <Link
              href={Paths.LoginPath()}
              className=" text-lg motion-preset-expand"
            >
              <span className="font-semibold">Login</span>
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            // size="lg"
            className="max-w-40"
          >
            <Link
              href={Paths.SignUpPath()}
              className=" text-lg motion-preset-expand"
            >
              <span className="font-semibold">Sign Up</span>
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
