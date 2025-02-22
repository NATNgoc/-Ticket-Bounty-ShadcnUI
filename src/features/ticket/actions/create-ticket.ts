"use server";

import Paths from "@/constants/paths";
import { TicketsPrefix } from "@/features/ticket/constants";
import { revalidatePath } from "next/cache";

export async function createTicket(state: { message: string }, formData: FormData) {

  try {
    const response = await fetch(`${process.env.BE_URL}/${TicketsPrefix}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: formData.get("title"),
        content: formData.get("content"),
        status: formData.get("status"),
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to create ticket");
    }
    revalidatePath(Paths.TicketsPath());
    return { message: "Ticket created successfully" };
  } catch (error) {
    console.error("Failed to create ticket", error);
    return { message: "Ticket created unsuccessfully" };
  }
}
