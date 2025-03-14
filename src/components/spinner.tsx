import { LucideLoader2 } from "lucide-react";

export default function Spinner() {
  return (
    <div className="flex justify-center items-center flex-col">
      <LucideLoader2 className="animate-spin w-12 h-12 text-gray-500" />
    </div>
  );
}
