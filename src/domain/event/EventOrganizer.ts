import type { EventOrganizerType } from "./enums/EventOrganizerType";

export interface EventOrganizer {
    name: string;
    email: string;
    phone: string;
    type: EventOrganizerType;

    internalFacultyId?: number;
    internalProgramId?: number;
    internalAcademicAreaId?: number;

    externalOrganizationName?: string;
    externalOrganizationWebsite?: string;
}