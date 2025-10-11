export interface UpdateUserRequestDto {
    id: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    roleId?: string;
    identification?: string;
    birthDate?: Date;
}