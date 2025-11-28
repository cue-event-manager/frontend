import type { EventCategory } from "@/domain/eventcategory/EventCategory";
import type { EventModality } from "@/domain/eventmodality/EventModality";
import type { EventStatus } from "../event/enums/EventStatus";

export interface GetOrganizerDashboardResponseDto {
    summary: SummaryDto;
    eventsByStatus: StatusCountDto[];
    eventsByCategory: CategoryCountDto[];
    eventsByModality: ModalityCountDto[];
    registrationsOverTime: DailyRegistrationsDto[];
}

export interface SummaryDto {
    totalEvents: number;
    upcomingEvents: number;
    totalRegistrations: number;
    checkedIn: number;
    cancelled: number;
    noShow: number;
    averageCapacityUsage: number;
}

export interface StatusCountDto {
    status: EventStatus;
    count: number;
}

export interface CategoryCountDto {
    category: EventCategory;
    count: number;
}

export interface ModalityCountDto {
    modality: EventModality;
    count: number;
}

export interface DailyRegistrationsDto {
    date: string;
    registrations: number;
}
