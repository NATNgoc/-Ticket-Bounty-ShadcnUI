"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createTicket } from "@/features/ticket/actions/create-ticket";
import { updateTicket } from "@/features/ticket/actions/update-ticket";
import { Ticket, ticketStatusList } from "@/features/ticket/type";
import { LucideLoader2 } from "lucide-react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

const SubmitButton = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      className="flex flex-row"
    >
      {pending && (
        <div>
          <LucideLoader2 className="animate-spin" />
        </div>
      )}
      {label}
    </Button>
  );
};

export default function TicketUpsertForm(props: TicketUpsertFormProps) {
  const { ticket } = props;

  const serverAction = ticket
    ? updateTicket.bind(null, ticket?.id)
    : createTicket;

  const [actionState, action] = useActionState<
    { message: string; payload?: FormData },
    FormData
  >(serverAction, {
    message: "",
  });

  return (
    <form action={action}>
      <div className="flex flex-col gap-y-2">
        {ticket && (
          <Input
            name="id"
            defaultValue={
              (actionState.payload?.get("title") as string) ?? ticket.id
            }
            type="hidden"
          ></Input>
        )}
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          defaultValue={
            (actionState.payload?.get("title") as string) ?? ticket?.title
          }
          id="title"
          name="title"
          placeholder="Your favorite title here💝"
        ></Input>
        <Label htmlFor="status">Status</Label>
        <Select
          name="status"
          defaultValue={
            (actionState.payload?.get("status") as string) ?? ticket?.status
          }
        >
          <SelectTrigger id="status">
            <SelectValue placeholder="Select status's ticket"></SelectValue>
          </SelectTrigger>
          <SelectContent position="popper">
            {ticketStatusList.map((status) => (
              <SelectItem
                key={status}
                value={status}
              >
                {status.toString().toLowerCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Label htmlFor="content">Content</Label>
        <Textarea
          placeholder="What's ticket about?"
          id="content"
          defaultValue={
            (actionState.payload?.get("content") as string) ?? ticket?.content
          }
          name="content"
          className="h-32 overflow-y-auto"
        ></Textarea>
        <SubmitButton label={ticket ? "Update" : "Create"} />

        <div>{actionState?.message}</div>
      </div>
    </form>

    /* <Card className="w-full max-w-[450px] self-center flex flex-col gap-y-2">
        <CardHeader>
          <CardTitle>Create Ticket</CardTitle>
          <CardDescription>Create your own ticket</CardDescription>
        </CardHeader>
        <form action={createTicket}>
          <CardContent>
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                name="title"
                placeholder="Your favorite title here💝"
              ></Input>
              <Label htmlFor="status">Status</Label>
              <Select name="status">
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status's ticket"></SelectValue>
                </SelectTrigger>
                <SelectContent position="popper">
                  {ticketStatusList.map((status) => (
                    <SelectItem
                      key={status}
                      value={status}
                    >
                      {status.toString().toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Label htmlFor="content">Content</Label>
              <Textarea
                placeholder="What's ticket about?"
                id="content"
                name="content"
              ></Textarea>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Submit Button</Button>
          </CardFooter>
        </form>
      </Card> */
  );
}
