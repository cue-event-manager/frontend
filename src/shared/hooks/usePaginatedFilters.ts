import { useSearchParams } from "react-router-dom";
import { useMemo, useCallback } from "react";
import type { PaginationQuery } from "@/domain/common/PaginationQuery";

export function usePaginatedFilters<T extends Record<string, any>>(
    defaults?: Partial<PaginationQuery & T>
) {
    const [searchParams, setSearchParams] = useSearchParams();

    const query = useMemo(() => {
        const result: Record<string, any> = { page: 0, size: 10, ...defaults };
        searchParams.forEach((value, key) => {
            result[key] = value;
        });
        result.page = Number(result.page) || 0;
        result.size = Number(result.size) || 10;
        return result as PaginationQuery & T;
    }, [searchParams, defaults]);

    const updateQuery = useCallback(
        (newQuery: Partial<PaginationQuery & T>) => {
            const params = new URLSearchParams();

            Object.entries({ ...query, ...newQuery }).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== "")
                    params.set(key, String(value));
            });

            setSearchParams(params, { replace: true });
        },
        [query, setSearchParams]
    );

    const resetQuery = useCallback(() => {
        const params = new URLSearchParams();
        if (defaults?.page !== undefined) params.set("page", String(defaults.page));
        if (defaults?.size !== undefined) params.set("size", String(defaults.size));
        setSearchParams(params, { replace: true });
    }, [defaults, setSearchParams]);

    return { query, updateQuery, resetQuery };
}
