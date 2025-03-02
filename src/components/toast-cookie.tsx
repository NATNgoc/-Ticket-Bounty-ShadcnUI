"use client";

import { deleteCookie, getCookie } from "@/action/cookie";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export function ToastCookie() {
  const pathName = usePathname();

  useEffect(() => {
    const getToastMessage = async () => {
      const toastMessage = await getCookie("toast");
      if (toastMessage) {
        toast.success(toastMessage);
        await deleteCookie("toast");
      }
    };
    getToastMessage();
  }, [pathName]);
  return <></>;
}
