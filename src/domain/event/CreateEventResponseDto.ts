import type { RecurrenceType } from "./enums/RecurrenceType";

export interface CreateEventResponseDto {
    eventId: number;
    recurrenceId: string;
    recurrenceType: RecurrenceType;
    totalDays: number;
    createdCount: string;
    failedDates: FailedDatesResponse[];
    message: string;
}

export interface FailedDatesResponse {
    date: Date;
    reason: string;
}