import { useQuery } from "@tanstack/react-query";
import type { PaginationQuery } from "@/domain/common/PaginationQuery";
import type { Page } from "@/shared/types/DataTable";
import { SPACE_TYPES_QUERY_KEYS } from "../constants/spaceTypeQueries.constant";
import type { SpaceTypePaginationRequestDto } from "@/domain/spacetype/SpaceTypePaginationRequestDto";
import type { SpaceType } from "@/domain/spacetype/SpaceType";
import { getSpaceTypes } from "@/services/spaceType.service";

export function useSpaceTypes(query: PaginationQuery & SpaceTypePaginationRequestDto) {
    return useQuery<Page<SpaceType>, Error>({
        queryKey: [SPACE_TYPES_QUERY_KEYS.SPACE_TYPES.ROOT, query],
        queryFn: () => getSpaceTypes(query),
    });
}