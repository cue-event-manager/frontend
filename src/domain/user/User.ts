import type { Role } from "../role/Role";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    role: Role;
    identification: string;
    birthDate:  Date
}