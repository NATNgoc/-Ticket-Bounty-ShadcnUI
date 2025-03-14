"use server";

import { getCookie } from "@/action/cookie";
import { Cookie_Keys, HeaderKeys } from "@/constants";
import Paths from "@/constants/paths";
import { TicketsPrefix } from "@/features/ticket/constants";
import { TicketStatus } from "@/features/ticket/type";
import { revalidatePath } from "next/cache";

export async function UpdateTicketStatus(id: string, ticketStatus: TicketStatus) {
    const accessToken = await getCookie(Cookie_Keys.AccessTokenKey) as string;
    const response = await fetch(`${process.env.BE_URL}/${TicketsPrefix}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            [HeaderKeys.AUTHORIZATION]: accessToken,

        },
        body: JSON.stringify({
            status: ticketStatus
        }),
    });
    if (!response.ok) {
        const errorMessage = (await response.json() as { message: string, statuscode: number }).message
        throw new Error(errorMessage);
        // toast.error(errorMessage);
    }
    revalidatePath(Paths.TicketsPath());
    revalidatePath(Paths.HomePath());
    return;
}