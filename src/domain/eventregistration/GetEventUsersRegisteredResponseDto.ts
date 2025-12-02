import type { Event } from "@/domain/event/Event";
import type { User } from "@/domain/user/User";
import type { EventRegistrationStatus } from "./enums/EventRegistrationStatus";

export interface GetEventUsersRegisteredResponseDto {
    id: number;
    event: Event;
    user: User;
    status: EventRegistrationStatus;
    registrationDate?: string;
    cancellationDate?: string;
    attendanceDate?: string;
}
