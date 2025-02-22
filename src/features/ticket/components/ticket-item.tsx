// "use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Paths from "@/constants/paths";
import { deleteTicket } from "@/features/ticket/actions/delete-ticket";
import { TicketItemProps, ticketStatusList } from "@/features/ticket/type";
import clsx from "clsx";
import {
  LucideBadge,
  LucideBadgeCheck,
  LucideSettings2,
  LucideSquareArrowOutUpRight,
  LucideTrash2,
} from "lucide-react";
import Link from "next/link";

export function TicketItem({ ticketItem, isDetail = false }: TicketItemProps) {
  const DeleteButton = () => {
    return (
      <form action={deleteTicket.bind(null, ticketItem.id + "")}>
        <Button
          variant={"destructive"}
          className="max-w-10 "
        >
          <LucideTrash2></LucideTrash2>
        </Button>
      </form>
    );
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
  };

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
            <span>
              {ticketItem.status === ticketStatusList[0] ? (
                <LucideBadge />
              ) : (
                <LucideBadgeCheck />
              )}
            </span>
            <span className="text-2xl font-bold tracking-tighter line-clamp-1">
              Ticket ID: {ticketItem.id}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p
            className={clsx(
              " text-gray-500 whitespace-break-spaces tracking-tighter break-all",
              {
                "line-through":
                  ticketItem.status === ticketStatusList[1] && !isDetail,
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
        </CardContent>
      </Card>
      <div className="flex flex-col gap-y-2">
        <EditButton />
        {isDetail ? <DeleteButton /> : <DetailButton />}
      </div>
    </div>
  );
}
