import { useQuery } from "@tanstack/react-query";
import type { PaginationQuery } from "@/domain/common/PaginationQuery";
import type { Page } from "@/shared/types/DataTable";
import type { FacultyPaginationRequestDto } from "@/domain/faculty/FacultyPaginationRequestDto";
import type { Faculty } from "@/domain/faculty/Faculty";
import { FACULTY_QUERY_KEYS } from "../constants/facultyQueries.constant";
import { getFaculties } from "@/services/faculty.service";

export function useFaculties(query: PaginationQuery & FacultyPaginationRequestDto) {
    return useQuery<Page<Faculty>, Error>({
        queryKey: [FACULTY_QUERY_KEYS.FACULTIES.ROOT, query],
        queryFn: () => getFaculties(query),
    });
}