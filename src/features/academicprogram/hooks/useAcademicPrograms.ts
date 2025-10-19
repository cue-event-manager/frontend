import { useQuery } from "@tanstack/react-query";
import type { PaginationQuery } from "@/domain/common/PaginationQuery";
import type { Page } from "@/shared/types/DataTable";
import { getAcademicPrograms } from "@/services/academicProgram.service";
import type { AcademicProgramPaginationRequestDto } from "@/domain/academicprogram/AcademicProgramPaginationRequestDto";
import type { AcademicProgram } from "@/domain/academicprogram/AcademicProgram";
import { ACADEMIC_PROGRAM_QUERY_KEYS } from "../constants/academicProgramQueries.constant";

export function useAcademicPrograms(query: PaginationQuery & AcademicProgramPaginationRequestDto) {
   return useQuery<Page<AcademicProgram>, Error>({
        queryKey: [ACADEMIC_PROGRAM_QUERY_KEYS.ACADEMIC_PROGRAMS.ROOT, query],
        queryFn: () => getAcademicPrograms(query),
    });
}