import axiosInstance from "@/config/axiosConfig";
import { SPACE_SERVICE } from "./constants";
import type { Page } from "@/shared/types/DataTable";
import type { PaginationQuery } from "@/domain/common/PaginationQuery";
import type { CreateSpaceRequestDto } from "@/domain/space/CreateSpaceRequestDto";
import type { Space } from "@/domain/space/Space";
import type { SpacePaginationRequestDto } from "@/domain/space/SpacePaginationRequestDto";
import type { UpdateSpaceRequestDto } from "@/domain/space/UpdateSpaceRequestDto";
import type { GetAvailableSpacesRequestDto } from "@/domain/space/GetAvailableSpacesRequestDto";
import { buildQueryParams } from "@/utils/buildQueryParams";

const SPACE_ENDPOINT_PREFFIX = `${SPACE_SERVICE}/api/spaces`


export const createSpace = async (createSpaceRequest: CreateSpaceRequestDto): Promise<Space> => {
    const { data } = await axiosInstance.post<Space>(
        `${SPACE_ENDPOINT_PREFFIX}/create`,
        createSpaceRequest
    );

    return data;
}


export const getSpaces = async (query: SpacePaginationRequestDto & PaginationQuery): Promise<Page<Space>> => {
    const params = new URLSearchParams(query as any).toString();
    const { data } = await axiosInstance.get<Page<Space>>(
        `${SPACE_ENDPOINT_PREFFIX}?${params}`
    );
    return data;
}

export const getAllAvailableSpaces = async (query: GetAvailableSpacesRequestDto)  => {
    console.log(query);
  const params = buildQueryParams(query);

    const {data} = await axiosInstance.get<Space[]>(
        `${SPACE_ENDPOINT_PREFFIX}/available?${params}`
    );

    return data; 
}

export const updateSpace = async (updateSpaceRequest: UpdateSpaceRequestDto): Promise<Space> => {
    const { data } = await axiosInstance.put<Space>(
        `${SPACE_ENDPOINT_PREFFIX}/${updateSpaceRequest.id}/update`,
        updateSpaceRequest
    );

    return data;
}

export const deleteSpace = async (id: number): Promise<void> => {
    await axiosInstance.delete<Space>(
        `${SPACE_ENDPOINT_PREFFIX}/${id}/delete`);
}




