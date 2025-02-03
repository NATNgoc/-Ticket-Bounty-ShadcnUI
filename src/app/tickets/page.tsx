import Link from "next/link.js";
import data2 from "../../../datasample";
import clsx from "clsx";
import Paths from "@/constants/paths";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { TicketItem } from "@/features/ticket/components/ticket-item";

export default function TicketsPage() {
  const data = data2;

  return (
    <div>
      <Heading
        title="TicketsPage"
        description="All tickets in your systems are there. You can choose to see detail"
      ></Heading>
      <div className="flex-col flex  justify-center items-center w-full gap-4 pt-10 motion-preset-blur-right ">
        {data.map((ticketItem) => (
          <TicketItem
            key={ticketItem.id}
            ticketItem={ticketItem}
          ></TicketItem>
        ))}
      </div>
    </div>
  );
}
