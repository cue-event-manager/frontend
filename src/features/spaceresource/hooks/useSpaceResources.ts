import { useQuery } from "@tanstack/react-query";
import type { PaginationQuery } from "@/domain/common/PaginationQuery";
import type { Page } from "@/shared/types/DataTable";
import { SPACE_RESOURCE_QUERY_KEYS } from "../constants/spaceResourceQueries.constant";
import type { SpaceResourcePaginationRequestDto } from "@/domain/spaceresource/SpaceResourcePaginationRequestDto";
import type { SpaceResource } from "@/domain/spaceresource/SpaceResource";
import { getSpaceResources } from "@/services/spaceResource.service";

export function useSpaceResources(query: PaginationQuery & SpaceResourcePaginationRequestDto) {
    return useQuery<Page<SpaceResource>, Error>({
        queryKey: [SPACE_RESOURCE_QUERY_KEYS.SPACE_RESOURCES.ROOT, query],
        queryFn: () => getSpaceResources(query),
    });
}