import axiosInstance from "@/config/axiosConfig";
import { EVENT_SERVICE } from "./constants";
import type { Page } from "@/shared/types/DataTable";
import type { PaginationQuery } from "@/domain/common/PaginationQuery";
import type { CreateEventCategoryRequestDto } from "@/domain/eventcategory/CreateEventCategoryRequestDto";
import type { EventCategory } from "@/domain/eventcategory/EventCategory";
import type { UpdateEventCategoryRequestDto } from "@/domain/eventcategory/UpdateEventCategoryRequestDto";
import type { EventCategoryPaginationRequestDto } from "@/domain/eventcategory/EventCategoryPaginationRequestDto";

const EVENT_CATEGORY_ENDPOINT_PREFIX = `${EVENT_SERVICE}/api/event-categories`;

export const createEventCategory = async (createEventCategoryRequest: CreateEventCategoryRequestDto): Promise<EventCategory> => {
    const { data } = await axiosInstance.post<EventCategory>(
        `${EVENT_CATEGORY_ENDPOINT_PREFIX}/create`,
        createEventCategoryRequest
    );
    return data;
};

export const getEventCategories = async (query: EventCategoryPaginationRequestDto & PaginationQuery): Promise<Page<EventCategory>> => {
    const params = new URLSearchParams(query as any).toString();
    const { data } = await axiosInstance.get<Page<EventCategory>>(
        `${EVENT_CATEGORY_ENDPOINT_PREFIX}?${params}`
    );
    return data;
};

export const getAllEventCategories = async (): Promise<EventCategory[]> => {
    const { data } = await axiosInstance.get<EventCategory[]>(
        `${EVENT_CATEGORY_ENDPOINT_PREFIX}/all`
    );
    return data;
};

export const updateEventCategory = async (updateEventCategoryRequest: UpdateEventCategoryRequestDto): Promise<EventCategory> => {
    const { data } = await axiosInstance.put<EventCategory>(
        `${EVENT_CATEGORY_ENDPOINT_PREFIX}/${updateEventCategoryRequest.id}/update`,
        updateEventCategoryRequest
    );
    return data;
};

export const deleteEventCategory = async (id: number): Promise<void> => {
    await axiosInstance.delete<EventCategory>(
        `${EVENT_CATEGORY_ENDPOINT_PREFIX}/${id}/delete`
    );
};
