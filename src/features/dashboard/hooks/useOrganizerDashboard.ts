import { useQuery } from "@tanstack/react-query";
import type { GetOrganizerDashboardRequestDto } from "@/domain/dashboard/GetOrganizerDashboardRequestDto";
import type { GetOrganizerDashboardResponseDto } from "@/domain/dashboard/GetOrganizerDashboardResponseDto";
import { getOrganizerDashboard } from "@/services/dashboard.service";
import { DASHBOARD_QUERY_KEYS } from "../constants/dashboardQueries.constant";

export function useOrganizerDashboard(request: GetOrganizerDashboardRequestDto) {
    return useQuery<GetOrganizerDashboardResponseDto, Error>({
        queryKey: [DASHBOARD_QUERY_KEYS.ORGANIZER, request],
        queryFn: () => getOrganizerDashboard(request),
        staleTime: 1000 * 60 * 5,
    });
}
