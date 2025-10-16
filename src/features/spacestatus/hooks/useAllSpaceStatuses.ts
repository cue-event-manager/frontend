import { useQuery } from "@tanstack/react-query";
import type { SpaceStatus } from "@/domain/spacestatus/SpaceStatus";
import { SPACE_STATUS_QUERY_KEYS } from "../constants/spaceStatusQueries.constant";
import { getAllSpaceStatuses } from "@/services/spaceStatus.service";

export function useAllSpaceStatuses() {
    return useQuery<SpaceStatus[], Error>({
        queryKey: [SPACE_STATUS_QUERY_KEYS.SPACE_STATUSES.ALL],
        queryFn: () => getAllSpaceStatuses(),
    });
}