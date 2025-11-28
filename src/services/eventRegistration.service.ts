import type { EventAvailabilityResponseDto } from "@/domain/eventregistration/EventAvailabilityResponseDto";
import { EVENT_SERVICE } from "./constants";
import axiosInstance from "@/config/axiosConfig";
import type { RegisterEventRequestDto } from "@/domain/eventregistration/ RegisterEventRequestDto";
import type { EventRegistration } from "@/domain/eventregistration/EventRegistration";
import type { CancelEventRegistrationRequestDto } from "@/domain/eventregistration/CancelEventRegistrationRequestDto";
import type { MessageResponseDto } from "@/domain/common/MessageResponseDto";

const EVENT_REGISTRATION_ENDPOINT_PREFIX = `${EVENT_SERVICE}/api/event-registrations`;

export const registerToEvent = async (request: RegisterEventRequestDto): Promise<EventRegistration> => {
    const { data } = await axiosInstance.post<EventRegistration>(
        `${EVENT_REGISTRATION_ENDPOINT_PREFIX}/register`,
        request
    );
    return data;
};

export const cancelRegistrationToEvent = async (request: CancelEventRegistrationRequestDto): Promise<MessageResponseDto> => {
    const { data } = await axiosInstance.delete<MessageResponseDto>(
        `${EVENT_REGISTRATION_ENDPOINT_PREFIX}/${request.id}/cancel`
    );
    return data;
};

export const getMyEventRegistrations = async (params?: {
    fromDate?: string;
    toDate?: string;
}): Promise<EventRegistration[]> => {
    const { data } = await axiosInstance.get<EventRegistration[]>(
        `${EVENT_REGISTRATION_ENDPOINT_PREFIX}/my-registrations`,
        { params }
    );
    return data;
};

export const checkEventAvailability = async (eventId: number): Promise<EventAvailabilityResponseDto> => {
    const { data } = await axiosInstance.get<EventAvailabilityResponseDto>(
        `${EVENT_REGISTRATION_ENDPOINT_PREFIX}/check-availability/${eventId}`
    );
    return data;
};