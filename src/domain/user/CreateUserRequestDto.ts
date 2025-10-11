export interface CreateUserRequestDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleId: string;
    identification?: string;
    birthDate: Date;
}