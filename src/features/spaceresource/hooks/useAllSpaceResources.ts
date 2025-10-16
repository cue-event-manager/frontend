import { useQuery } from "@tanstack/react-query";
import { SPACE_RESOURCE_QUERY_KEYS } from "../constants/spaceResourceQueries.constant";
import { getAllSpaceResources } from "@/services/spaceResource.service";
import type { SpaceResource } from "@/domain/spaceresource/SpaceResource";

export function useAllSpaceResources() {
    return useQuery<SpaceResource[], Error>({
        queryKey: [SPACE_RESOURCE_QUERY_KEYS.SPACE_RESOURCES.ALL],
        queryFn: () => getAllSpaceResources(),
    });
}