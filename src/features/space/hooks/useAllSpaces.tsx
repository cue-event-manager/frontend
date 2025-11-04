import type { GetAllSpacesRequestDto } from "@/domain/space/GetAllSpacesRequestDto";
import type { Space } from "@/domain/space/Space";
import { SPACE_QUERY_KEYS } from "../constants/spaceQueries.constant";
import { getAllSpaces } from "@/services/space.service";
import { useQuery } from "@tanstack/react-query";

export function useAllSpaces(query: GetAllSpacesRequestDto) {
    return useQuery<Space[], Error>({
        queryKey: [SPACE_QUERY_KEYS.SPACES.ALL, query],
        queryFn: () => getAllSpaces(query),
    });
}