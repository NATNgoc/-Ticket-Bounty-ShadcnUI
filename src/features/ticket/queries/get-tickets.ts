
import { getCookie } from "@/action/cookie";
import { Cookie_Keys } from "@/constants";
import { PaginationResponse, ParsedSearchParamsCache } from "@/types";
import { TicketsPrefix } from "../constants";
import { Ticket } from "../type";

export enum AvailableSortFields {
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  bounty = "bounty",
  deadline = "deadline"
}


export default async function getTickets(includeLoggedInUser: boolean, queryParams?: ParsedSearchParamsCache): Promise<PaginationResponse<Ticket>> {

  const userId = await getCookie(Cookie_Keys.UserId) as string;
  const queryParameters = await queryParams

  const queryString = new URLSearchParams({
    order: queryParameters?.order || "DESC",
    sortBy: queryParameters?.sortBy || "createdAt",
    ...(includeLoggedInUser ? { userId } : queryParameters?.userId ? { userId: queryParameters.userId } : {}),
    limit: queryParameters?.limit + "" || "10",
    offset: queryParameters?.offset + "" || "0"
  });
  if (queryParameters?.search) {
    queryString.set("search", queryParameters.search)
  }

  const response = await fetch(`${process.env.BE_URL}/${TicketsPrefix}?${queryString.toString()}`, {
    // next: {
    //   revalidate: 10,
    // },
    // headers: {
    //   [HeaderKeys.AUTHORIZATION]: accessToken
    // }
  });
  if (!response.ok) {
    console.error("Response", response);
    throw new Error("Failed to fetch tickets");
  }
  const result = await response.json() as PaginationResponse<Ticket>;
  const tickets = result.data
  const filteredTickets: Ticket[] = tickets.map(ticket => ({
    ...ticket,
    bounty: parseInt(ticket.bounty.toString().replace("$", "")),
  }));

  return {
    data: filteredTickets,
    meta: result.meta
  };
}
