
import { TicketsPrefix } from "../constants";
import { Ticket } from "../type";

export default async function getTickets(): Promise<Ticket[]> {
  const response = await fetch(`${process.env.BE_URL}/${TicketsPrefix}`, {
    next: {
      revalidate: 10,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch tickets");
  }
  const tickets = await response.json() as Ticket[];
  const filteredTickets: Ticket[] = await tickets.map(ticket => ({
    ...ticket,
    bounty: parseInt(ticket.bounty.toString().replace("$", "")),
  }));
  // revalidatePath(Paths.TicketsPath());
  return filteredTickets;
}
