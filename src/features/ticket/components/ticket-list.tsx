import { TicketItem } from "@/features/ticket/components/ticket-item";
import getTicket from "@/features/ticket/queries/get-ticket";

export default async function TicketsList() {
  const ticketsData = await getTicket();
  return (
    <>
      {ticketsData.length !== 0 && (
        <div className="flex-col flex  justify-center items-center w-full gap-4 pt-10 motion-preset-blur-right ">
          {ticketsData.map((ticketItem) => (
            <TicketItem
              key={ticketItem.id}
              ticketItem={ticketItem}
            ></TicketItem>
          ))}
        </div>
      )}
    </>
  );
}
