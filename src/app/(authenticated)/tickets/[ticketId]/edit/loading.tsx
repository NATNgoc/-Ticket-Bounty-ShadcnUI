import { Skeleton } from "@/components/ui/skeleton";

export default function TicketUpdateLoading() {
  return (
    <div className="flex flex-col items-center gap-y-4 justify-center flex-1">
      <Skeleton className="h-[180px] w-[450px]" />
      <div className="max-w-[450] w-full flex flex-col gap-y-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 max-w-[250]" />
      </div>
    </div>
  );
}
