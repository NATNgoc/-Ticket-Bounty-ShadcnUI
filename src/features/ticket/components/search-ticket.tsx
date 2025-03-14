"use client";

import { Input } from "@/components/ui/input";
import { searchParser } from "@/types";
import { useQueryState } from "nuqs";
import { useDebouncedCallback } from "use-debounce";

type SearchTicketProps = {
  className?: string;
};

export function SearchTicket({ className }: SearchTicketProps) {
  const [search, setSearch] = useQueryState("search", searchParser);
  const handleInputValue = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearch(value);
    },
    250
  );

  return (
    <Input
      onChange={handleInputValue}
      placeholder="Search ticket..."
      defaultValue={search}
      type="text"
      className={className}
    ></Input>
  );
}
