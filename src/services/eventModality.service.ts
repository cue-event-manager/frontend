import axiosInstance from "@/config/axiosConfig";
import { EVENT_SERVICE } from "./constants";
import type { CreateEventModalityRequestDto } from "@/domain/eventmodality/CreateEventModalityRequestDto";
import type { EventModality } from "@/domain/eventmodality/EventModality";
import type { EventModalityPaginationRequestDto } from "@/domain/eventmodality/EventModalityPaginationRequestDto";
import type { PaginationQuery } from "@/domain/common/PaginationQuery";
import type { Page } from "@/shared/types/DataTable";
import type { UpdateEventModalityRequestDto } from "@/domain/eventmodality/UpdateEventModalityRequestDto";

const EVENT_MODALITY_ENDPOINT_PREFIX = `${EVENT_SERVICE}/api/event-modalities`


export const createEventModality = async (createEventModalityRequest: CreateEventModalityRequestDto): Promise<EventModality> => {
    const { data } = await axiosInstance.post<EventModality>(
        `${EVENT_MODALITY_ENDPOINT_PREFIX}/create`,
        createEventModalityRequest
    );

    return data;
}


export const getEventModalities = async (query: EventModalityPaginationRequestDto & PaginationQuery): Promise<Page<EventModality>> => {
    const params = new URLSearchParams(query as any).toString();
    const { data } = await axiosInstance.get<Page<EventModality>>(
        `${EVENT_MODALITY_ENDPOINT_PREFIX}?${params}`
    );
    return data;
}

export const getAllEventModalities = async (): Promise<EventModality[]> => {
    const { data } = await axiosInstance.get<EventModality[]>(
        `${EVENT_MODALITY_ENDPOINT_PREFIX}/all`
    );
    return data;
}


export const updateEventModality = async (updateEventModalityRequest: UpdateEventModalityRequestDto): Promise<EventModality> => {
    const { data } = await axiosInstance.put<EventModality>(
        `${EVENT_MODALITY_ENDPOINT_PREFIX}/${updateEventModalityRequest.id}/update`,
        updateEventModalityRequest
    );

    return data;
}

export const deleteEventModality = async (id: number): Promise<void> => {
    await axiosInstance.delete<EventModality>(
        `${EVENT_MODALITY_ENDPOINT_PREFIX}/${id}/delete`);
}
