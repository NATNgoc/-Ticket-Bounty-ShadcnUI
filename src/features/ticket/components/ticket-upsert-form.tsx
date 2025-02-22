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
import { LucideLoaderCircle } from "lucide-react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

function SubmitButton({ lable }: { lable: string }) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending}>
      {pending && <LucideLoaderCircle className="animate-spin" />}
      {lable}
    </Button>
  );
}

export default function TicketUpsertForm(props: TicketUpsertFormProps) {
  const { ticket } = props;

  const serverAction = ticket
    ? updateTicket.bind(null, ticket?.id)
    : createTicket;

  const [actionState, action] = useActionState<{ message: string }, FormData>(
    serverAction,
    {
      message: "",
    }
  );

  return (
    <form action={action}>
      <div className="flex flex-col gap-y-2">
        {ticket && (
          <Input
            name="id"
            defaultValue={ticket.id}
            type="hidden"
          ></Input>
        )}
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          defaultValue={ticket?.title}
          id="title"
          name="title"
          placeholder="Your favorite title here💝"
        ></Input>
        <Label htmlFor="status">Status</Label>
        <Select
          name="status"
          defaultValue={ticket?.status}
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
          defaultValue={ticket?.content}
          name="content"
          className="h-32 overflow-y-auto"
        ></Textarea>
        <SubmitButton lable={ticket ? "Update" : "Create"} />
        {/* <Button disabled={isPending}>
          {isPending && <LucideLoaderCircle className="animate-spin" />}
          {ticket ? "Update" : "Create"}
        </Button> */}
        <div>{actionState.message}</div>
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
