"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AvailableSortFields } from "@/features/ticket/queries/get-tickets";
import { orderParser, sortByParser } from "@/types";
import { ListFilter } from "lucide-react";
import { useQueryState } from "nuqs";
import { Fragment, useState } from "react";
type FilterTicketProps = {
  className?: string;
};

export function FilterTicket({ className }: FilterTicketProps) {
  const [field, setField] = useQueryState("sortBy", sortByParser);
  const [type, setType] = useQueryState("order", orderParser);
  const [sortedField, setSortedField] = useState(field);
  const [sortedType, setSortedType] = useState(type);

  const handleInputValue = () => {
    setType(sortedType);
    setField(sortedField);
  };

  const SortField = () => {
    return (
      <Fragment>
        <Label className="font-bold text-sm text-primary uppercase">
          Sort Fields
        </Label>
        <RadioGroup
          defaultValue={sortedField}
          onValueChange={setSortedField}
          value={sortedField}
        >
          {Object.keys(AvailableSortFields).map((field) => (
            <div
              className="flex items-center space-x-2"
              key={field}
            >
              <RadioGroupItem
                value={field}
                id={field}
              />
              <Label htmlFor={field}>{field}</Label>
            </div>
          ))}
        </RadioGroup>
      </Fragment>
    );
  };

  const SortType = () => {
    return (
      <Fragment>
        <Label className="font-bold text-sm text-primary uppercase">
          Sort Types
        </Label>
        <Tabs
          defaultValue={sortedType}
          value={sortedType}
          onValueChange={setSortedType}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ASC">ASC</TabsTrigger>
            <TabsTrigger value="DESC">DESC</TabsTrigger>
          </TabsList>
        </Tabs>
      </Fragment>
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className={className}>
          <ListFilter />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        className="flex flex-col gap-3"
      >
        <SortField></SortField>
        <SortType></SortType>
        <Button
          type="submit"
          className="flex-1 w-full max-w-[300px]"
          onClick={handleInputValue}
        >
          Find
        </Button>
      </PopoverContent>
    </Popover>
  );
}
