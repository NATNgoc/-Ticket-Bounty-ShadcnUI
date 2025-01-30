export enum TicketStatus {
  Used = "true",
  NotUsed = "false",
}
export type Ticket = {
  id: number;
  movieId: number;
  startTime: Date;
  endTime: Date;
  isUsed: TicketStatus;
  description: string;
};

export type TicketItemProps = {
  ticketItem: Ticket;
};
