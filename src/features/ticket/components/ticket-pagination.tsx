"use client";
import { PaginationComponent } from "@/components/pagination";
import { PaginationMeta, paginationOptions, paginationParsers } from "@/types";
import { useQueryStates } from "nuqs";

export default function TicketPagination({
  paginationMetadata,
}: {
  paginationMetadata: PaginationMeta;
}) {
  const [pagination, setPagination] = useQueryStates(
    paginationParsers,
    paginationOptions
  );
  const handleOnPageChange = (page: number) => {
    setPagination({
      limit: pagination.limit,
      offset: page,
    });
  };
  return (
    <PaginationComponent
      className="w-full"
      paginationMeta={paginationMetadata}
      onPageChange={handleOnPageChange}
    ></PaginationComponent>
  );
}
