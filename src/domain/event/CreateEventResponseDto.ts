import type { RecurrenceType } from "./enums/RecurrenceType";

export interface CreateEventResponseDto {
    eventId: number;
    recurrenceId: string;
    recurrenceType: RecurrenceType;
    totalDays: number;
    createdCount: number;
    failedCount: number;
    failedDates: FailedDatesResponse[];
    message: string;
}

export interface FailedDatesResponse {
    date: Date;
    reason: string;
}