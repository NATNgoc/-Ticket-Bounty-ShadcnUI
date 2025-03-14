"use client";

import { useConfirmDialog } from "@/components/alert-dialog";
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
import { deleteTicket } from "@/features/ticket/actions/delete-ticket";
import { UpdateTicketStatus } from "@/features/ticket/actions/update-status";
import { Ticket, TicketStatus, ticketStatusList } from "@/features/ticket/type";
import { LucideEllipsis } from "lucide-react";
import { startTransition, useOptimistic } from "react";
import { toast } from "sonner";

type TicketMoreMenuProps = {
  ticket: Ticket;
};

export function TicketMoreMenu({ ticket }: TicketMoreMenuProps) {
  // const [statusState, setStatus] = useState(ticket.status);
  const [optimisticStatus, addOptimisticStatus] = useOptimistic(
    ticket.status,
    (curVal: TicketStatus, newVal: TicketStatus) => {
      return newVal;
    }
  );
  const handleValueChange = async (value: TicketStatus) => {
    if (value !== optimisticStatus) {
      const preViousValue = optimisticStatus;
      startTransition(async () => {
        try {
          addOptimisticStatus(value);
          const promise = UpdateTicketStatus(ticket.id, value);
          toast.promise(promise, {
            loading: "Updating status...",
          });
          await promise;
          toast.success(`Update status ${value} successfully`);
        } catch (error) {
          console.error(error);
          addOptimisticStatus(preViousValue); // Rollback về giá trị cũ
          toast.error("Update status failed");
        }
      });
    }
  };

  const StatusSelection = () => {
    return (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          <span>Change status</span>
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={optimisticStatus}
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

  const [dialogTrigger, dialog] = useConfirmDialog({
    serverAction: deleteTicket.bind(null, ticket.id + ""),
    trigger: <span>Delete</span>,
  });

  return (
    <>
      {dialog}
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
          <DropdownMenuItem asChild>{dialogTrigger}</DropdownMenuItem>
          <StatusSelection />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
