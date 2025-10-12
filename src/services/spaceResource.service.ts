import axiosInstance from "@/config/axiosConfig";
import { SPACE_SERVICE } from "./constants";
import type { SpaceResource } from "@/domain/spaceresource/SpaceResource";
import type { CreateSpaceResourceRequestDto } from "@/domain/spaceresource/CreateSpaceResourceRequestDto";
import type { Page } from "@/shared/types/DataTable";
import type { SpaceResourcePaginationRequestDto } from "@/domain/spaceresource/SpaceResourcePaginationRequestDto";
import type { PaginationQuery } from "@/domain/common/PaginationQuery";
import type { UpdateSpaceResourceRequestDto } from "@/domain/spaceresource/UpdateSpaceResourceRequestDto";

const SPACE_ENDPOINT_PREFFIX = `${SPACE_SERVICE}/api/space-resources`


export const createSpaceResource = async (createSpaceResourceRequest: CreateSpaceResourceRequestDto): Promise<SpaceResource> => {
    const { data } = await axiosInstance.post<SpaceResource>(
        `${SPACE_ENDPOINT_PREFFIX}`,
        createSpaceResourceRequest
    );

    return data;
}


export const getSpaceResources = async (query: SpaceResourcePaginationRequestDto & PaginationQuery): Promise<Page<SpaceResource>> => {
    const params = new URLSearchParams(query as any).toString();
    const { data } = await axiosInstance.get<Page<SpaceResource>>(
        `${SPACE_ENDPOINT_PREFFIX}?${params}`
    );
    return data;
}

export const updateSpaceResource = async (updateSpaceResourceRequest: UpdateSpaceResourceRequestDto): Promise<SpaceResource> => {
    const { data } = await axiosInstance.put<SpaceResource>(
        `${SPACE_ENDPOINT_PREFFIX}/${updateSpaceResourceRequest.id}`,
        updateSpaceResourceRequest
    );

    return data;
}

export const deleteSpaceResource = async (id: number): Promise<void> => {
    await axiosInstance.delete<SpaceResource>(
        `${SPACE_ENDPOINT_PREFFIX}/${id}`);
}




