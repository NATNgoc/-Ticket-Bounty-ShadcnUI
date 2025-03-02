"use server";

import { ActionState, fromErrorToActionState, fromSuccessToActionState } from "@/common/utils";
import Paths from "@/constants/paths";
import { TicketsPrefix, upsertZodSchema } from "@/features/ticket/constants";
import { revalidatePath } from "next/cache";

export async function createTicket(state: ActionState, formData: FormData): Promise<ActionState> {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  try {
    console.log("ngoc2", typeof formData.get("bounty"));
    const data = upsertZodSchema.parse({
      title: formData.get("title"),
      content: formData.get("content"),
      status: formData.get("status"),
      deadline: new Date(formData.get("deadline") as string),
      bounty: parseInt(formData.get("bounty") as string),
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
      const errorMessage = (await response.json() as { message: string, statuscode: number }).message
      throw new Error(errorMessage);
    }
    revalidatePath(Paths.TicketsPath());
    return fromSuccessToActionState("Ticket created successfully");
  } catch (error) {
    console.error("Failed to create ticket", error);
    return fromErrorToActionState(error, formData);
  }
}
