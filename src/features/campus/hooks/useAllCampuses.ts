import { useQuery } from "@tanstack/react-query";
import type { Campus } from "@/domain/campus/Campus";
import { getAllCampuses } from "@/services/campus.service";
import { CAMPUS_QUERY_KEYS } from "../constants/campus.constant";

export function useAllCampuses() {
    return useQuery<Campus[], Error>({
        queryKey: [CAMPUS_QUERY_KEYS.CAMPUSES.ALL],
        queryFn: () => getAllCampuses(),
    });
}