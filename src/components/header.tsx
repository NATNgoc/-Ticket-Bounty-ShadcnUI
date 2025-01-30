import { Button } from "@/components/ui/button";
import Paths from "@/constants/paths";
import clsx from "clsx";
import { LucideKanban } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur w-full flex py-2.5 px-5 justify-between">
        <Button
          asChild
          size="lg"
          variant="ghost"
          className="hover:motion-preset-expand text-lg font-semibold will-change-transform"
        >
          <Link
            href={Paths.HomePath()}
            className={clsx("font-bold tracking-tighter")}
          >
            <LucideKanban />
            <h1>TicketBounty</h1>
          </Link>
        </Button>
        <Button
          asChild
          variant="default"
          size="lg"
        >
          <Link
            href={Paths.TicketsPath()}
            className="font-normal  underline text-lg motion-preset-expand"
          >
            Tickets
          </Link>
        </Button>
      </nav>
    </header>
  );
}
