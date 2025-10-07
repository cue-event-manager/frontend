export interface UpdateProfileRequestDto {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    currentPassword?: string;
    newPassword?: string;
}
