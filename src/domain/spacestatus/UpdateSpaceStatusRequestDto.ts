export interface UpdateSpaceStatusRequestDto {
    id: number;
    name: string;
    description?: string;
    canBeReserved: boolean;
}