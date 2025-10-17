import type { Faculty } from "../faculty/Faculty";

export interface AcademicProgram {
    id: number;
    name: string;
    description: string;
    faculty: Faculty;
    createdAt: Date
}