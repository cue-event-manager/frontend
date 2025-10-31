import type { FileContentType } from "./FileContentType";

export interface File {
    id: number;
    contentType: FileContentType,
    originalName: string;
    size: number;
    path: string;
    ownerId: number;
}