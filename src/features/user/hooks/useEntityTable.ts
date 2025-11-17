import type { UseQueryResult } from "@tanstack/react-query";
import type { Page } from "@/shared/types/DataTable";
import { usePaginatedFilters } from "@/shared/hooks/usePaginatedFilters";
import type { PaginationQuery } from "@/domain/common/PaginationQuery";

export function useEntityTable<
  TQuery extends Record<string, any>,
  TEntity
>(
  fetchHook: (
    query: PaginationQuery & TQuery
  ) => UseQueryResult<Page<TEntity>, Error>
) {
  const { query, updateQuery, resetQuery } = usePaginatedFilters<PaginationQuery & TQuery>();
  const { data, isLoading, isFetching, refetch } = fetchHook(query);

  return { query, updateQuery, resetQuery, data, isLoading, isFetching, refetch };
}
