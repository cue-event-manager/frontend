import { useQuery } from "@tanstack/react-query";
import type { PaginationQuery } from "@/domain/common/PaginationQuery";
import type { Page } from "@/shared/types/DataTable";
import type { SpaceStatus } from "@/domain/spacestatus/SpaceStatus";
import { SPACE_STATUS_QUERY_KEYS } from "../constants/spaceStatusQueries.constant";
import { getSpaceStatuses } from "@/services/spaceStatus.service";
import type { SpaceStatusPaginationRequestDto } from "@/domain/spacestatus/SpaceStatusPaginationRequestDto";

export function useSpaceStatuss(query: PaginationQuery & SpaceStatusPaginationRequestDto) {
    return useQuery<Page<SpaceStatus>, Error>({
        queryKey: [SPACE_STATUS_QUERY_KEYS.SPACE_STATUSES.ROOT, query],
        queryFn: () => getSpaceStatuses(query),
    });
}