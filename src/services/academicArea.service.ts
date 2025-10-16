import axiosInstance from "@/config/axiosConfig";
import { ACADEMIC_SERVICE } from "./constants";
import type { Page } from "@/shared/types/DataTable";
import type { PaginationQuery } from "@/domain/common/PaginationQuery";
import type { CreateAcademicAreaRequestDto } from "@/domain/academicarea/CreateAcademicAreaRequestDto";
import type { AcademicArea } from "@/domain/academicarea/AcademicArea";
import type { UpdateAcademicAreaRequestDto } from "@/domain/academicarea/UpdateAcademicAreaRequestDto";
import type { AcademicAreaPaginationRequestDto } from "@/domain/academicarea/AcademicAreaPaginationRequestDto";

const ACADEMIC_AREA_ENDPOINT_PREFFIX = `${ACADEMIC_SERVICE}/api/academic-areas`


export const createAcademicArea = async (createAcademicAreaRequest: CreateAcademicAreaRequestDto): Promise<AcademicArea> => {
    const { data } = await axiosInstance.post<AcademicArea>(
        `${ACADEMIC_AREA_ENDPOINT_PREFFIX}/create`,
        createAcademicAreaRequest
    );

    return data;
}


export const getAcademicAreas = async (query: AcademicAreaPaginationRequestDto & PaginationQuery): Promise<Page<AcademicArea>> => {
    const params = new URLSearchParams(query as any).toString();
    const { data } = await axiosInstance.get<Page<AcademicArea>>(
        `${ACADEMIC_AREA_ENDPOINT_PREFFIX}?${params}`
    );
    return data;
}

export const getAllAcademicAreas = async (): Promise<AcademicArea[]> => {
    const { data } = await axiosInstance.get<AcademicArea[]>(
        `${ACADEMIC_AREA_ENDPOINT_PREFFIX}/all`
    );
    return data;
}

export const updateAcademicArea = async (updateAcademicAreaRequest: UpdateAcademicAreaRequestDto): Promise<AcademicArea> => {
    const { data } = await axiosInstance.put<AcademicArea>(
        `${ACADEMIC_AREA_ENDPOINT_PREFFIX}/${updateAcademicAreaRequest.id}/update`,
        updateAcademicAreaRequest
    );

    return data;
}

export const deleteAcademicArea = async (id: number): Promise<void> => {
    await axiosInstance.delete<AcademicArea>(
        `${ACADEMIC_AREA_ENDPOINT_PREFFIX}/${id}/delete`);
}




