import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { TextField } from "@mui/material";
import { DataTableFilterBar } from "@/components/molecules/DataTableFilterBar";
import { useFilterForm } from "@/shared/hooks/useFilterForm";
import { usePaginatedFilters } from "@/shared/hooks/usePaginatedFilters";
import type { SpacePaginationRequestDto } from "@/domain/space/SpacePaginationRequestDto";
import { useAllCampuses } from "@/features/campus/hooks/useAllCampuses";
import { useAllSpaceTypes } from "@/features/spacetype/hooks/useAllSpaceTypes";
import { useAllSpaceStatuses } from "@/features/spacestatus/hooks/useAllSpaceStatuses";
import { SearchSelect } from "@/components/molecules/SearchSelect";

export function SpacesTableFilter() {
    const { t } = useTranslation();

    const campuses = useAllCampuses();
    const types = useAllSpaceTypes();
    const statuses = useAllSpaceStatuses();

    const { query, updateQuery, resetQuery } =
        usePaginatedFilters<SpacePaginationRequestDto>();

    const { filters, handleChange, setFilters, resetFilters } =
        useFilterForm<SpacePaginationRequestDto>({
            name: query.name ?? "",
            campusId: query.campusId ?? undefined,
            typeId: query.typeId ?? undefined,
            statusId: query.statusId ?? undefined,
        });

    useEffect(() => {
        setFilters({
            name: query.name ?? "",
            campusId: query.campusId ? Number(query.campusId) : undefined,
            typeId: query.typeId ? Number(query.typeId) : undefined,
            statusId: query.statusId ? Number(query.statusId) : undefined,
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
                label={t("admin.spaces.fields.name")}
                variant="outlined"
                value={filters.name ?? ""}
                onChange={(e) => handleChange("name", e.target.value)}
                sx={{ minWidth: 200 }}
            />

            <SearchSelect
                label={t("admin.spaces.fields.campus")}
                value={filters.campusId ?? null}
                onChange={(value) => handleChange("campusId", value ?? undefined)}
                options={campuses.data?.map((c) => ({ label: c.name, value: c.id })) ?? []}
                loading={campuses.isLoading}
                placeholder={t("common.actions.select")}
                reserveHelperTextSpace={false}
                sx={{ minWidth: 200 }}
            />

            <SearchSelect
                label={t("admin.spaces.fields.type")}
                value={filters.typeId ?? null}
                onChange={(value) => handleChange("typeId", value ?? undefined)}
                options={types.data?.map((t) => ({ label: t.name, value: t.id })) ?? []}
                loading={types.isLoading}
                placeholder={t("common.actions.select")}
                reserveHelperTextSpace={false}
                sx={{ minWidth: 200 }}
            />

            <SearchSelect
                label={t("admin.spaces.fields.status")}
                value={filters.statusId ?? null}
                onChange={(value) => handleChange("statusId", value ?? undefined)}
                options={statuses.data?.map((s) => ({ label: s.name, value: s.id })) ?? []}
                loading={statuses.isLoading}
                placeholder={t("common.actions.select")}
                reserveHelperTextSpace={false}
                sx={{ minWidth: 200 }}
            />

        </DataTableFilterBar>
    );
}
