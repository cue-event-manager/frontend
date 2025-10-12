import axiosInstance from "@/config/axiosConfig";
import { SPACE_SERVICE } from "./constants";
import type { CreateSpaceTypeRequestDto } from "@/domain/spacetype/CreateSpaceTypeRequestDto";
import type { SpaceType } from "@/domain/spacetype/SpaceType";
import type { SpaceTypePaginationRequestDto } from "@/domain/spacetype/SpaceTypePaginationRequestDto";
import type { PaginationQuery } from "@/domain/common/PaginationQuery";
import type { Page } from "@/shared/types/DataTable";
import type { UpdateSpaceTypeRequestDto } from "@/domain/spacetype/UpdateSpaceTypeRequestDto";

const SPACE_ENDPOINT_PREFFIX = `${SPACE_SERVICE}/api/space-types`


export const createSpaceType = async (createSpaceTypeRequest: CreateSpaceTypeRequestDto): Promise<SpaceType> => {
    const { data } = await axiosInstance.post<SpaceType>(
        `${SPACE_ENDPOINT_PREFFIX}/create`,
        createSpaceTypeRequest
    );

    return data;
}


export const getSpaceTypes = async (query: SpaceTypePaginationRequestDto & PaginationQuery): Promise<Page<SpaceType>> => {
    const params = new URLSearchParams(query as any).toString();
    const { data } = await axiosInstance.get<Page<SpaceType>>(
        `${SPACE_ENDPOINT_PREFFIX}?${params}`
    );
    return data;
}

export const updateSpaceType = async (updateSpaceTypeRequest: UpdateSpaceTypeRequestDto): Promise<SpaceType> => {
    const { data } = await axiosInstance.put<SpaceType>(
        `${SPACE_ENDPOINT_PREFFIX}/${updateSpaceTypeRequest.id}/update`,
        updateSpaceTypeRequest
    );

    return data;
}

export const deleteSpaceType = async (id: number): Promise<void> => {
    await axiosInstance.delete<SpaceType>(
        `${SPACE_ENDPOINT_PREFFIX}/${id}/delete`);
}




