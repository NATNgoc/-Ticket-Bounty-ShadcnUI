"use client";

import PlaceHolder from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import Paths from "@/constants/paths";
import { LucideTicketX } from "lucide-react";
import Link from "next/link";

export default function TicketErrorPage({ error }: { error: Error }) {
  return (
    <PlaceHolder
      label={error.message}
      icon={<LucideTicketX></LucideTicketX>}
      button={
        <>
          <Button
            variant="outline"
            asChild
            className="text-sm font-semibold"
          >
            <Link href={Paths.TicketsPath()}>Back to tickets page</Link>
          </Button>
        </>
      }
    ></PlaceHolder>
  );
}
