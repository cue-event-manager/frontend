import { Box, TextField, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import SearchSelect from "@/components/molecules/SearchSelect";
import { useAllEventCategories } from "@/features/eventcategory/hooks/useAllEventCategories";
import { useAllEventModalities } from "@/features/eventmodality/hooks/useAllEventModalities";

interface EventsTableFilterProps {
    onFilterChange: (filters: {
        name?: string;
        categoryId?: number;
        modalityId?: number;
        status?: string;
    }) => void;
}

export function EventsTableFilter({ onFilterChange }: EventsTableFilterProps) {
    const { t } = useTranslation();
    const { data: categories = [], isLoading: loadingCategories } = useAllEventCategories();
    const { data: modalities = [], isLoading: loadingModalities } = useAllEventModalities();

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onFilterChange({ name: event.target.value || undefined });
    };

    const handleCategoryChange = (categoryId: number | null) => {
        onFilterChange({ categoryId: categoryId || undefined });
    };

    const handleModalityChange = (modalityId: number | null) => {
        onFilterChange({ modalityId: modalityId || undefined });
    };

    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onFilterChange({ status: event.target.value || undefined });
    };

    const eventStatuses = [
        { value: "", label: t("common.all") },
        { value: "PUBLISHED", label: t("admin.events.status.published") },
        { value: "IN_PROGRESS", label: t("admin.events.status.inProgress") },
        { value: "FINISHED", label: t("admin.events.status.finished") },
        { value: "CANCELLED", label: t("admin.events.status.cancelled") },
    ];

    return (
        <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
            <TextField
                label={t("admin.events.filters.name")}
                variant="outlined"
                size="small"
                onChange={handleNameChange}
                sx={{ flex: "1 1 200px" }}
            />

            <SearchSelect
                label={t("admin.events.filters.category")}
                options={categories}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                onChange={handleCategoryChange}
                loading={loadingCategories}
                sx={{ flex: "1 1 200px" }}
            />

            <SearchSelect
                label={t("admin.events.filters.modality")}
                options={modalities}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                onChange={handleModalityChange}
                loading={loadingModalities}
                sx={{ flex: "1 1 200px" }}
            />

            <TextField
                select
                label={t("admin.events.filters.status")}
                variant="outlined"
                size="small"
                defaultValue=""
                onChange={handleStatusChange}
                sx={{ flex: "1 1 200px" }}
            >
                {eventStatuses.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </Box>
    );
}
