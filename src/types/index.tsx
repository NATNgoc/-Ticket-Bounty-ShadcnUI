import { AvailableSortFields } from "@/features/ticket/queries/get-tickets";
import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

export type RefreshTokenRespone = {
  accessToken: string;
  refreshToken: string;
};

export type BreadcrumbItemType = {
  title: string;
  href?: string;
};

export type SearchParams = {
  search: string;
};

export const userParser = parseAsString.withDefault("").withOptions({
  clearOnDefault: true,
  shallow: false,
});

export const orderParser = parseAsString.withDefault("DESC").withOptions({
  shallow: false,
  clearOnDefault: false,
});

export const sortByParser = parseAsString
  .withDefault(AvailableSortFields.createdAt)
  .withOptions({
    shallow: false,
  });

export const searchParser = parseAsString.withDefault("").withOptions({
  clearOnDefault: true,
  shallow: false,
});

export const paginationOptions = {
  shallow: false,
  clearOnDefault: true,
};

export const paginationParsers = {
  limit: parseAsInteger.withDefault(10),
  offset: parseAsInteger.withDefault(0),
};

// Use all parsers in the cache
export const SearchParamsCache = createSearchParamsCache({
  userId: userParser,
  order: orderParser,
  sortBy: sortByParser,
  search: searchParser,
  ...paginationParsers,
});

export type ParsedSearchParamsCache = ReturnType<
  typeof SearchParamsCache.parse
>;

export type PaginationResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};

export type PaginationMeta = {
  total: number;
  curPage: number;
  totalPage: number;
  next: boolean;
  previous: boolean;
  limit: number;
};
