import React, { useEffect, useState } from "react";
import {
    Box,
    CircularProgress,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    useMediaQuery,
    useTheme,
    Card,
    CardContent,
    Stack,
} from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import type { BaseDataTableProps } from "@/shared/types/DataTable";
import type { PaginationQuery } from "@/domain/common/PaginationQuery";
import type { Page } from "@/domain/common/Page";


const DEFAULT_PAGE_INDEX = 0;
const DEFAULT_PAGE_SIZE = 10;
const PAGE_SIZE_OPTIONS = [5, 10, 20];
const EMPTY_PLACEHOLDER = "—";


const EMPTY_PAGE: Page<any> = {
    items: [],
    page: DEFAULT_PAGE_INDEX,
    size: DEFAULT_PAGE_SIZE,
    totalElements: 0,
    totalPages: 0,
    hasNext: false,
    hasPrevious: false,
};

function renderCellValue(value: unknown): React.ReactNode {
    if (value === null || value === undefined) return EMPTY_PLACEHOLDER;
    if (typeof value === "object") {
        if (Array.isArray(value)) return `${value.length}`;
        if ("name" in (value as any)) return (value as any).name;
        return JSON.stringify(value);
    }
    if (value === "") return EMPTY_PLACEHOLDER;
    return String(value);
}


export function BaseDataTable<T>({
    data = EMPTY_PAGE,
    columns,
    loading = false,
    actions = [],
    onQueryChange,
}: BaseDataTableProps<T>) {
    const { t } = useTranslation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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

    const handleSortChange = (key: string) => {
        let direction: "asc" | "desc" = "asc";
        if (query.sortBy === key && query.sortDirection === "asc") direction = "desc";
        const newQuery = { ...query, sortBy: key, sortDirection: direction };
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
    if (isMobile) {
        return (
            <Box sx={{ width: "100%" }}>
                {loading ? (
                    <Paper
                        sx={{
                            borderRadius: 3,
                            py: 8,
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <CircularProgress size={40} thickness={4} />
                    </Paper>
                ) : items.length === 0 ? (
                    <Paper
                        sx={{
                            borderRadius: 3,
                            py: 8,
                            textAlign: "center",
                        }}
                    >
                        <Typography variant="body1" color="text.secondary" fontWeight={500}>
                            {t("table.noData")}
                        </Typography>
                    </Paper>
                ) : (
                    <>
                        <Stack spacing={2}>
                            {items.map((row, idx) => (
                                <Card
                                    key={idx}
                                    elevation={0}
                                    sx={{
                                        borderRadius: 3,
                                        border: 1,
                                        borderColor: "divider",
                                        transition: "all 0.2s ease-in-out",
                                        "&:hover": {
                                            borderColor: "primary.main",
                                            boxShadow: 1,
                                        },
                                        "&:active": {
                                            transform: "scale(0.98)",
                                        },
                                    }}
                                >
                                    <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
                                        <Stack spacing={2}>
                                            {columns.map((col, colIdx) => {
                                                const value = col.render
                                                    ? col.render(row)
                                                    : renderCellValue((row as any)[col.key]);

                                                const isPrimary = colIdx === 0;

                                                return (
                                                    <Box key={String(col.key)}>
                                                        <Typography
                                                            variant="caption"
                                                            color="text.secondary"
                                                            sx={{
                                                                fontWeight: 600,
                                                                textTransform: "uppercase",
                                                                letterSpacing: 0.5,
                                                                fontSize: "0.7rem",
                                                            }}
                                                        >
                                                            {t(col.label)}
                                                        </Typography>
                                                        <Typography
                                                            variant={isPrimary ? "body1" : "body2"}
                                                            sx={{
                                                                fontWeight: isPrimary ? 600 : 400,
                                                                color: isPrimary ? "text.primary" : "text.secondary",
                                                                mt: 0.5,
                                                            }}
                                                        >
                                                            {value}
                                                        </Typography>
                                                    </Box>
                                                );
                                            })}
                                            {actions.length > 0 && (
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        gap: 1,
                                                        justifyContent: "flex-end",
                                                        pt: 1,
                                                        mt: 1,
                                                        borderTop: 1,
                                                        borderColor: "divider",
                                                    }}
                                                >
                                                    {actions.map((action) => (
                                                        <IconButton
                                                            key={action.label}
                                                            color={action.color ?? "default"}
                                                            onClick={() => action.onClick(row)}
                                                            size="medium"
                                                            sx={{
                                                                backgroundColor: "action.hover",
                                                                "&:hover": {
                                                                    backgroundColor: "action.selected",
                                                                },
                                                            }}
                                                        >
                                                            {action.icon}
                                                        </IconButton>
                                                    ))}
                                                </Box>
                                            )}
                                        </Stack>
                                    </CardContent>
                                </Card>
                            ))}
                        </Stack>

                        <Paper
                            elevation={0}
                            sx={{
                                mt: 2,
                                borderRadius: 3,
                                border: 1,
                                borderColor: "divider",
                            }}
                        >
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
                        </Paper>
                    </>
                )}
            </Box>
        );
    }


    return (
        <Paper
            elevation={0}
            sx={{
                width: "100%",
                overflowX: "auto",
                borderRadius: 3,
                border: 1,
                borderColor: "divider",
            }}
        >
            <TableContainer sx={{ maxWidth: "100%" }}>
                <Table stickyHeader sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            {columns.map((col) => (
                                <TableCell
                                    key={String(col.key)}
                                    align={col.align ?? "left"}
                                    sx={{
                                        cursor: col.sortable ? "pointer" : "default",
                                        fontWeight: 700,
                                        whiteSpace: "nowrap",
                                        backgroundColor: "background.paper",
                                        borderBottom: 2,
                                        borderColor: "divider",
                                        fontSize: "0.8125rem",
                                        textTransform: "uppercase",
                                        color: "text.secondary",
                                        py: 2,
                                        transition: "background-color 0.2s",
                                        "&:hover": col.sortable
                                            ? {
                                                backgroundColor: "action.hover",
                                            }
                                            : {},
                                    }}
                                    onClick={() => col.sortable && handleSortChange(String(col.key))}
                                >
                                    <Box display="flex" alignItems="center" gap={0.75}>
                                        {t(col.label)}
                                        {col.sortable && (
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    opacity: query.sortBy === col.key ? 1 : 0.3,
                                                    transition: "opacity 0.2s",
                                                }}
                                            >
                                                {query.sortBy === col.key &&
                                                    query.sortDirection === "asc" ? (
                                                    <ArrowUpward fontSize="small" />
                                                ) : (
                                                    <ArrowDownward fontSize="small" />
                                                )}
                                            </Box>
                                        )}
                                    </Box>
                                </TableCell>
                            ))}
                            {actions.length > 0 && (
                                <TableCell
                                    align="center"
                                    sx={{
                                        whiteSpace: "nowrap",
                                        backgroundColor: "background.paper",
                                        fontWeight: 700,
                                        borderBottom: 2,
                                        borderColor: "divider",
                                        fontSize: "0.8125rem",
                                        textTransform: "uppercase",
                                        letterSpacing: 0.5,
                                        color: "text.secondary",
                                        py: 2,
                                    }}
                                >
                                    {t("table.actions")}
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length + (actions.length ? 1 : 0)}
                                    align="center"
                                    sx={{ border: 0 }}
                                >
                                    <Box py={8}>
                                        <CircularProgress size={40} thickness={4} />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : items.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length + (actions.length ? 1 : 0)}
                                    align="center"
                                    sx={{ border: 0 }}
                                >
                                    <Box py={8}>
                                        <Typography
                                            variant="body1"
                                            color="text.secondary"
                                            fontWeight={500}
                                        >
                                            {t("table.noData")}
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : (
                            items.map((row, idx) => (
                                <TableRow
                                    key={idx}
                                    sx={{
                                        transition: "background-color 0.2s",
                                        "&:hover": {
                                            backgroundColor: "action.hover",
                                        },
                                        "&:last-child td": {
                                            borderBottom: 0,
                                        },
                                    }}
                                >
                                    {columns.map((col) => (
                                        <TableCell
                                            key={String(col.key)}
                                            align={col.align ?? "left"}
                                            sx={{
                                                maxWidth: 300,
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                py: 2,
                                                fontSize: "0.875rem",
                                            }}
                                        >
                                            {col.render
                                                ? col.render(row)
                                                : renderCellValue((row as any)[col.key])}
                                        </TableCell>
                                    ))}
                                    {actions.length > 0 && (
                                        <TableCell align="center" sx={{ py: 1.5 }}>
                                            <Box display="flex" gap={0.5} justifyContent="center">
                                                {actions.map((action) => (
                                                    <IconButton
                                                        key={action.label}
                                                        color={action.color ?? "default"}
                                                        onClick={() => action.onClick(row)}
                                                        size="small"
                                                        sx={{
                                                            backgroundColor: "transparent",
                                                            transition: "all 0.2s",
                                                            "&:hover": {
                                                                backgroundColor: "action.selected",
                                                                transform: "scale(1.1)",
                                                            },
                                                        }}
                                                    >
                                                        {action.icon}
                                                    </IconButton>
                                                ))}
                                            </Box>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box
                sx={{
                    borderTop: 1,
                    borderColor: "divider",
                }}
            >
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
        </Paper>
    );
}