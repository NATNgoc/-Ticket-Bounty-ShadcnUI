"use server";

import Paths from "@/constants/paths";
import { TicketsPrefix, upsertZodSchema } from "@/features/ticket/constants";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function updateTicket(id: string, state: { message: string, payload?: FormData }, formData: FormData) {

    try {
        const data = upsertZodSchema.parse({
            title: formData.get("title"),
            content: formData.get("content"),
            status: formData.get("status"),
        });

        // const bodyUpdate = ["title", "content", "status"].reduce<Record<string, string>>((acc, key) => {
        //     const value = formData.get(key) as string;
        //     if (value) {
        //         acc[key] = value;
        //     }
        //     return acc
        // }, {});

        console.log("formData", formData)

        const response = await fetch(`${process.env.BE_URL}/${TicketsPrefix}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        console.log(response)
        if (!response.ok) {
            throw new Error("Failed to update ticket");
        }
        revalidatePath(Paths.TicketsPath());
    } catch (error) {
        console.error("Failed to update ticket", error);
        return {
            message: "🥲 Update Ticket UnSuccessfully!!!",
            payload: formData
        };
    }
    redirect(Paths.TicketsPath());
}
