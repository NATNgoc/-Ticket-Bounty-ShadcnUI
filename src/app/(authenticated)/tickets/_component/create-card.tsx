import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import TicketCreateForm from "@/features/ticket/components/ticket-upsert-form";
import { LucideChevronDown } from "lucide-react";
export function CreateTicketCard() {
  return (
    <Collapsible className="max-w-[460px] w-full self-center">
      <Card className="w-full flex flex-col gap-y-2 motion-preset-expand ">
        <CollapsibleTrigger className="text-start">
          <CardHeader className="flex flex-row justify-between">
            <div>
              <CardTitle className="text-lg ">Create Ticket</CardTitle>
              <CardDescription>Create your card here</CardDescription>
            </div>
            <LucideChevronDown></LucideChevronDown>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent className="CollapsibleContent">
          <CardContent>
            <TicketCreateForm></TicketCreateForm>
          </CardContent>
          <CardFooter className="flex flex-row justify-center items-center"></CardFooter>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
