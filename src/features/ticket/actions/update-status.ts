"use server";

import Paths from "@/constants/paths";
import { TicketsPrefix } from "@/features/ticket/constants";
import { TicketStatus } from "@/features/ticket/type";
import { revalidatePath } from "next/cache";

export async function UpdateTicketStatus(id: string, ticketStatus: TicketStatus) {
    const response = await fetch(`${process.env.BE_URL}/${TicketsPrefix}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            status: ticketStatus
        }),
    });
    if (!response.ok) {
        const errorMessage = (await response.json() as { message: string, statuscode: number }).message
        throw new Error(errorMessage);
    }
    revalidatePath(Paths.TicketsPath());
    return;
}