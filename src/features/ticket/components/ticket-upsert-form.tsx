"use client";

import { ActionState, EMPTY_ACTION_STATE } from "@/common/utils";
import { FieldError } from "@/components/field-error";
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

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

// const SubmitButton = ({ label }: { label: string }) => {
//   const { pending } = useFormStatus();

//   return (
//     <Button
//       disabled={pending}
//       className="flex flex-row"
//     >
//       {pending && (
//         <div>
//           <LucideLoader2 className="animate-spin" />
//         </div>
//       )}
//       {label}
//     </Button>
//   );
// };

export default function TicketUpsertForm(props: TicketUpsertFormProps) {
  const { ticket } = props;

  const serverAction = ticket
    ? updateTicket.bind(null, ticket?.id)
    : createTicket;

  const [actionState, action, isPending] = useActionState<
    ActionState,
    FormData
  >(serverAction, EMPTY_ACTION_STATE);

  return (
    <form action={action}>
      <div className="flex flex-col gap-y-2">
        {ticket && (
          <Input
            disabled={isPending}
            name="id"
            defaultValue={
              (actionState.formData?.get("title") as string) ?? ticket.id
            }
            type="hidden"
          ></Input>
        )}
        <Label
          className="font-bold"
          htmlFor="title"
        >
          Title
        </Label>
        <Input
          disabled={isPending}
          type="text"
          defaultValue={
            (actionState.formData?.get("title") as string) ?? ticket?.title
          }
          id="title"
          name="title"
          placeholder="Your favorite title here💝"
        ></Input>
        <FieldError
          textSize="text-xs"
          error={actionState.fieldErrors?.title?.[0] as string}
        ></FieldError>
        <Label
          className="font-bold"
          htmlFor="status"
        >
          Status
        </Label>
        <Select
          disabled={isPending}
          name="status"
          defaultValue={
            (actionState.formData?.get("status") as string) ?? ticket?.status
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
        <FieldError
          textSize="text-xs"
          error={actionState.fieldErrors?.status?.[0] as string}
        ></FieldError>
        <Label
          className="font-bold"
          htmlFor="content"
        >
          Content
        </Label>
        <Textarea
          disabled={isPending}
          placeholder="What's ticket about?"
          id="content"
          defaultValue={
            (actionState.formData?.get("content") as string) ?? ticket?.content
          }
          name="content"
          className="h-32 overflow-y-auto"
        ></Textarea>
        <FieldError
          textSize="text-xs"
          error={actionState.fieldErrors?.content?.[0] as string}
        ></FieldError>
        {/* <SubmitButton label={ticket ? "Update" : "Create"} /> */}
        <Button
          disabled={isPending}
          className="flex flex-row"
        >
          {isPending && <LucideLoader2 className="animate-spin" />}
          {ticket ? "Update" : "Create"}
        </Button>
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
