import { TicketsPrefix } from "../constants";
import { Ticket } from "../type";

export default async function getTicket(id: string): Promise<Ticket> {
  // console.log("getTicket id: ", id);
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetch(`${process.env.BE_URL}/${TicketsPrefix}/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch ticket");
  }
  const ticket: Ticket = await response.json() as Ticket;
  ticket.bounty = parseInt(ticket.bounty.toString().replace("$", ""));
  return ticket;

}
