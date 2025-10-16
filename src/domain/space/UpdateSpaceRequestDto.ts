export interface UpdateSpaceRequestDto {
    id: number;
    name?: string;
    campusId?: number;
    typeId?: number;
    statusId?: number;
    capacity?: number;
    resourceIds?: number[]
}