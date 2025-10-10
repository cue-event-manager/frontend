import { DataTableFilterBar } from "@/components/molecules/DataTableFilterBar";
import type { UserPaginationQuery } from "@/domain/user/UserPaginationQuery";
import { useFilterForm } from "@/shared/hooks/useFilterForm";
import { usePaginatedFilters } from "@/shared/hooks/usePaginatedFilters";
import { MenuItem, TextField } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function UsersTableFilter() {
    const { t } = useTranslation();
    const { query, updateQuery, resetQuery } = usePaginatedFilters<UserPaginationQuery>();
    const { filters, handleChange, resetFilters, setFilters } = useFilterForm<UserPaginationQuery>({
        name: query.name ?? "",
        identification: query.identification ?? "",
        roleId: query.roleId ?? undefined,
    });

    useEffect(() => {
        setFilters({
            name: query.name ?? "",
            identification: query.identification ?? "",
            roleId: query.roleId ?? undefined,
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
                label={t("users.filters.name")}
                variant="outlined"
                size="small"
                value={filters.name ?? ""}
                onChange={(e) => handleChange("name", e.target.value)}
                sx={{ minWidth: 200 }}
            />

            <TextField
                label={t("users.filters.identification")}
                variant="outlined"
                size="small"
                value={filters.identification ?? ""}
                onChange={(e) => handleChange("identification", e.target.value)}
                sx={{ minWidth: 200 }}
            />

            <TextField
                select
                label={t("users.filters.role")}
                variant="outlined"
                size="small"
                value={filters.roleId ?? ""}
                onChange={(e) =>
                    handleChange("roleId", e.target.value ? Number(e.target.value) : undefined)
                }
                sx={{ minWidth: 180 }}
            >
                <MenuItem value="">{t("users.filters.allRoles")}</MenuItem>
                <MenuItem value={1}>Administrador</MenuItem>
                <MenuItem value={2}>Organizador</MenuItem>
                <MenuItem value={3}>Asistente</MenuItem>
            </TextField>
        </DataTableFilterBar>
    );
}