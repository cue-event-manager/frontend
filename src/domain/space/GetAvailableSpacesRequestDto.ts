import type { RecurrenceType } from "../event/enums/RecurrenceType";

export interface GetAvailableSpacesRequestDto {
    minCapacity?: number;
    date?: Date;
    startDate?: Date;
    endDate?: Date;
    startTime?: string;
    endTime?: string;
    recurrenceType?: RecurrenceType;
    campusId?: number;
    typeId?: number;
}