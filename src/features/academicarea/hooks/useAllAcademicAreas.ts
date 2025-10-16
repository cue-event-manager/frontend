import { useQuery } from "@tanstack/react-query";
import { ACADEMIC_AREA_QUERY_KEYS } from "../constants/academicAreaQueries.constant";
import { getAllAcademicAreas } from "@/services/academicArea.service";
import type { AcademicArea } from "@/domain/academicarea/AcademicArea";

export function useAllAcademicAreas() {
    return useQuery<AcademicArea[], Error>({
        queryKey: [ACADEMIC_AREA_QUERY_KEYS.ACADEMIC_AREAS.ALL],
        queryFn: () => getAllAcademicAreas(),
    });
}