import { JSX } from "react";
import data from "../../../../datasample";
import PlaceHolder from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Paths from "@/constants/paths";
import { TicketStatus } from "@/features/ticket/type";
import { TicketItem } from "@/features/ticket/components/ticket-item";

interface TicketPageProps {
  params: {
    ticketId: string;
  };
}

const imageLinks = [
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzJrZWI5ejJzY3FrcGtoYzd5NG1lbzkzMHJvNnFib2IyN296Y2wxayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lP4jmO461gq9uLzzYc/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDkyeHltbWlncTNjdWk1bXZrYnl1cndjYWUyMmcybjVoYXc0bGpzaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3NtY188QaxDdC/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3V0bmRyZWF3MHJ1YWx0bG4xZnZ3N25laTJiZXpzNnFuMnJuYjJiMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/um2kBnfo55iW4ZH1Fa/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnZsYnN2NHczcXNqYWZwamYyamdwNGMxczc3anFqbjRuaTBjeWptciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/CjmvTCZf2U3p09Cn0h/giphy.gif",
  "https://media.giphy.com/media/oKQGM5S2mwx5C/giphy.gif?cid=82a1493bwupupzvgm7b0jgep37yjgkv468fkjxq058uqmisi&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
  "https://media.giphy.com/media/UoMzcaHdVdwrMlr2xv/giphy.gif?cid=790b7611nkl93ef5h7qo184bavl92pjj0qgibc9mc8evvlgc&ep=v1_gifs_search&rid=giphy.gif&ct=g",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHI3MW1jNXQ3cXdlM3BtczgwOGF5d2xmaHJrbXNxc2thOWJ4dmhtdiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/mCbS2QCAX8Axxzujlv/giphy.gif",
];

const checkIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6 inline-block text-green-500"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
};

const unDoneIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6 inline-block text-red-500"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
};

const Status_Icons: { [key in TicketStatus]: JSX.Element } = {
  true: checkIcon(),
  false: unDoneIcon(),
};

export default function TicketsByIdPage({ params }: TicketPageProps) {
  const { ticketId } = params;
  const dataTicket = data.find((ticket) => ticket.id + "" === ticketId);
  if (!dataTicket) {
    throw new Error("Ticket not found");
  }

  return (
    <>
      <div className="w-full flex flex-row justify-center my-5">
        <TicketItem
          ticketItem={dataTicket}
          isDetail={true}
        ></TicketItem>
      </div>
      <h2 className="text-6xl font-bold tracking-tighter">
        This is some information about ticket ID: {dataTicket?.id}
      </h2>
      <img
        className="border-4 border-black w-[500px] h-[500px] my-10"
        alt="Con luoi image"
        src={imageLinks[Math.floor(Math.random() * imageLinks.length)]}
      ></img>

      {dataTicket && (
        <div className="flex-1 flex flex-col gap-4 max-w-[700px]">
          <p>
            <span className="font-semibold text-lg">Movie ID:</span>{" "}
            {dataTicket.movieId}
          </p>
          <p>
            <span className="font-semibold text-lg">Description:</span>{" "}
            {dataTicket.description}
          </p>
          <p>
            <span className="font-semibold text-lg">Start Time:</span>{" "}
            {dataTicket.startTime.toString()}
          </p>
          <p>
            <span className="font-semibold text-lg">End Time:</span>{" "}
            {dataTicket.endTime.toString()}
          </p>
          <p className="flex flex-row items-center gap-2">
            <span className="font-semibold text-lg">Is Used:</span>{" "}
            {Status_Icons[dataTicket.isUsed]}
          </p>
        </div>
      )}
    </>
  );
}
