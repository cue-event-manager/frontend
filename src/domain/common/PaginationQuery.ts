export interface PaginationQuery {
    page: number;
    size: number;
    sortBy?: string
    sortDirection?: 'asc' |'desc';
}