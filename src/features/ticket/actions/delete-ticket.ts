"use server";

import Paths from "@/constants/paths";
import { TicketsPrefix } from "@/features/ticket/constants";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteTicket = async (id: string): Promise<void> => {
  console.log("deleteTicket id: ", id);
  const response = await fetch(`${process.env.BE_URL}/${TicketsPrefix}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete ticket");
  }
  revalidatePath(Paths.TicketsPath());
  // revalidatePath(Paths.TicketsPath());
  redirect(Paths.TicketsPath());
};
