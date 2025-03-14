// "use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Paths from "@/constants/paths";
import { TicketMoreMenu } from "@/features/ticket/components/ticket-more-menu";
import { TicketItemProps, ticketStatusList } from "@/features/ticket/type";
import clsx from "clsx";
import {
  LucideBadge,
  LucideBadgeCheck,
  LucidePencilLine,
  LucideSettings2,
  LucideSquareArrowOutUpRight,
} from "lucide-react";
import Link from "next/link";

export function TicketItem({ ticketItem, isDetail = false }: TicketItemProps) {
  // <form action={deleteTicket.bind(null, ticketItem.id + "")}>
  //   <Button
  //     variant={"destructive"}
  //     className="max-w-10 "
  //   >
  //     <LucideTrash2></LucideTrash2>
  //   </Button>
  // </form>;
  // return (
  //   <Button
  //     asChild
  //     variant="ghost"
  //     className="justify-center"
  //   >
  //     <Link href={Paths.TicketPath(ticketItem.id + "")}>
  //       <LucideSquareArrowOutUpRight />
  //     </Link>
  //   </Button>
  // );

  const EditButton = () => {
    return (
      <Button
        asChild
        variant="outline"
        className="max-w-10 "
      >
        <Link
          prefetch
          href={Paths.TicketEditPath(ticketItem.id + "")}
        >
          <LucideSettings2 />
        </Link>
      </Button>
    );
  };

  const DetailButton = () => {
    return (
      <Button
        asChild
        variant="outline"
        className="max-w-10"
      >
        <Link
          prefetch
          href={Paths.TicketPath(ticketItem.id + "")}
        >
          <LucideSquareArrowOutUpRight />
        </Link>
      </Button>
    );
  };

  const StatusBadge = {
    [ticketStatusList[2]]: <LucideBadgeCheck />,
    [ticketStatusList[1]]: <LucidePencilLine />,
    [ticketStatusList[0]]: <LucideBadge />,
  };

  return (
    <div
      className={clsx("flex flex-row justify-center w-full gap-x-2", {
        "max-w-[450px]": !isDetail,
        "max-w-[850px]": isDetail,
      })}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row gap-2 items-center">
            <span>{StatusBadge[ticketItem.status]}</span>
            <span className="text-2xl font-bold tracking-tighter line-clamp-1">
              Ticket ID: {ticketItem.id}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p
            className={clsx(
              " text-gray-500 whitespace-break-spaces tracking-tighter break-all text-left",
              {
                "line-through":
                  ticketItem.status === ticketStatusList[2] && !isDetail,
                "line-clamp-3": !isDetail,
              }
            )}
          >
            {ticketItem.content +
              ticketItem.content +
              ticketItem.content +
              ticketItem.content +
              ticketItem.content +
              ticketItem.content +
              ticketItem.content}
          </p>
          <div className="flex flex-row justify-between mt-3">
            <span>
              <span className="text-gray-500 italic">created by</span>{" "}
              {ticketItem.user?.name}
            </span>
            <span>{ticketItem.bounty}$</span>
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-col gap-y-2">
        <EditButton />
        {!isDetail && <DetailButton />}
        <TicketMoreMenu ticket={ticketItem}></TicketMoreMenu>
      </div>
    </div>
  );
}
