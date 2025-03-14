"use server";

import { getCookie } from "@/action/cookie";
import { ActionState, fromErrorToActionState, fromSuccessToActionState } from "@/common/utils";
import { Cookie_Keys, HeaderKeys } from "@/constants";
import Paths from "@/constants/paths";
import { TicketsPrefix, upsertZodSchema } from "@/features/ticket/constants";
import { revalidatePath } from "next/cache";
export async function updateTicket(id: string, _state: ActionState, formData: FormData) {
    console.log("updateTicket id: ", new Date(formData.get("deadline") as string),);

    try {
        const data = upsertZodSchema.parse({
            title: formData.get("title"),
            content: formData.get("content"),
            status: formData.get("status"),
            deadline: new Date(formData.get("deadline") as string),
            bounty: parseInt(formData.get("bounty") as string),
        });

        console.log("formData", JSON.stringify(data))
        const accessToken = await getCookie(Cookie_Keys.AccessTokenKey) as string;
        const response = await fetch(`${process.env.BE_URL}/${TicketsPrefix}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                [HeaderKeys.AUTHORIZATION]: accessToken,

            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const errorMessage = (await response.json() as { message: string, statuscode: number }).message
            throw new Error(errorMessage);
        }
        revalidatePath(Paths.TicketsPath());
        revalidatePath(Paths.HomePath());
        return fromSuccessToActionState("Ticket updated successfully", {
            "redirect": Paths.TicketsPath()
        });
    } catch (error) {
        console.error("Failed to update ticket", error);
        return fromErrorToActionState(error, formData);
    }
    // redirect(Paths.TicketsPath());
}
