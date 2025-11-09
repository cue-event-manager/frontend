export interface EventAvailabilityResponseDto {
    canRegister: boolean;
    hasCapacity: boolean;
    isAlreadyRegistered: boolean;
    hasScheduleConflict: boolean;
    conflictingEventName?: string;
    availableSpots: number;
    totalCapacity: number;
}
