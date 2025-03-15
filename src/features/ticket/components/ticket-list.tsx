import PlaceHolder from "@/components/placeholder";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import TicketPagination from "@/features/ticket/components/ticket-pagination";
import getTickets from "@/features/ticket/queries/get-tickets";
import { PaginationMeta, ParsedSearchParamsCache } from "@/types";

export default async function TicketsList({
  isOnHomePage,
  queryParams,
}: {
  isOnHomePage: boolean;
  queryParams?: ParsedSearchParamsCache;
}) {
  const apiResponse = isOnHomePage
    ? await getTickets(false, queryParams)
    : await getTickets(true, queryParams);
  const ticketsData = apiResponse.data;
  const meta: PaginationMeta = apiResponse.meta;
  console.log(apiResponse);
  return (
    <>
      {ticketsData.length !== 0 ? (
        <div className="flex-col flex justify-center items-center w-full gap-4 motion-translate-x-in-[0%] motion-translate-y-in-[48%]">
          <div className="flex flex-col max-w-[520px] items-center gap-y-7 w-full justify-center">
            {ticketsData.map((ticketItem) => (
              <TicketItem
                key={ticketItem.id}
                ticketItem={ticketItem}
              />
            ))}
            <TicketPagination paginationMetadata={meta} />
          </div>
        </div>
      ) : (
        <PlaceHolder
          label="Ticket not found"
          className="mt-10"
        ></PlaceHolder>
      )}
    </>
  );
}
