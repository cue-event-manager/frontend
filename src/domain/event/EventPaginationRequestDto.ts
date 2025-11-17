export interface EventPaginationRequestDto {
    name?: string;
    categoryId?: number;
    modalityId?: number;
    status?: string;
    recurrenceMode?: string;
    fromDate?: string;
    toDate?: string;
}
