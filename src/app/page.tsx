import Heading from "@/components/heading";
import Paths from "@/constants/paths";
import { LucideKanban } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Heading
        title="HomePage"
        description="This is homepage.<br/>You can start at here!!!"
      ></Heading>
      <div className=" flex flex-row justify-center w-full text-center pt-[100]">
        <Link
          href={Paths.TicketsPath()}
          className="underline italic text-xl"
        >
          {">"}Tickets page
        </Link>
      </div>
    </div>
  );
}
