import { useQuery } from "@tanstack/react-query";
import type { PaginationQuery } from "@/domain/common/PaginationQuery";
import type { Page } from "@/shared/types/DataTable";
import type { Campus } from "@/domain/campus/Campus";
import { getCampuses } from "@/services/campus.service";
import { CAMPUS_QUERY_KEYS } from "../constants/campus.constant";
import type { CampusPaginationRequestDto } from "@/domain/campus/SpaceResourcePaginationRequestDto";

export function useCampuses(query: PaginationQuery & CampusPaginationRequestDto) {
    return useQuery<Page<Campus>, Error>({
        queryKey: [CAMPUS_QUERY_KEYS.CAMPUSES.ROOT, query],
        queryFn: () => getCampuses(query),
    });
}