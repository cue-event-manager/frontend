import { DataTableFilterBar } from "@/components/molecules/DataTableFilterBar";
import type { CampusPaginationRequestDto } from "@/domain/campus/SpaceResourcePaginationRequestDto";
import { useFilterForm } from "@/shared/hooks/useFilterForm";
import { usePaginatedFilters } from "@/shared/hooks/usePaginatedFilters";
import { TextField } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function CampusTableFilter() {
    const { t } = useTranslation();
    const { query, updateQuery, resetQuery } =
        usePaginatedFilters<CampusPaginationRequestDto>();

    const {
        filters,
        handleChange,
        resetFilters,
        setFilters,
    } = useFilterForm<CampusPaginationRequestDto>({
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
                label={t("admin.campuses.filters.name")}
                variant="outlined"
                size="small"
                value={filters.name ?? ""}
                onChange={(e) => handleChange("name", e.target.value)}
                sx={{ minWidth: 250 }}
            />
        </DataTableFilterBar>
    );
}
