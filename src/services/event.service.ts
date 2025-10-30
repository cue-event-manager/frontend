import type { CreateSingleEventRequestDto } from "@/domain/event/CreateSingleEventRequestDto";
import { EVENT_SERVICE } from "./constants";
import axiosInstance from "@/config/axiosConfig";
import type { CreateEventResponseDto } from "@/domain/event/CreateEventResponseDto";

const EVENT_ENDPOINT_PREFIX = `${EVENT_SERVICE}/api/events`;

export const createSingleEvent = async (createSingleEventRequest: CreateSingleEventRequestDto): Promise<CreateEventResponseDto> => {
    const { data } = await axiosInstance.post<CreateEventResponseDto>(
        `${EVENT_ENDPOINT_PREFIX}/create`,
        createSingleEventRequest
    );
    return data;
};
