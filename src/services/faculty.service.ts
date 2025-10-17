import axiosInstance from "@/config/axiosConfig";
import { ACADEMIC_SERVICE } from "./constants";
import type { Page } from "@/shared/types/DataTable";
import type { PaginationQuery } from "@/domain/common/PaginationQuery";
import type { CreateFacultyRequestDto } from "@/domain/faculty/CreateFacultyRequestDto";
import type { Faculty } from "@/domain/faculty/Faculty";
import type { FacultyPaginationRequestDto } from "@/domain/faculty/FacultyPaginationRequestDto";
import type { UpdateFacultyRequestDto } from "@/domain/faculty/UpdateFacultyRequestDto";

const FACULTY_ENDPOINT_PREFFIX = `${ACADEMIC_SERVICE}/api/faculties`


export const createFaculty = async (createFacultyRequest: CreateFacultyRequestDto): Promise<Faculty> => {
    const { data } = await axiosInstance.post<Faculty>(
        `${FACULTY_ENDPOINT_PREFFIX}/create`,
        createFacultyRequest
    );

    return data;
}


export const getFaculties = async (query: FacultyPaginationRequestDto & PaginationQuery): Promise<Page<Faculty>> => {
    const params = new URLSearchParams(query as any).toString();
    const { data } = await axiosInstance.get<Page<Faculty>>(
        `${FACULTY_ENDPOINT_PREFFIX}?${params}`
    );
    return data;
}

export const getAllFaculties = async (): Promise<Faculty[]> => {
    const { data } = await axiosInstance.get<Faculty[]>(
        `${FACULTY_ENDPOINT_PREFFIX}/all`
    );
    return data;
}

export const updateFaculty = async (updateFacultyRequest: UpdateFacultyRequestDto): Promise<Faculty> => {
    const { data } = await axiosInstance.put<Faculty>(
        `${FACULTY_ENDPOINT_PREFFIX}/${updateFacultyRequest.id}/update`,
        updateFacultyRequest
    );

    return data;
}

export const deleteFaculty = async (id: number): Promise<void> => {
    await axiosInstance.delete<Faculty>(
        `${FACULTY_ENDPOINT_PREFFIX}/${id}/delete`);
}




