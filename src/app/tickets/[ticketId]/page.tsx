import TicketsLoadingPage from "@/app/tickets/loading";
import { TicketId } from "@/features/ticket/components/ticket-id";
import getTicket from "@/features/ticket/queries/get-ticket";
import { Suspense } from "react";

type TicketPageProps = Promise<{
  ticketId: string;
}>;

export default async function TicketsByIdPage(props: {
  params: TicketPageProps;
}) {
  const ticketId = (await props.params).ticketId;
  await getTicket(ticketId);
  return (
    <>
      <Suspense fallback={<TicketsLoadingPage></TicketsLoadingPage>}>
        <TicketId ticketId={ticketId as string}></TicketId>
      </Suspense>
    </>
  );
}
