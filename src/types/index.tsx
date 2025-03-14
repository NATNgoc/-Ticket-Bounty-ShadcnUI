import { AvailableSortFields } from "@/features/ticket/queries/get-tickets";
import { createSearchParamsCache, parseAsString } from "nuqs/server";

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

// Use all parsers in the cache
export const SearchParamsCache = createSearchParamsCache({
  userId: userParser,
  order: orderParser,
  sortBy: sortByParser,
  search: searchParser,
});

export type ParsedSearchParamsCache = ReturnType<
  typeof SearchParamsCache.parse
>;
