import { useQuery } from "@tanstack/react-query";
import type { PaginationQuery } from "@/domain/common/PaginationQuery";
import type { Page } from "@/shared/types/DataTable";
import { getSpaces } from "@/services/space.service";
import { SPACE_QUERY_KEYS } from "../constants/spaceQueries.constant";
import type { SpacePaginationRequestDto } from "@/domain/space/SpacePaginationRequestDto";
import type { Space } from "@/domain/space/Space";

export function useSpaces(query: PaginationQuery & SpacePaginationRequestDto) {
    return useQuery<Page<Space>, Error>({
        queryKey: [SPACE_QUERY_KEYS.SPACES.ROOT, query],
        queryFn: () => getSpaces(query),
    });
}