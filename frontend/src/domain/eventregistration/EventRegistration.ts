import type { Event } from "../event/Event";
import type { EventRegistrationStatus } from "./enums/EventRegistrationStatus";

export interface EventRegistration {
    id: number;
    event: Event;
    userId: number;
    status: EventRegistrationStatus;
    registrationDate: string;
    cancellationDate?: string;
    attendanceDate?: string;
}
