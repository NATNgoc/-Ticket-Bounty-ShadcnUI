import TicketsLoadingPage from "@/app/(authenticated)/tickets/loading";
import { BreadCumbWithList } from "@/components/bread-cumb-list";
import Paths from "@/constants/paths";
import { TicketId } from "@/features/ticket/components/ticket-id";
import getTicket from "@/features/ticket/queries/get-ticket";
import { BreadcrumbItemType } from "@/types";
import { Suspense } from "react";

type TicketPageProps = Promise<{
  ticketId: string;
}>;

export default async function TicketsByIdPage(props: {
  params: TicketPageProps;
}) {
  const ticketId = (await props.params).ticketId;
  const breadCumbItems: BreadcrumbItemType[] = [
    {
      title: "Home",
      href: Paths.HomePath(),
    },
    {
      title: "Tickets",
      href: Paths.TicketsPath(),
    },
    {
      title: `Ticket ${ticketId}`,
    },
  ];
  await getTicket(ticketId);
  return (
    <>
      <BreadCumbWithList listItems={breadCumbItems}></BreadCumbWithList>
      <Suspense fallback={<TicketsLoadingPage></TicketsLoadingPage>}>
        <TicketId ticketId={ticketId as string}></TicketId>
      </Suspense>
    </>
  );
}
