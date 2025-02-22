import TicketUpdateLoading from "@/app/tickets/[ticketId]/edit/loading";
import { TicketUpdate } from "@/features/ticket/components/ticket-update";
import { Suspense } from "react";

type EditTicketPageProps = Promise<{
  ticketId: string;
}>;

export default async function EditTicketPage(props: {
  params: EditTicketPageProps;
}) {
  const ticketId = (await props.params).ticketId;

  return (
    // <TicketUpdateLoading />
    <Suspense fallback={<TicketUpdateLoading />}>
      <TicketUpdate id={ticketId}></TicketUpdate>
    </Suspense>
  );
}
