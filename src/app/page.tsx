import { BreadCumbWithList } from "@/components/bread-cumb-list";
import Heading from "@/components/heading";
import { FilterTicket } from "@/features/ticket/components/filter-ticket";
import { SearchTicket } from "@/features/ticket/components/search-ticket";
import TicketsList from "@/features/ticket/components/ticket-list";
import { SearchParamsCache } from "@/types";
import { SearchParams } from "nuqs/server";

import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const breadCumbList = [
    {
      title: "Home",
    },
  ];
  return (
    <div>
      <BreadCumbWithList listItems={breadCumbList}></BreadCumbWithList>
      <Heading
        title="HomePage"
        description="This is homepage.<br/>You can start at here!!!"
      ></Heading>
      <div className=" flex flex-col justify-center w-full text-center gap-y-2">
        <div className="max-w-[450px] self-center flex flex-row w-full gap-x-2">
          <SearchTicket className="h-10 w-full flex-1"></SearchTicket>
          <FilterTicket className="w-full h-10 max-w-[60px]"></FilterTicket>
        </div>
        <Suspense>
          <TicketsList
            isOnHomePage={true}
            queryParams={SearchParamsCache.parse(searchParams)}
          ></TicketsList>
        </Suspense>
      </div>
    </div>
  );
}
