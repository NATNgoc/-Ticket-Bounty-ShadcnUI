"use server";

import Paths from "@/constants/paths";
import { TicketsPrefix } from "@/features/ticket/constants";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateTicket(id: string, state: { message: string }, formData: FormData) {

    const bodyUpdate = ["title", "content", "status"].reduce<Record<string, string>>((acc, key) => {
        const value = formData.get(key) as string;
        if (value) {
            acc[key] = value;
        }
        return acc
    }, {});

    console.log("formData", formData)

    const response = await fetch(`${process.env.BE_URL}/${TicketsPrefix}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyUpdate),
    });

    console.log(response)
    if (!response.ok) {
        throw new Error("Failed to update ticket");
    }
    revalidatePath(Paths.TicketsPath());
    redirect(Paths.TicketsPath());
    return { message: "Ticket updated successfully" };


}
