// "use client";
import Heading from "@/components/heading";
// import { useEffect, useState } from "react";
import TicketsLoadingPage from "@/app/tickets/loading";
import CardCompact from "@/components/ui/card-compact";
import TicketsList from "@/features/ticket/components/ticket-list";
import TicketCreateForm from "@/features/ticket/components/ticket-upsert-form";
import { Suspense } from "react";

// export const dynamic = "force-dynamic";
// export const revalidate = 10;

export default function TicketsPage() {
  return (
    <div className="flex-1 flex flex-col">
      <Heading
        title="TicketsPage"
        description="All tickets in your systems are there. You can choose to see detail"
      ></Heading>
      <CardCompact
        content={<TicketCreateForm></TicketCreateForm>}
        title="Create Ticket"
        description="Create your ticket here"
        className="w-full max-w-[450px] self-center flex flex-col gap-y-2"
      ></CardCompact>
      <Suspense fallback={<TicketsLoadingPage></TicketsLoadingPage>}>
        <TicketsList></TicketsList>
      </Suspense>
    </div>
  );
}
