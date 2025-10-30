import { DataTableFilterBar } from "@/components/molecules/DataTableFilterBar";
import type { EventCategoryPaginationRequestDto } from "@/domain/eventcategory/EventCategoryPaginationRequestDto";
import { useFilterForm } from "@/shared/hooks/useFilterForm";
import { usePaginatedFilters } from "@/shared/hooks/usePaginatedFilters";
import { TextField } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function EventCategoriesTableFilter() {
    const { t } = useTranslation();
    const { query, updateQuery, resetQuery } =
        usePaginatedFilters<EventCategoryPaginationRequestDto>();

    const {
        filters,
        handleChange,
        resetFilters,
        setFilters,
    } = useFilterForm<EventCategoryPaginationRequestDto>({
        name: query.name ?? "",
    });

    useEffect(() => {
        setFilters({
            name: query.name ?? "",
        });
    }, [query, setFilters]);

    const handleSearch = () => updateQuery({ ...filters, page: 0 });

    const handleClear = () => {
        resetFilters();
        resetQuery();
    };

    return (
        <DataTableFilterBar onSearch={handleSearch} onClear={handleClear}>
            <TextField
                label={t("admin.eventCategories.filters.name")}
                variant="outlined"
                size="small"
                value={filters.name ?? ""}
                onChange={(e) => handleChange("name", e.target.value)}
                sx={{ minWidth: 250 }}
            />
        </DataTableFilterBar>
    );
}
