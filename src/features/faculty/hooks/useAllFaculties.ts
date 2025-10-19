import type { Faculty } from "@/domain/faculty/Faculty";
import { useQuery } from "@tanstack/react-query";
import { FACULTY_QUERY_KEYS } from "../constants/facultyQueries.constant";
import { getAllFaculties } from "@/services/faculty.service";

export function useAllFaculties() {
    return useQuery<Faculty[], Error>({
        queryKey: [FACULTY_QUERY_KEYS.FACULTIES.ALL],
        queryFn: () => getAllFaculties(),
    });
}