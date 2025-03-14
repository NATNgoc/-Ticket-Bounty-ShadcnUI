"use server";

import { getCookie, setCookie } from "@/action/cookie";
import { ActionState, fromErrorToActionState } from "@/common/utils";
import { Cookie_Keys, HeaderKeys } from "@/constants";
import Paths from "@/constants/paths";
import { TicketsPrefix } from "@/features/ticket/constants";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export async function deleteTicket(id: string, _actionState: ActionState, _formData: FormData): Promise<ActionState> {

  try {
    const accessToken = await getCookie(Cookie_Keys.AccessTokenKey) as string;
    const response = await fetch(`${process.env.BE_URL}/${TicketsPrefix}/${id}`, {
      method: "DELETE",
      headers: {
        [HeaderKeys.AUTHORIZATION]: accessToken,
      },
    });
    if (!response.ok) {
      const errorMessage = (await response.json() as { message: string, statuscode: number }).message
      throw new Error(errorMessage);
    }
  } catch (error) {
    return fromErrorToActionState(error);
  }
  setCookie(Cookie_Keys.ToastKey(), "Ticket deleted successfully");
  revalidatePath(Paths.TicketsPath());
  revalidatePath(Paths.HomePath());
  redirect(Paths.TicketsPath());
};
