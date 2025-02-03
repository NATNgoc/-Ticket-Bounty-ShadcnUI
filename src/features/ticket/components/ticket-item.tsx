import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Paths from "@/constants/paths";
import { Ticket, TicketItemProps, TicketStatus } from "@/features/ticket/type";
import clsx from "clsx";
import {
  LucideBadgeCheck,
  LucideBadge,
  LucideSquareArrowOutUpRight,
} from "lucide-react";
import Link from "next/link";

export function TicketItem({ ticketItem, isDetail }: TicketItemProps) {
  return (
    <div className="flex flex-row justify-center w-full max-w-[450px]">
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row gap-2 items-center">
            <span>
              {ticketItem.isUsed === TicketStatus.Used ? (
                <LucideBadgeCheck />
              ) : (
                <LucideBadge />
              )}
            </span>
            <span className="text-2xl font-bold tracking-tighter">
              Ticket ID: {ticketItem.id}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p
            className={clsx(
              " text-gray-500 line-clamp-3 whitespace-break-spaces tracking-tighter ",
              {
                "line-through": ticketItem.isUsed === TicketStatus.Used,
              }
            )}
          >
            {ticketItem.description}
          </p>
        </CardContent>
      </Card>
      <Button
        asChild
        variant="ghost"
        className="hover:bg-transparent"
      >
        <Link
          href={Paths.TicketPath(ticketItem.id + "")}
          className="underline pl-0"
        >
          <LucideSquareArrowOutUpRight />
        </Link>
      </Button>
    </div>
  );
}
