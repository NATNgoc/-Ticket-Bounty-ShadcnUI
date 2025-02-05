// "use client";
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
// import { useEffect, useState } from "react";
import { Ticket } from "@/features/ticket/type";
import getTicket from "@/features/ticket/queries/get-ticket";
import { LucideLoaderCircle } from "lucide-react";
import { Suspense } from "react";
import TicketsList from "@/features/ticket/components/ticket-list";
import Spinner from "@/components/spinner";

// export default function TicketsPage() {
//   const [tickets, setTickets] = useState<Ticket[]>([]);
//   const LoadingSpinner = () => {
//     return (
//       <div className="flex justify-center items-center h-full w-full">
//         <LucideLoaderCircle className="animate-spin w-12 h-12 text-gray-500" />
//       </div>
//     );
//   };
//   useEffect(() => {
//     const fetchTicket = async () => {
//       const ticketsData = await getTicket();
//       setTickets(ticketsData);
//     };

//     fetchTicket();
//   }, []);

//   return (
//     <div className="flex-1">
//       <Heading
//         title="TicketsPage"
//         description="All tickets in your systems are there. You can choose to see detail"
//       ></Heading>
//       {tickets.length !== 0 ? (
//         <div className="flex-col flex  justify-center items-center w-full gap-4 pt-10 motion-preset-blur-right ">
//           {tickets.map((ticketItem) => (
//             <TicketItem
//               key={ticketItem.id}
//               ticketItem={ticketItem}
//             ></TicketItem>
//           ))}
//         </div>
//       ) : (
//         <LoadingSpinner></LoadingSpinner>
//       )}
//     </div>
//   );
// }

export default function TicketsPage() {
  return (
    <div className="flex-1 flex flex-col">
      <Heading
        title="TicketsPage"
        description="All tickets in your systems are there. You can choose to see detail"
      ></Heading>
      {/* <Spinner></Spinner> */}
      <Suspense fallback={<Spinner></Spinner>}>
        <TicketsList></TicketsList>
      </Suspense>
    </div>
  );
}
