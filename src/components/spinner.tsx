import { LucideLoaderCircle } from "lucide-react";

export default function Spinner() {
  return (
    <div className="flex justify-center items-center flex-col flex-1">
      <LucideLoaderCircle className="animate-spin w-12 h-12 text-gray-500" />
    </div>
  );
}
