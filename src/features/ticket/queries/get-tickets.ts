
import { getCookie } from "@/action/cookie";
import { Cookie_Keys } from "@/constants";
import { ParsedSearchParamsCache } from "@/types";
import { TicketsPrefix } from "../constants";
import { Ticket } from "../type";

export enum AvailableSortFields {
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  bounty = "bounty",
  deadline = "deadline"
}

export default async function getTickets(includeLoggedInUser: boolean, queryParams?: ParsedSearchParamsCache): Promise<Ticket[]> {
  const userId = await getCookie(Cookie_Keys.UserId) as string;
  const queryParameters = await queryParams
  console.log(queryParameters)
  const queryString = new URLSearchParams({
    order: queryParameters?.order || "DESC",
    sortBy: queryParameters?.sortBy || "createdAt",
    ...(includeLoggedInUser ? { userId } : queryParameters?.userId ? { userId: queryParameters.userId } : {}),
  });
  if (queryParameters?.search) {
    queryString.set("search", queryParameters.search)
  }

  const response = await fetch(`${process.env.BE_URL}/${TicketsPrefix}?${queryString.toString()}`, {
    next: {
      revalidate: 10,
    },
    // headers: {
    //   [HeaderKeys.AUTHORIZATION]: accessToken
    // }
  });
  if (!response.ok) {
    console.error(response);
    throw new Error("Failed to fetch tickets");
  }
  const tickets = await response.json() as Ticket[];
  const filteredTickets: Ticket[] = await tickets.map(ticket => ({
    ...ticket,
    bounty: parseInt(ticket.bounty.toString().replace("$", "")),
  }));
  // revalidatePath(Paths.TicketsPath());
  return filteredTickets;
}
