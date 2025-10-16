import axiosInstance from "@/config/axiosConfig";
import { SPACE_SERVICE } from "./constants";
import type { Page } from "@/shared/types/DataTable";
import type { PaginationQuery } from "@/domain/common/PaginationQuery";
import type { CreateSpaceStatusRequestDto } from "@/domain/spacestatus/CreateSpaceStatusRequestDto";
import type { SpaceStatus } from "@/domain/spacestatus/SpaceStatus";
import type { SpaceStatusPaginationRequestDto } from "@/domain/spacestatus/SpaceStatusPaginationRequestDto";
import type { UpdateSpaceStatusRequestDto } from "@/domain/spacestatus/UpdateSpaceStatusRequestDto";

const SPACE_STATUS_ENDPOINT_PREFFIX = `${SPACE_SERVICE}/api/space-statuses`


export const createSpaceStatus = async (createSpaceStatusRequest: CreateSpaceStatusRequestDto): Promise<SpaceStatus> => {
    const { data } = await axiosInstance.post<SpaceStatus>(
        `${SPACE_STATUS_ENDPOINT_PREFFIX}/create`,
        createSpaceStatusRequest
    );

    return data;
}


export const getSpaceStatuses = async (query: SpaceStatusPaginationRequestDto & PaginationQuery): Promise<Page<SpaceStatus>> => {
    const params = new URLSearchParams(query as any).toString();
    const { data } = await axiosInstance.get<Page<SpaceStatus>>(
        `${SPACE_STATUS_ENDPOINT_PREFFIX}?${params}`
    );
    return data;
}

export const getAllSpaceStatuses = async (): Promise<SpaceStatus[]> => {
    const { data } = await axiosInstance.get<SpaceStatus[]>(
        `${SPACE_STATUS_ENDPOINT_PREFFIX}/all`
    );
    return data;
}


export const updateSpaceStatus = async (updateSpaceStatusRequest: UpdateSpaceStatusRequestDto): Promise<SpaceStatus> => {
    const { data } = await axiosInstance.put<SpaceStatus>(
        `${SPACE_STATUS_ENDPOINT_PREFFIX}/${updateSpaceStatusRequest.id}/update`,
        updateSpaceStatusRequest
    );

    return data;
}

export const deleteSpaceStatus = async (id: number): Promise<void> => {
    await axiosInstance.delete<SpaceStatus>(
        `${SPACE_STATUS_ENDPOINT_PREFFIX}/${id}/delete`);
}




