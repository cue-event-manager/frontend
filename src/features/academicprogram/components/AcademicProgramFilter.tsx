import { DataTableFilterBar } from "@/components/molecules/DataTableFilterBar";
import { SearchSelect } from "@/components/molecules/SearchSelect";
import type { AcademicProgramPaginationRequestDto } from "@/domain/academicprogram/AcademicProgramPaginationRequestDto";
import { useAllFaculties } from "@/features/faculty/hooks/useAllFaculties";
import { useFilterForm } from "@/shared/hooks/useFilterForm";
import { usePaginatedFilters } from "@/shared/hooks/usePaginatedFilters";
import { TextField } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function AcademicProgramsTableFilter() {
    const { t } = useTranslation();
    const faculties = useAllFaculties();
    const { query, updateQuery, resetQuery } =
        usePaginatedFilters<AcademicProgramPaginationRequestDto>();

    const {
        filters,
        handleChange,
        resetFilters,
        setFilters,
    } = useFilterForm<AcademicProgramPaginationRequestDto>({
        name: query.name ?? "",
        facultyId: query.facultyId ?? undefined
    });

    useEffect(() => {
        setFilters({
            name: query.name ?? "",
            facultyId: query.facultyId ?? undefined
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
                label={t("admin.academicPrograms.filters.name")}
                variant="outlined"
                size="small"
                value={filters.name ?? ""}
                onChange={(e) => handleChange("name", e.target.value)}
                sx={{ minWidth: 250 }}
            />


            <SearchSelect
                label={t("admin.academicPrograms.fields.faculty")}
                value={filters.facultyId ?? null}
                onChange={(value) => handleChange("facultyId", value ?? undefined)}
                options={faculties.data?.map((c) => ({ label: c.name, value: c.id })) ?? []}
                loading={faculties.isLoading}
                placeholder={t("common.actions.select")}
                reserveHelperTextSpace={false}
                sx={{ minWidth: 200 }}
            />
        </DataTableFilterBar>
    );
}
