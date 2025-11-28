import { Box, Button, ButtonGroup, TextField } from "@mui/material";
import { useState } from "react";
import { format, subDays, startOfMonth, endOfMonth } from "date-fns";
import { useTranslation } from "react-i18next";

interface DashboardDateRangePickerProps {
    fromDate: string;
    toDate: string;
    onDateRangeChange: (fromDate: string, toDate: string) => void;
}

export default function DashboardDateRangePicker({
    fromDate,
    toDate,
    onDateRangeChange,
}: DashboardDateRangePickerProps) {
    const { t } = useTranslation();
    const [activePreset, setActivePreset] = useState<string | null>(null);

    const presets = [
        {
            label: t("organizer.dashboard.dateRange.presets.last7Days"),
            getValue: () => ({
                from: format(subDays(new Date(), 7), "yyyy-MM-dd"),
                to: format(new Date(), "yyyy-MM-dd"),
            }),
        },
        {
            label: t("organizer.dashboard.dateRange.presets.last30Days"),
            getValue: () => ({
                from: format(subDays(new Date(), 30), "yyyy-MM-dd"),
                to: format(new Date(), "yyyy-MM-dd"),
            }),
        },
        {
            label: t("organizer.dashboard.dateRange.presets.last90Days"),
            getValue: () => ({
                from: format(subDays(new Date(), 90), "yyyy-MM-dd"),
                to: format(new Date(), "yyyy-MM-dd"),
            }),
        },
        {
            label: t("organizer.dashboard.dateRange.presets.thisMonth"),
            getValue: () => ({
                from: format(startOfMonth(new Date()), "yyyy-MM-dd"),
                to: format(endOfMonth(new Date()), "yyyy-MM-dd"),
            }),
        },
    ];

    const handlePresetClick = (preset: typeof presets[0]) => {
        const { from, to } = preset.getValue();
        setActivePreset(preset.label);
        onDateRangeChange(from, to);
    };

    const handleCustomDateChange = (field: "from" | "to", value: string) => {
        setActivePreset(null);
        if (field === "from") {
            onDateRangeChange(value, toDate);
        } else {
            onDateRangeChange(fromDate, value);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 2,
                alignItems: { xs: "stretch", md: "center" },
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, flex: 1 }}>
                <ButtonGroup
                    orientation="vertical"
                    variant="outlined"
                    sx={{
                        display: { xs: "flex", sm: "none" },
                        width: "100%",
                    }}
                >
                    {presets.map((preset) => (
                        <Button
                            key={preset.label}
                            onClick={() => handlePresetClick(preset)}
                            variant={activePreset === preset.label ? "contained" : "outlined"}
                            sx={{
                                textTransform: "none",
                                fontWeight: activePreset === preset.label ? 600 : 400,
                                justifyContent: "flex-start",
                            }}
                        >
                            {preset.label}
                        </Button>
                    ))}
                </ButtonGroup>

                <ButtonGroup
                    variant="outlined"
                    sx={{
                        display: { xs: "none", sm: "flex" },
                        flexWrap: "wrap",
                        "& .MuiButtonGroup-grouped:not(:last-of-type)": {
                            borderRight: 1,
                        },
                    }}
                >
                    {presets.map((preset) => (
                        <Button
                            key={preset.label}
                            onClick={() => handlePresetClick(preset)}
                            variant={activePreset === preset.label ? "contained" : "outlined"}
                            sx={{
                                textTransform: "none",
                                fontWeight: activePreset === preset.label ? 600 : 400,
                                whiteSpace: "nowrap",
                            }}
                        >
                            {preset.label}
                        </Button>
                    ))}
                </ButtonGroup>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    flexDirection: { xs: "column", sm: "row" },
                    width: { xs: "100%", md: "auto" },
                }}
            >
                <TextField
                    label={t("organizer.dashboard.dateRange.fromDate")}
                    type="date"
                    value={fromDate}
                    onChange={(e) => handleCustomDateChange("from", e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    sx={{ flex: 1, minWidth: { xs: "100%", sm: 150 } }}
                />
                <TextField
                    label={t("organizer.dashboard.dateRange.toDate")}
                    type="date"
                    value={toDate}
                    onChange={(e) => handleCustomDateChange("to", e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    sx={{ flex: 1, minWidth: { xs: "100%", sm: 150 } }}
                />
            </Box>
        </Box>
    );
}
