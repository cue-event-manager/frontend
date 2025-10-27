import {
    Box,
    IconButton,
    useMediaQuery,
    useTheme,
    Drawer,
    Button,
    Typography,
    Divider,
    Chip,
} from "@mui/material";
import { Search, Clear, FilterList, Close } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useState } from "react";

interface DataTableFilterBarProps {
    children: React.ReactNode;
    onSearch: () => void;
    onClear: () => void;
    activeFiltersCount?: number;
}

export function DataTableFilterBar({
    children,
    onSearch,
    onClear,
    activeFiltersCount = 0,
}: DataTableFilterBarProps) {
    const { t } = useTranslation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleSearch = () => {
        onSearch();
        setDrawerOpen(false);
    };

    const handleClear = () => {
        onClear();
        setDrawerOpen(false);
    };

    if (isMobile) {
        return (
            <>
                <Box display="flex" justifyContent="flex-end" mb={2}>
                    <Button
                        startIcon={<FilterList />}
                        variant="contained"
                        onClick={() => setDrawerOpen(true)}
                        sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            px: 3,
                            py: 1,
                            position: "relative",
                        }}
                    >
                        {t("common.filters")}
                        {activeFiltersCount > 0 && (
                            <Chip
                                label={activeFiltersCount}
                                size="small"
                                color="error"
                                sx={{
                                    height: 20,
                                    minWidth: 20,
                                    ml: 1,
                                    "& .MuiChip-label": {
                                        px: 0.75,
                                        fontSize: "0.75rem",
                                    },
                                }}
                            />
                        )}
                    </Button>
                </Box>

                <Drawer
                    anchor="bottom"
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                    PaperProps={{
                        sx: {
                            borderTopLeftRadius: 24,
                            borderTopRightRadius: 24,
                            maxHeight: "85vh",
                            pb: 2,
                        },
                    }}
                >
                    <Box
                        sx={{
                            width: 40,
                            height: 4,
                            backgroundColor: "divider",
                            borderRadius: 2,
                            mx: "auto",
                            mt: 1.5,
                            mb: 2,
                        }}
                    />

                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        px={3}
                        pb={2}
                    >
                        <Box display="flex" alignItems="center" gap={1}>
                            <FilterList color="primary" />
                            <Typography variant="h6" fontWeight={600}>
                                {t("common.filters")}
                            </Typography>
                            {activeFiltersCount > 0 && (
                                <Chip
                                    label={activeFiltersCount}
                                    size="small"
                                    color="primary"
                                    variant="filled"
                                />
                            )}
                        </Box>
                        <IconButton
                            onClick={() => setDrawerOpen(false)}
                            size="small"
                            sx={{
                                backgroundColor: "action.hover",
                            }}
                        >
                            <Close fontSize="small" />
                        </IconButton>
                    </Box>

                    <Divider />

                    <Box
                        sx={{
                            px: 3,
                            py: 3,
                            overflowY: "auto",
                            maxHeight: "calc(85vh - 180px)",
                        }}
                    >
                        <Box display="flex" flexDirection="column" gap={2.5}>
                            {children}
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            px: 3,
                            pt: 2,
                            backgroundColor: "background.paper",
                            borderTop: 1,
                            borderColor: "divider",
                        }}
                    >
                        <Box display="flex" gap={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<Search />}
                                onClick={handleSearch}
                                fullWidth
                                sx={{
                                    borderRadius: 2,
                                    py: 1.25,
                                    textTransform: "none",
                                    fontWeight: 600,
                                }}
                            >
                                {t("common.actions.search")}
                            </Button>
                            <Button
                                variant="outlined"
                                color="inherit"
                                startIcon={<Clear />}
                                onClick={handleClear}
                                sx={{
                                    borderRadius: 2,
                                    py: 1.25,
                                    textTransform: "none",
                                    minWidth: 110,
                                }}
                            >
                                {t("common.actions.clear")}
                            </Button>
                        </Box>
                    </Box>
                </Drawer>
            </>
        );
    }

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "flex-end",
                gap: 2,
                mb: 3,
                flexWrap: "wrap",
                borderRadius: 3,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 2,
                    flexWrap: "wrap",
                    flex: 1,
                }}
            >
                {children}
            </Box>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Search />}
                    onClick={onSearch}
                    sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        px: 3,
                        fontWeight: 600,
                        boxShadow: 1,
                        "&:hover": {
                            boxShadow: 2,
                        },
                    }}
                >
                    {t("common.actions.search")}
                </Button>
                <Button
                    variant="outlined"
                    color="inherit"
                    startIcon={<Clear />}
                    onClick={onClear}
                    sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        px: 2.5,
                    }}
                >
                    {t("common.actions.clear")}
                </Button>
            </Box>
        </Box>
    );
}