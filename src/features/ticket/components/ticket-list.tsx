import { TicketItem } from "@/features/ticket/components/ticket-item";
import getTickets from "@/features/ticket/queries/get-tickets";
import { ParsedSearchParamsCache } from "@/types";

export default async function TicketsList({
  isOnHomePage,
  queryParams,
}: {
  isOnHomePage: boolean;
  queryParams?: ParsedSearchParamsCache;
}) {
  const ticketsData = isOnHomePage
    ? await getTickets(false, queryParams)
    : await getTickets(true, queryParams);

  return (
    <>
      {ticketsData.length !== 0 && (
        <div className="flex-col flex justify-center items-center w-full gap-4 motion-translate-x-in-[0%] motion-translate-y-in-[48%]">
          {ticketsData.map((ticketItem) => (
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
