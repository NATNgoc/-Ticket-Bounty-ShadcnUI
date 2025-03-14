// "use client";
import Heading from "@/components/heading";
// import { useEffect, useState } from "react";
import { CreateTicketCard } from "@/app/(authenticated)/tickets/_component/create-card";
import TicketsLoadingPage from "@/app/(authenticated)/tickets/loading";
import { BreadCumbWithList } from "@/components/bread-cumb-list";
import Paths from "@/constants/paths";
import { FilterTicket } from "@/features/ticket/components/filter-ticket";
import { SearchTicket } from "@/features/ticket/components/search-ticket";
import TicketsList from "@/features/ticket/components/ticket-list";

import { SearchParamsCache } from "@/types";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";

// export const dynamic = "force-dynamic";
// export const revalidate = 10;

export default function TicketsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const breadCumbList = [
    {
      title: "Home",
      href: Paths.HomePath(),
    },
    {
      title: "Tickets",
    },
  ];
  return (
    <div className="flex-1 flex flex-col gap-y-2">
      <BreadCumbWithList listItems={breadCumbList}></BreadCumbWithList>
      <Heading
        title="TicketsPage"
        description="All tickets in your systems are there. You can choose to see detail"
      ></Heading>
      <div className="max-w-[450px] self-center flex flex-row w-full gap-x-2">
        <SearchTicket className="h-10 w-full flex-1"></SearchTicket>
        <FilterTicket className="w-full h-10 max-w-[60px]"></FilterTicket>
      </div>
      <CreateTicketCard></CreateTicketCard>
      <Suspense fallback={<TicketsLoadingPage></TicketsLoadingPage>}>
        <TicketsList
          isOnHomePage={false}
          queryParams={SearchParamsCache.parse(searchParams)}
        ></TicketsList>
      </Suspense>
    </div>
  );
}
