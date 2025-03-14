import { User } from "@/features/auth/entities/user.entity";
import getTicket from "@/features/ticket/queries/get-ticket";
export enum TicketStatus2 {
  Used = "true",
  NotUsed = "false",
}

// export enum TicketStatus {
//   OPEN = "OPEN",
//   IN_PROGRESS = "IN_PROGRESS",
//   DONE = "DONE",
// }

export const ticketStatusList: Array<string> = ["OPEN", "IN_PROGRESS", "DONE"] as const;

// export type TicketStatus = (typeof ticketStatusList)[number];
export type TicketStatus = (typeof ticketStatusList)[number];
export type Ticket2 = {
  id: number;
  movieId: number;
  startTime: Date;
  endTime: Date;
  isUsed: TicketStatus2;
  description: string;
};

export type Ticket = {
  id: string;
  title: string;
  content: string;
  status: TicketStatus;
  bounty: number;
  deadline: Date;
  user_id: string;
  createdAt: Date;
  user?: User
  updatedAt: Date;
  deletedAt: Date;
};

export type TicketItemProps = {
  ticketItem: Awaited<ReturnType<typeof getTicket>>;
  isDetail?: boolean;
};
