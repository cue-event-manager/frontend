import type { CreateSingleEventRequestDto } from "@/domain/event/CreateSingleEventRequestDto";
import { EVENT_SERVICE } from "./constants";
import axiosInstance from "@/config/axiosConfig";
import type { CreateEventResponseDto } from "@/domain/event/CreateEventResponseDto";
import type { CreateRecurrentEventRequestDto } from "@/domain/event/CreateRecurrentEventRequestDto";
import type { UpdateEventRequestDto } from "@/domain/event/UpdateEventRequestDto";
import type { UpdateEventResponseDto } from "@/domain/event/UpdateEventResponseDto";
import type { Event } from "@/domain/event/Event";
import type { EventPaginationRequestDto } from "@/domain/event/EventPaginationRequestDto";
import type { PaginationQuery } from "@/domain/common/PaginationQuery";
import type { Page } from "@/domain/common/Page";
import { buildQueryParams } from "@/utils/buildQueryParams";

const EVENT_ENDPOINT_PREFIX = `${EVENT_SERVICE}/api/events`;

export const createSingleEvent = async (createSingleEventRequest: CreateSingleEventRequestDto): Promise<CreateEventResponseDto> => {
    const { data } = await axiosInstance.post<CreateEventResponseDto>(
        `${EVENT_ENDPOINT_PREFIX}/create`,
        createSingleEventRequest
    );
    return data;
};



export const createRecurrentEvent = async (createRecurrentEventRequest: CreateRecurrentEventRequestDto): Promise<CreateEventResponseDto> => {
    const { data } = await axiosInstance.post<CreateEventResponseDto>(
        `${EVENT_ENDPOINT_PREFIX}/create/recurrent`,
        createRecurrentEventRequest
    );
    return data;
};

export const updateEvent = async (updateEventRequest: UpdateEventRequestDto): Promise<UpdateEventResponseDto> => {
    const { id, ...payload } = updateEventRequest;
    const { data } = await axiosInstance.put<UpdateEventResponseDto>(
        `${EVENT_ENDPOINT_PREFIX}/${id}/update`,
        payload
    );
    return data;
};

export const getEvents = async (query: EventPaginationRequestDto & PaginationQuery): Promise<Page<Event>> => {
    const params = buildQueryParams(query);
    const { data } = await axiosInstance.get<Page<Event>>(`${EVENT_ENDPOINT_PREFIX}?${params}`);
    return data;
};

export const getAllEvents = async (): Promise<Event[]> => {
    const { data } = await axiosInstance.get<Event[]>(`${EVENT_ENDPOINT_PREFIX}/all`);
    return data;
};

export const getEventById = async (id: number): Promise<Event> => {
    const { data } = await axiosInstance.get<Event>(`${EVENT_ENDPOINT_PREFIX}/${id}`);
    return data;
};

export const deleteEvent = async (id: number): Promise<void> => {
    await axiosInstance.delete(`${EVENT_ENDPOINT_PREFIX}/${id}`);
};

