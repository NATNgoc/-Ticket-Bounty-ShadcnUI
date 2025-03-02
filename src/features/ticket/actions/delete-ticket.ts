"use server";

import { setCookie } from "@/action/cookie";
import { Cookie_Keys } from "@/constants/cookie-key";
import Paths from "@/constants/paths";
import { TicketsPrefix } from "@/features/ticket/constants";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteTicket = async (id: string): Promise<void> => {
  const response = await fetch(`${process.env.BE_URL}/${TicketsPrefix}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete ticket");
  }
  setCookie(Cookie_Keys.ToastKey(), "Ticket deleted successfully");
  revalidatePath(Paths.TicketsPath());
  // revalidatePath(Paths.TicketsPath());
  redirect(Paths.TicketsPath());
};
