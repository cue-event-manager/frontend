export interface CreateSpaceRequestDto {
    name: string;
    campusId: number;
    typeId: number;
    statusId: number;
    capacity: number;
    resourceIds: number[]
}