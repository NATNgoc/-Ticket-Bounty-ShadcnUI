import { TicketItem } from "@/features/ticket/components/ticket-item";
import getTickets from "@/features/ticket/queries/get-tickets";

export default async function TicketsList() {
  const ticketsData = await getTickets();

  // Sort tickets in ascending order based on createdAt
  const sortedTickets = ticketsData.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return (
    <>
      {sortedTickets.length !== 0 && (
        <div className="flex-col flex justify-center items-center w-full gap-4 pt-10 motion-preset-blur-right">
          {sortedTickets.map((ticketItem) => (
            <TicketItem
              key={ticketItem.id}
              ticketItem={ticketItem}
            />
          ))}
        </div>
      )}
    </>
  );
}
