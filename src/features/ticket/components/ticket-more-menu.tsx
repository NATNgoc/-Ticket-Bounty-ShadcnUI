"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UpdateTicketStatus } from "@/features/ticket/actions/update-status";
import { Ticket, TicketStatus, ticketStatusList } from "@/features/ticket/type";
import { LucideBird, LucideEllipsis, LucideTrash } from "lucide-react";
import { useState } from "react";

type TicketMoreMenuProps = {
  ticket: Ticket;
};

export function TicketMoreMenu({ ticket }: TicketMoreMenuProps) {
  const [statusState, setStatus] = useState(ticket.status);

  const handleValueChange = async (value: TicketStatus) => {
    console.log("value");
    setStatus(value);
    await UpdateTicketStatus(ticket.id, value);
  };

  const StatusSelection = () => {
    return (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          <Button
            className="flex flex-row items-center"
            variant="ghost"
          >
            <LucideBird />
            <span>Change status</span>
          </Button>
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={statusState}
              onValueChange={handleValueChange}
            >
              {ticketStatusList.map((status) => {
                return (
                  <DropdownMenuRadioItem
                    value={status}
                    key={status}
                  >
                    {status.toLowerCase()}
                  </DropdownMenuRadioItem>
                );
              })}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    );
  };

  const DeleteIcon = () => {
    return (
      <Button
        variant="ghost"
        className="flex flex-row items-center "
      >
        <LucideTrash />
        <span className="flex-1">Delete</span>
      </Button>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="max-w-10"
        >
          <LucideEllipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="right"
        className="max-w-56"
      >
        <DropdownMenuItem>
          <DeleteIcon />
        </DropdownMenuItem>
        <StatusSelection />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
