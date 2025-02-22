"use server";

import Paths from "@/constants/paths";
import { TicketsPrefix, upsertZodSchema } from "@/features/ticket/constants";
import { revalidatePath } from "next/cache";

export async function createTicket(state: { message: string, payload?: FormData }, formData: FormData) {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  try {
    const data = upsertZodSchema.parse({
      title: formData.get("title"),
      content: formData.get("content"),
      status: formData.get("status"),
    });

    const response = await fetch(`${process.env.BE_URL}/${TicketsPrefix}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to create ticket");
    }
    revalidatePath(Paths.TicketsPath());
    return { message: "😁 Ticket created successfully" };
  } catch (error) {
    console.error("Failed to create ticket", error);
    return { message: "🥲 Create Ticket UnSuccessfully!!!", payload: formData };
  }
}
