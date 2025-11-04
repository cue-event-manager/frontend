import axiosInstance from "@/config/axiosConfig";
import { ACADEMIC_SERVICE } from "./constants";
import type { Page } from "@/shared/types/DataTable";
import type { PaginationQuery } from "@/domain/common/PaginationQuery";
import type { CreateAcademicProgramRequestDto } from "@/domain/academicprogram/CreateAcademicProgramRequestDto";
import type { AcademicProgram } from "@/domain/academicprogram/AcademicProgram";
import type { AcademicProgramPaginationRequestDto } from "@/domain/academicprogram/AcademicProgramPaginationRequestDto";
import type { UpdateAcademicProgramRequestDto } from "@/domain/academicprogram/UpdateAcademicProgramRequestDto";
import type { GetAllAcademicProgramRequestDto } from "@/domain/academicprogram/GetAllAcademicProgramsRequestDto";
import { buildQueryParams } from "@/utils/buildQueryParams";

const ACADEMIC_PROGRAM_ENDPOINT_PREFFIX = `${ACADEMIC_SERVICE}/api/academic-programs`


export const createAcademicProgram = async (createAcademicProgramRequest: CreateAcademicProgramRequestDto): Promise<AcademicProgram> => {
    const { data } = await axiosInstance.post<AcademicProgram>(
        `${ACADEMIC_PROGRAM_ENDPOINT_PREFFIX}/create`,
        createAcademicProgramRequest
    );

    return data;
}


export const getAcademicPrograms = async (query: AcademicProgramPaginationRequestDto & PaginationQuery): Promise<Page<AcademicProgram>> => {
    const params = new URLSearchParams(query as any).toString();
    const { data } = await axiosInstance.get<Page<AcademicProgram>>(
        `${ACADEMIC_PROGRAM_ENDPOINT_PREFFIX}?${params}`
    );
    return data;
}

export const getAllAcademicPrograms = async (query?: GetAllAcademicProgramRequestDto): Promise<AcademicProgram[]> => {
    const params = buildQueryParams(query);
    const { data } = await axiosInstance.get<AcademicProgram[]>(
        `${ACADEMIC_PROGRAM_ENDPOINT_PREFFIX}/all?${params}`
    );
    return data;
}

export const updateAcademicProgram = async (updateAcademicProgramRequest: UpdateAcademicProgramRequestDto): Promise<AcademicProgram> => {
    const { data } = await axiosInstance.put<AcademicProgram>(
        `${ACADEMIC_PROGRAM_ENDPOINT_PREFFIX}/${updateAcademicProgramRequest.id}/update`,
        updateAcademicProgramRequest
    );

    return data;
}

export const deleteAcademicProgram = async (id: number): Promise<void> => {
    await axiosInstance.delete<AcademicProgram>(
        `${ACADEMIC_PROGRAM_ENDPOINT_PREFFIX}/${id}/delete`);
}




