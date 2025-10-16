import { useQuery } from "@tanstack/react-query";
import type { PaginationQuery } from "@/domain/common/PaginationQuery";
import type { Page } from "@/shared/types/DataTable";
import type { AcademicArea } from "@/domain/academicarea/AcademicArea";
import type { AcademicAreaPaginationRequestDto } from "@/domain/academicarea/AcademicAreaPaginationRequestDto";
import { ACADEMIC_AREA_QUERY_KEYS } from "../constants/academicAreaQueries.constant";
import { getAcademicAreas } from "@/services/academicArea.service";

export function useAcademicAreas(query: PaginationQuery & AcademicAreaPaginationRequestDto) {
    return useQuery<Page<AcademicArea>, Error>({
        queryKey: [ACADEMIC_AREA_QUERY_KEYS.ACADEMIC_AREAS.ROOT, query],
        queryFn: () => getAcademicAreas(query),
    });
}