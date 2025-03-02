"use client";

import { format } from "date-fns";
import { LucideCalendar } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type DatePickerProps = {
  id: string;
  name: string;
  defaultValue?: string | undefined;
};

export function DatePicker({ id, name, defaultValue }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : new Date()
  );

  const [open, setOpen] = React.useState(false);

  const dateString = date && format(date, "dd-MM-yyyy");

  const handleSetDate = (day: Date | undefined) => {
    setDate(day);
    setOpen(false);
  };

  return (
    <div>
      <Input
        type="hidden"
        name={name}
        value={date ? date.toISOString() : ""}
      />
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverTrigger
          asChild
          id={id}
        >
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <LucideCalendar className="mr-2 h-4 w-4" />
            {date ? dateString : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-autmo p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSetDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
