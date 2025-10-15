import axiosInstance from "@/config/axiosConfig";
import { SPACE_SERVICE } from "./constants";
import type { Page } from "@/shared/types/DataTable";
import type { PaginationQuery } from "@/domain/common/PaginationQuery";
import type { UpdateCampusRequestDto } from "@/domain/campus/UpdateSpaceResourceRequestDto";
import type { Campus } from "@/domain/campus/Campus";
import type { CampusPaginationRequestDto } from "@/domain/campus/SpaceResourcePaginationRequestDto";
import type { CreateCampusRequestDto } from "@/domain/campus/CreateCampusRequestDto";

const CAMPUS_ENDPOINT_PREFFIX = `${SPACE_SERVICE}/api/campuses`


export const createCampus = async (createCampusRequest: CreateCampusRequestDto): Promise<Campus> => {
    const { data } = await axiosInstance.post<Campus>(
        `${CAMPUS_ENDPOINT_PREFFIX}/create`,
        createCampusRequest
    );

    return data;
}


export const getCampuses = async (query: CampusPaginationRequestDto & PaginationQuery): Promise<Page<Campus>> => {
    const params = new URLSearchParams(query as any).toString();
    const { data } = await axiosInstance.get<Page<Campus>>(
        `${CAMPUS_ENDPOINT_PREFFIX}?${params}`
    );
    return data;
}

export const updateCampus = async (updateCampusRequest: UpdateCampusRequestDto): Promise<Campus> => {
    const { data } = await axiosInstance.put<Campus>(
        `${CAMPUS_ENDPOINT_PREFFIX}/${updateCampusRequest.id}/update`,
        updateCampusRequest
    );

    return data;
}

export const deleteCampus = async (id: number): Promise<void> => {
    await axiosInstance.delete<Campus>(
        `${CAMPUS_ENDPOINT_PREFFIX}/${id}/delete`);
}




