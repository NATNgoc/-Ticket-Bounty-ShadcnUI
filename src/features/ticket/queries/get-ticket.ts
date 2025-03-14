import { HeaderKeys } from "@/constants";
import { getCredentials } from "@/features/ticket/utils";
import { TicketsPrefix } from "../constants";
import { Ticket } from "../type";
export default async function getTicket(id: string): Promise<Ticket> {

  const { accessToken } = await getCredentials();
  const response = await fetch(`${process.env.BE_URL}/${TicketsPrefix}/${id}`, {
    headers: {
      [HeaderKeys.AUTHORIZATION]: accessToken
    }
  });
  if (!response.ok) {
    throw new Error("Failed to fetch ticket");
  }
  const ticket: Ticket = await response.json() as Ticket;
  ticket.bounty = parseInt(ticket.bounty.toString().replace("$", ""));
  return ticket;

}
