import { useQuery } from "@tanstack/react-query";
import { SPACE_TYPES_QUERY_KEYS } from "../constants/spaceTypeQueries.constant";
import type { SpaceType } from "@/domain/spacetype/SpaceType";
import { getAllSpaceTypes } from "@/services/spaceType.service";

export function useAllSpaceTypes() {
    return useQuery<SpaceType[], Error>({
        queryKey: [SPACE_TYPES_QUERY_KEYS.SPACE_TYPES.ALL],
        queryFn: () => getAllSpaceTypes(),
    });
}