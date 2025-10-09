export interface ResetPasswordRequestDto {
    email: string;
    newPassword: string;
    code: string
}