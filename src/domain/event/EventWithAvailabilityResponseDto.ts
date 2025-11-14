import type { Event } from "./Event";
import type { EventAvailability } from "./EventAvailability";

export interface EventWithAvailabilityResponseDto {
    event: Event,
    availability: EventAvailability
}