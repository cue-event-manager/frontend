import {
    Box,
    Button,
    Checkbox,
    Chip,
    Divider,
    FormControlLabel,
    Paper,
    Stack,
    TextField,
    Typography,
    Tooltip,
    IconButton,
    Drawer,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FilterAltOff, FilterList, Close } from "@mui/icons-material";
import useNavbarHeight from "@/shared/hooks/useNavbarHeight";
import type { EventPaginationRequestDto } from "@/domain/event/EventPaginationRequestDto";
import type { PaginationQuery } from "@/domain/common/PaginationQuery";
import { useAllEventCategories } from "@/features/eventcategory/hooks/useAllEventCategories";
import { useAllEventModalities } from "@/features/eventmodality/hooks/useAllEventModalities";

interface EventFiltersSidebarProps {
    query: PaginationQuery & EventPaginationRequestDto;
    onUpdateQuery: (newQuery: Partial<PaginationQuery & EventPaginationRequestDto>) => void;
    onResetQuery: () => void;
}

export function EventFiltersSidebar({
    query,
    onUpdateQuery,
    onResetQuery,
}: EventFiltersSidebarProps) {
    const { t } = useTranslation();
    const navbarHeight = useNavbarHeight();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [activeFiltersCount, setActiveFiltersCount] = useState(0);
    const stickyTop = (navbarHeight || 0) + 16;

    if (isMobile) {
        return (
            <>
                <Button
                    startIcon={<FilterList />}
                    variant="contained"
                    color="primary"
                    onClick={() => setDrawerOpen(true)}
                    sx={{ borderRadius: 2, textTransform: "none", width: "100%" }}
                >
                    {t("common.filters")}
                    {activeFiltersCount > 0 && (
                        <Chip
                            label={activeFiltersCount}
                            size="small"
                            color="secondary"
                            sx={{
                                ml: 1,
                                height: 22,
                                "& .MuiChip-label": { px: 0.75, fontWeight: 700 },
                            }}
                        />
                    )}
                </Button>

                <Drawer
                    anchor="bottom"
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                    PaperProps={{
                        sx: {
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            maxHeight: "85vh",
                            p: 2,
                        },
                    }}
                >
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={2}
                        px={1}
                    >
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <FilterList color="primary" />
                            <Typography variant="h6" fontWeight={700}>
                                {t("common.filters")}
                            </Typography>
                            {activeFiltersCount > 0 && (
                                <Chip
                                    label={activeFiltersCount}
                                    size="small"
                                    color="primary"
                                    sx={{ fontWeight: 700 }}
                                />
                            )}
                        </Stack>
                        <IconButton onClick={() => setDrawerOpen(false)} size="small">
                            <Close />
                        </IconButton>
                    </Box>

                    <Box sx={{ overflowY: "auto", maxHeight: "70vh", px: 0.5 }}>
                        <FiltersContent
                            query={query}
                            onUpdateQuery={onUpdateQuery}
                            onResetQuery={onResetQuery}
                            onActiveFiltersChange={setActiveFiltersCount}
                        />
                    </Box>
                </Drawer>
            </>
        );
    }

    return (
        <Paper
            elevation={3}
            sx={{
                p: { xs: 2, md: 3 },
                borderRadius: 4,
                position: "sticky",
                top: stickyTop,
                width: "100%",
                boxShadow: (theme) =>
                    theme.palette.mode === "light"
                        ? "0 18px 50px rgba(15, 23, 42, 0.1)"
                        : undefined,
                backdropFilter: "blur(6px)",
                backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                        ? theme.palette.background.paper
                        : theme.palette.background.default,
                alignSelf: "flex-start",
            }}
        >
            <FiltersContent
                query={query}
                onUpdateQuery={onUpdateQuery}
                onResetQuery={onResetQuery}
                onActiveFiltersChange={setActiveFiltersCount}
            />
        </Paper>
    );
}

interface FiltersContentProps extends EventFiltersSidebarProps {
    onActiveFiltersChange?: (count: number) => void;
}

function FiltersContent({
    query,
    onUpdateQuery,
    onResetQuery,
    onActiveFiltersChange,
}: FiltersContentProps) {
    const { t } = useTranslation();
    const categories = useAllEventCategories();
    const modalities = useAllEventModalities();

    const [name, setName] = useState(query.name ?? "");

    const selectedCategoryId = useMemo(
        () => (query.categoryId ? Number(query.categoryId) : undefined),
        [query.categoryId]
    );
    const selectedModalityId = useMemo(
        () => (query.modalityId ? Number(query.modalityId) : undefined),
        [query.modalityId]
    );

    const nameLabel = t("publicEvents.filters.name");
    const categoryLabel = t("publicEvents.filters.category");
    const modalityLabel = t("publicEvents.filters.modality");
    const dateRangeLabel = t("publicEvents.filters.dateRange", "Filtrar por fecha");
    const fromDateLabel = t("publicEvents.filters.fromDate", "Desde");
    const toDateLabel = t("publicEvents.filters.toDate", "Hasta");

    const selectedCategoryName = categories.data?.find((c) => c.id === selectedCategoryId)?.name;
    const selectedModalityName = modalities.data?.find((m) => m.id === selectedModalityId)?.name;
    const fromDateValue = query.fromDate ?? "";
    const toDateValue = query.toDate ?? "";

    useEffect(() => {
        setName(query.name ?? "");
    }, [query.name]);

    useEffect(() => {
        const trimmedName = name.trim();
        const currentName = (query.name ?? "").trim();

        if (trimmedName === currentName) return;

        const handler = setTimeout(() => {
            onUpdateQuery({ name: trimmedName || undefined, page: 0 });
        }, 300);

        return () => clearTimeout(handler);
    }, [name, query.name, onUpdateQuery]);

    const handleCategoryToggle = (id: number) => {
        const nextValue = selectedCategoryId === id ? undefined : id;
        onUpdateQuery({ categoryId: nextValue, page: 0 });
    };

    const handleModalityToggle = (id: number) => {
        const nextValue = selectedModalityId === id ? undefined : id;
        onUpdateQuery({ modalityId: nextValue, page: 0 });
    };

    const handleDateChange = (field: "fromDate" | "toDate", value: string) => {
        onUpdateQuery({ [field]: value || undefined, page: 0 });
    };

    const clearAll = () => {
        setName("");
        onResetQuery();
    };

    const activeFilters = [
        name.trim() && {
            key: "name",
            label: `${name.trim()}`,
            onDelete: () => {
                setName("");
                onUpdateQuery({ name: undefined, page: 0 });
            },
        },
        selectedCategoryName && {
            key: "category",
            label: `${selectedCategoryName}`,
            onDelete: () => onUpdateQuery({ categoryId: undefined, page: 0 }),
        },
        selectedModalityName && {
            key: "modality",
            label: `${selectedModalityName}`,
            onDelete: () => onUpdateQuery({ modalityId: undefined, page: 0 }),
        },
        (fromDateValue || toDateValue) && {
            key: "dateRange",
            label:
                fromDateValue && toDateValue
                    ? `${fromDateValue} - ${toDateValue}`
                    : fromDateValue
                        ? `${fromDateValue}`
                        : `${toDateValue}`,
            onDelete: () => {
                onUpdateQuery({ fromDate: undefined, toDate: undefined, page: 0 });
            },
        },
    ].filter(Boolean) as Array<{ key: string; label: string; onDelete: () => void }>;

    const hasFilters = activeFilters.length > 0;

    useEffect(() => {
        onActiveFiltersChange?.(activeFilters.length);
    }, [activeFilters.length, onActiveFiltersChange]);

    return (
        <Stack spacing={2.5}>
            <Box>
                <Typography variant="h6" fontWeight={700} mb={0.5}>
                    {t("publicEvents.filters.title")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {t("publicEvents.filters.subtitle")}
                </Typography>
            </Box>

            <Stack direction="column" alignItems="flex-start" gap={1.25}>
                <Stack direction="row" alignItems="center" gap={0.75}>
                    <Typography variant="subtitle2" color="text.secondary">
                        {t("publicEvents.filters.selectedFilters")}
                    </Typography>
                    <Tooltip title={t("publicEvents.filters.clearAll", "Limpiar filtros") as string}>
                        <span>
                            <IconButton
                                size="small"
                                color="default"
                                onClick={clearAll}
                                disabled={!hasFilters}
                            >
                                <FilterAltOff fontSize="small" />
                            </IconButton>
                        </span>
                    </Tooltip>
                </Stack>
                <Box
                    sx={{
                        width: "100%",
                        border: 1,
                        borderColor: "divider",
                        borderRadius: 2,
                        p: 1,
                        backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                                ? theme.palette.action.hover
                                : "background.paper",
                    }}
                >
                    <Stack direction="row" flexWrap="wrap" gap={0.75}>
                        {hasFilters ? (
                            activeFilters.map((filter) => (
                                <Chip
                                    key={filter.key}
                                    label={filter.label}
                                    onDelete={filter.onDelete}
                                    size="small"
                                    color="primary"
                                    sx={{
                                        width: { xs: "100%", sm: "auto" },
                                        justifyContent: "space-between",
                                        borderColor: "divider",
                                    }}
                                />
                            ))
                        ) : (
                            <Typography variant="body2" color="text.secondary">
                                {t("common.none", "None")}
                            </Typography>
                        )}
                    </Stack>
                </Box>
            </Stack>

            <Divider />

            <TextField
                fullWidth
                label={nameLabel}
                variant="outlined"
                size="small"
                value={name}
                placeholder={t("publicEvents.filters.namePlaceholder", "Search by name")}
                onChange={(e) => setName(e.target.value)}
            />

            <Box>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                    <Typography variant="subtitle1" fontWeight={700}>
                        {dateRangeLabel}
                    </Typography>
                </Box>
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1}
                    useFlexGap
                    sx={{ "& .MuiTextField-root": { flex: 1 } }}
                >
                    <TextField
                        type="date"
                        label={fromDateLabel}
                        value={fromDateValue}
                        onChange={(e) => handleDateChange("fromDate", e.target.value)}
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                    />
                    <TextField
                        type="date"
                        label={toDateLabel}
                        value={toDateValue}
                        onChange={(e) => handleDateChange("toDate", e.target.value)}
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                    />
                </Stack>
            </Box>

            <FilterGroup
                title={categoryLabel}
                items={categories.data ?? []}
                loading={categories.isLoading}
                selectedId={selectedCategoryId}
                onToggle={handleCategoryToggle}
                clearLabel={t("common.actions.clear")}
                emptyLabel={t("common.noResultsFound", "No options available")}
            />

            <FilterGroup
                title={modalityLabel}
                items={modalities.data ?? []}
                loading={modalities.isLoading}
                selectedId={selectedModalityId}
                onToggle={handleModalityToggle}
                clearLabel={t("common.actions.clear")}
                emptyLabel={t("common.noResultsFound", "No options available")}
            />
        </Stack>
    );
}

interface FilterItem {
    id: number;
    name: string;
}

interface FilterGroupProps {
    title: string;
    items: FilterItem[];
    loading?: boolean;
    selectedId?: number;
    onToggle: (id: number) => void;
    clearLabel: string;
    emptyLabel: string;
}

function FilterGroup({
    title,
    items,
    loading,
    selectedId,
    onToggle,
    clearLabel,
    emptyLabel,
}: FilterGroupProps) {
    return (
        <Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                <Typography variant="subtitle1" fontWeight={700}>
                    {title}
                </Typography>
                {selectedId !== undefined && (
                    <Button
                        size="small"
                        variant="text"
                        color="inherit"
                        onClick={() => onToggle(selectedId)}
                        sx={{ textTransform: "none" }}
                    >
                        {clearLabel}
                    </Button>
                )}
            </Box>

            <Box
                sx={{
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 2,
                    p: 1.25,
                    maxHeight: 220,
                    overflowY: "auto",
                    backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                            ? theme.palette.background.default
                            : "background.paper",
                }}
            >
                <Stack spacing={0.5}>
                    {loading
                        ? Array.from({ length: 4 }).map((_, index) => (
                              <Box
                                  key={index}
                                  sx={{
                                      height: 32,
                                      borderRadius: 1,
                                      backgroundColor: "action.hover",
                                      opacity: 0.3,
                                  }}
                              />
                          ))
                        : items.map((item) => (
                              <FormControlLabel
                                  key={item.id}
                                  control={
                                      <Checkbox
                                          checked={selectedId === item.id}
                                          onChange={() => onToggle(item.id)}
                                          color="primary"
                                      />
                                  }
                                  label={item.name}
                                  sx={{
                                      mx: 0,
                                      borderRadius: 1,
                                      "&:hover": {
                                          backgroundColor: "action.hover",
                                      },
                                  }}
                              />
                          ))}

                    {!loading && items.length === 0 && (
                        <Typography variant="body2" color="text.secondary" px={0.5}>
                            {emptyLabel}
                        </Typography>
                    )}
                </Stack>
            </Box>
        </Box>
    );
}
