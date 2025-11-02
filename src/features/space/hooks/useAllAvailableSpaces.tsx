import { useQuery } from "@tanstack/react-query";
import { getAllAvailableSpaces} from "@/services/space.service";
import { SPACE_QUERY_KEYS } from "../constants/spaceQueries.constant";
import type { Space } from "@/domain/space/Space";
import type { GetAvailableSpacesRequestDto } from "@/domain/space/GetAvailableSpacesRequestDto";

export function useAllAvailableSpaces(query: GetAvailableSpacesRequestDto) {
    return useQuery<Space[], Error>({
        queryKey: [SPACE_QUERY_KEYS.SPACES.AVAILABLE, query],
        queryFn: () => getAllAvailableSpaces(query),
    });
}