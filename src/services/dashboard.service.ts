import axiosInstance from "@/config/axiosConfig";
import type { GetOrganizerDashboardRequestDto } from "@/domain/dashboard/GetOrganizerDashboardRequestDto";
import type { GetOrganizerDashboardResponseDto } from "@/domain/dashboard/GetOrganizerDashboardResponseDto";
import { EVENT_SERVICE } from "./constants";
import { buildQueryParams } from "@/utils/buildQueryParams";

const DASHBOARD_ENDPOINT = `${EVENT_SERVICE}/api/dashboard`;

export const getOrganizerDashboard = async (
    request: GetOrganizerDashboardRequestDto
): Promise<GetOrganizerDashboardResponseDto> => {
    const params = buildQueryParams(request);
    const { data } = await axiosInstance.get<GetOrganizerDashboardResponseDto>(
        `${DASHBOARD_ENDPOINT}/organizer?${params}`
    );
    return data;
};
