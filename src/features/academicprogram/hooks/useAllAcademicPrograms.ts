import { useQuery } from "@tanstack/react-query";
import { ACADEMIC_PROGRAM_QUERY_KEYS } from "../constants/academicProgramQueries.constant";
import type { AcademicProgram } from "@/domain/academicprogram/AcademicProgram";
import { getAllAcademicPrograms } from "@/services/academicProgram.service";
import type { GetAllAcademicProgramRequestDto } from "@/domain/academicprogram/GetAllAcademicProgramsRequestDto";

export function useAllAcademicPrograms(query?: GetAllAcademicProgramRequestDto) {
    return useQuery<AcademicProgram[], Error>({
        queryKey: [ACADEMIC_PROGRAM_QUERY_KEYS.ACADEMIC_PROGRAMS.ALL, query],
        queryFn: () => getAllAcademicPrograms(query),
    });
}