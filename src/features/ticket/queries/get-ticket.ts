import { Ticket } from "@/features/ticket/type";
import dataTicketSamples from "../../../../datasample";

export default async function getTicket(): Promise<Ticket[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return new Promise((resolve) => resolve(dataTicketSamples));
}
