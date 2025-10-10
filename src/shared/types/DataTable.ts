import type { PaginationQuery } from "@/domain/common/PaginationQuery";
import type { ReactNode } from "react";


export interface Page<T> {
    items: T[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

export interface TableColumn<T> {
    key: keyof T | string;
    label: string;
    sortable?: boolean;
    align?: "left" | "center" | "right";
    width?: string | number;
    render?: (row: T) => ReactNode;
}

export interface TableAction<T> {
    label: string;
    icon: ReactNode;
    color?: "primary" | "error" | "inherit";
    onClick: (row: T) => void;
}

export interface BaseDataTableProps<T> {
    data: Page<T> | undefined;
    columns: TableColumn<T>[];
    loading?: boolean;
    actions?: TableAction<T>[];
    onQueryChange: (query: PaginationQuery) => void;
}