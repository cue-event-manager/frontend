import { useEffect } from "react";
import { TextField, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { DataTableFilterBar } from "@/components/molecules/DataTableFilterBar";
import { useFilterForm } from "@/shared/hooks/useFilterForm";
import { usePaginatedFilters } from "@/shared/hooks/usePaginatedFilters";
import { SearchSelect } from "@/components/molecules/SearchSelect";
import { useAllEventCategories } from "@/features/eventcategory/hooks/useAllEventCategories";
import { useAllEventModalities } from "@/features/eventmodality/hooks/useAllEventModalities";
import type { EventPaginationRequestDto } from "@/domain/event/EventPaginationRequestDto";

export function EventsTableFilter() {
    const { t } = useTranslation();

    const categories = useAllEventCategories();
    const modalities = useAllEventModalities();

    const { query, updateQuery, resetQuery } =
        usePaginatedFilters<EventPaginationRequestDto>();

    const { filters, handleChange, setFilters, resetFilters } =
        useFilterForm<EventPaginationRequestDto>({
            name: query.name ?? "",
            categoryId: query.categoryId ?? undefined,
            modalityId: query.modalityId ?? undefined,
            status: query.status ?? "",
        });

    useEffect(() => {
        setFilters({
            name: query.name ?? "",
            categoryId: query.categoryId ? Number(query.categoryId) : undefined,
            modalityId: query.modalityId ? Number(query.modalityId) : undefined,
            status: query.status ?? "",
        });
    }, [query, setFilters]);

    const handleSearch = () => updateQuery({ ...filters, page: 0 });
    const handleClear = () => {
        resetFilters();
        resetQuery();
    };

    const eventStatuses = [
        { value: "", label: t("common.all") },
        { value: "PUBLISHED", label: t("admin.events.status.published") },
        { value: "IN_PROGRESS", label: t("admin.events.status.inProgress") },
        { value: "FINISHED", label: t("admin.events.status.finished") },
        { value: "CANCELLED", label: t("admin.events.status.cancelled") },
    ];

    return (
        <DataTableFilterBar onSearch={handleSearch} onClear={handleClear}>
            <TextField
                label={t("admin.events.filters.name")}
                variant="outlined"
                size="small"
                value={filters.name ?? ""}
                onChange={(e) => handleChange("name", e.target.value)}
                sx={{ minWidth: 220 }}
            />

            <SearchSelect
                label={t("admin.events.filters.category")}
                value={filters.categoryId ?? null}
                onChange={(value) => handleChange("categoryId", value ?? undefined)}
                options={categories.data?.map((c) => ({ label: c.name, value: c.id })) ?? []}
                loading={categories.isLoading}
                placeholder={t("common.actions.select")}
                reserveHelperTextSpace={false}
                sx={{ minWidth: 200 }}
            />

            <SearchSelect
                label={t("admin.events.filters.modality")}
                value={filters.modalityId ?? null}
                onChange={(value) => handleChange("modalityId", value ?? undefined)}
                options={modalities.data?.map((m) => ({ label: m.name, value: m.id })) ?? []}
                loading={modalities.isLoading}
                placeholder={t("common.actions.select")}
                reserveHelperTextSpace={false}
                sx={{ minWidth: 200 }}
            />

            <TextField
                select
                label={t("admin.events.filters.status")}
                variant="outlined"
                size="small"
                value={filters.status ?? ""}
                onChange={(e) => handleChange("status", e.target.value)}
                sx={{ minWidth: 200 }}
            >
                {eventStatuses.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </DataTableFilterBar>
    );
}
