import React, { useEffect, useState } from "react";
import {
    Box,
    CircularProgress,
    Stack,
    Typography,
    TablePagination,
    Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Refresh } from "@mui/icons-material";
import type { PaginationQuery } from "@/domain/common/PaginationQuery";
import type { Page } from "@/domain/common/Page";

const DEFAULT_PAGE_INDEX = 0;
const DEFAULT_PAGE_SIZE = 10;
const PAGE_SIZE_OPTIONS = [5, 10, 20];
const EMPTY_PAGE: Page<any> = {
    items: [],
    page: DEFAULT_PAGE_INDEX,
    size: DEFAULT_PAGE_SIZE,
    totalElements: 0,
    totalPages: 0,
    hasNext: false,
    hasPrevious: false,
};

interface BaseEntityListProps<T> {
    data?: Page<T>;
    loading?: boolean;
    error?: Error | null;
    renderItem: (item: T) => React.ReactNode;
    onQueryChange: (query: PaginationQuery) => void;
    filters?: React.ReactNode;
    onReload?: () => void;
    onCreate?: () => void;
    title?: string;
}


export function BaseEntityList<T>({
    data = EMPTY_PAGE,
    loading = false,
    error,
    renderItem,
    onQueryChange,
    filters,
    onReload,
    onCreate,
    title,
}: BaseEntityListProps<T>) {
    const { t } = useTranslation();

    const [query, setQuery] = useState<PaginationQuery>({
        page: data.page ?? DEFAULT_PAGE_INDEX,
        size: data.size ?? DEFAULT_PAGE_SIZE,
        sortBy: undefined,
        sortDirection: undefined,
    });

    useEffect(() => {
        setQuery((prev) => ({
            ...prev,
            page: data.page ?? prev.page,
            size: data.size ?? prev.size,
        }));
    }, [data.page, data.size]);

    const handlePageChange = (_: unknown, newPage: number) => {
        const newQuery = { ...query, page: newPage };
        setQuery(newQuery);
        onQueryChange(newQuery);
    };

    const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSize = parseInt(e.target.value, 10);
        const newQuery = { ...query, page: DEFAULT_PAGE_INDEX, size: newSize };
        setQuery(newQuery);
        onQueryChange(newQuery);
    };

    const items = data?.items ?? [];
    const totalElements = data?.totalElements ?? 0;
    const currentPage = data?.page ?? DEFAULT_PAGE_INDEX;
    const pageSize = data?.size ?? DEFAULT_PAGE_SIZE;

    if (loading) {
        return (
            <Box display="flex" flexDirection="column" alignItems="center" py={8}>
                <CircularProgress size={48} />
                <Typography mt={2}>{t("common.loading")}</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box textAlign="center" py={8}>
                <Typography color="error" fontWeight={600}>
                    {t("common.error")}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                    {error.message || t("common.errorGeneric")}
                </Typography>
                {onReload && (
                    <Button startIcon={<Refresh />} variant="outlined" onClick={onReload}>
                        {t("common.actions.retry")}
                    </Button>
                )}
            </Box>
        );
    }

    if (!items || items.length === 0) {
        return (
            <Box textAlign="center" py={8}>
                <Typography variant="body1" color="text.secondary" mb={2}>
                    {t("common.noResults")}
                </Typography>
                <Stack direction="row" justifyContent="center" spacing={2}>
                    {onReload && (
                        <Button startIcon={<Refresh />} onClick={onReload} variant="outlined">
                            {t("common.actions.reload")}
                        </Button>
                    )}
                    {onCreate && (
                        <Button variant="contained" onClick={onCreate}>
                            {t("common.actions.create")}
                        </Button>
                    )}
                </Stack>
            </Box>
        );
    }

    return (
        <Box>
            {title && (
                <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                    {t(title)}
                </Typography>
            )}

            {filters && <Box sx={{ mb: 3 }}>{filters}</Box>}

            <Stack spacing={6} direction={'row'} flexWrap={'wrap'}  useFlexGap>
                {items.map((item, idx) => (
                    <Box key={idx}>{renderItem(item)}</Box>
                ))}
            </Stack>

            <Box sx={{ borderTop: 1, borderColor: "divider", mt: 2 }}>
                <TablePagination
                    component="div"
                    count={totalElements}
                    page={currentPage}
                    rowsPerPage={pageSize}
                    rowsPerPageOptions={PAGE_SIZE_OPTIONS}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    labelRowsPerPage={t("table.rowsPerPage")}
                    labelDisplayedRows={({ from, to, count }) =>
                        `${from}-${to} ${t("table.of")} ${count}`
                    }
                />
            </Box>
        </Box>
    );
}
