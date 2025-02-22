import CardCompact from "@/components/ui/card-compact";
import TicketUpsertForm from "@/features/ticket/components/ticket-upsert-form";
import getTicket from "@/features/ticket/queries/get-ticket";
import { notFound } from "next/navigation";

type TicketUpdateProps = {
  id: string;
};

export async function TicketUpdate({ id }: TicketUpdateProps) {
  const isExsitingTicket = await getTicket(id);

  if (!isExsitingTicket) {
    notFound();
  }

  return (
    <div className="flex flex-row justify-center items-center flex-1">
      <CardCompact
        content={<TicketUpsertForm ticket={isExsitingTicket} />}
        title="Update Ticket"
        description="Update your ticket here"
        className="w-full max-w-[450px] self-center flex flex-col gap-y-2"
      ></CardCompact>
    </div>
  );
}
