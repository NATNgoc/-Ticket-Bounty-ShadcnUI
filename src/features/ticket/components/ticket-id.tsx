import { TicketStatus } from "@/features/ticket/type";
import { LucideCloudFog, LucideCloudSun, LucideSunset } from "lucide-react";
import getTicket from "../queries/get-ticket";
import { TicketItem } from "./ticket-item";

const imageLinks = [
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzJrZWI5ejJzY3FrcGtoYzd5NG1lbzkzMHJvNnFib2IyN296Y2wxayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lP4jmO461gq9uLzzYc/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDkyeHltbWlncTNjdWk1bXZrYnl1cndjYWUyMmcybjVoYXc0bGpzaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3NtY188QaxDdC/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3V0bmRyZWF3MHJ1YWx0bG4xZnZ3N25laTJiZXpzNnFuMnJuYjJiMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/um2kBnfo55iW4ZH1Fa/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnZsYnN2NHczcXNqYWZwamYyamdwNGMxczc3anFqbjRuaTBjeWptciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/CjmvTCZf2U3p09Cn0h/giphy.gif",
  "https://media.giphy.com/media/oKQGM5S2mwx5C/giphy.gif?cid=82a1493bwupupzvgm7b0jgep37yjgkv468fkjxq058uqmisi&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
  "https://media.giphy.com/media/UoMzcaHdVdwrMlr2xv/giphy.gif?cid=790b7611nkl93ef5h7qo184bavl92pjj0qgibc9mc8evvlgc&ep=v1_gifs_search&rid=giphy.gif&ct=g",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHI3MW1jNXQ3cXdlM3BtczgwOGF5d2xmaHJrbXNxc2thOWJ4dmhtdiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/mCbS2QCAX8Axxzujlv/giphy.gif",
];

const IconsStatus: Record<TicketStatus, React.ReactNode> = {
  OPEN: <LucideCloudSun color="#d7c823" />,
  IN_PROGRESS: <LucideCloudFog color="#38ffde" />,
  DONE: <LucideSunset color="#7c891a" />,
};

export async function TicketId({ ticketId }: { ticketId: string }) {
  const ticket = await getTicket(ticketId);
  return (
    <>
      <div className="w-full flex flex-row justify-center my-5">
        <TicketItem
          ticketItem={ticket}
          isDetail={true}
        ></TicketItem>
      </div>
      <h2 className="text-6xl font-bold tracking-tighter">
        This is some information about ticket ID: {ticket?.id}
      </h2>
      <img
        className="border-4 border-black w-[500px] h-[500px] my-10"
        alt="Con luoi image"
        src={imageLinks[Math.floor(Math.random() * imageLinks.length)]}
      ></img>

      {ticket && (
        <div className="flex-1 flex flex-col gap-4 max-w-[700px]">
          <p>
            <span className="font-semibold text-lg">Title:</span> {ticket.title}
          </p>
          <p>
            <span className="font-semibold text-lg">Content:</span>{" "}
            {ticket.content}
          </p>
          <p className="flex flex-row items-center gap-2">
            <span className="font-semibold text-lg">Status:</span>{" "}
            {IconsStatus[ticket.status]}
          </p>
        </div>
      )}
    </>
  );
}
