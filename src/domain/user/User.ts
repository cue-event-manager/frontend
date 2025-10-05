import type { Role } from "../role/Role";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
}