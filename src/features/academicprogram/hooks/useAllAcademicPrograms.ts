import { useQuery } from "@tanstack/react-query";
import { ACADEMIC_PROGRAM_QUERY_KEYS } from "../constants/academicProgramQueries.constant";
import type { AcademicProgram } from "@/domain/academicprogram/AcademicProgram";
import { getAllAcademicPrograms } from "@/services/academicProgram.service";

export function useAllAcademicPrograms() {
    return useQuery<AcademicProgram[], Error>({
        queryKey: [ACADEMIC_PROGRAM_QUERY_KEYS.ACADEMIC_PROGRAMS.ALL],
        queryFn: () => getAllAcademicPrograms(),
    });
}