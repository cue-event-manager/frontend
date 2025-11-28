import { useState } from "react";
import {
    Box,
    CircularProgress,
    Alert,
    Paper,
    Grid,
} from "@mui/material";
import { format, subDays } from "date-fns";
import { useTranslation } from "react-i18next";
import { useOrganizerDashboard } from "@/features/dashboard/hooks/useOrganizerDashboard";
import DashboardDateRangePicker from "@/features/dashboard/components/DashboardDateRangePicker";
import DashboardSummaryCards from "@/features/dashboard/components/DashboardSummaryCards";
import EventsByStatusChart from "@/features/dashboard/components/EventsByStatusChart";
import EventsByCategoryChart from "@/features/dashboard/components/EventsByCategoryChart";
import EventsByModalityChart from "@/features/dashboard/components/EventsByModalityChart";
import RegistrationsOverTimeChart from "@/features/dashboard/components/RegistrationsOverTimeChart";
import { OrganizerSection } from "@/features/organizer/components/OrganizerSection";

export default function OrganizerDashboardPage() {
    const { t } = useTranslation();
    const [dateRange, setDateRange] = useState({
        fromDate: format(subDays(new Date(), 30), "yyyy-MM-dd"),
        toDate: format(new Date(), "yyyy-MM-dd"),
    });

    const { data, isLoading, error } = useOrganizerDashboard(dateRange);

    const handleDateRangeChange = (fromDate: string, toDate: string) => {
        setDateRange({ fromDate, toDate });
    };

    return (
        <OrganizerSection.Root withPaper={false}>
            <OrganizerSection.Header
                title="organizer.dashboard.title"
                description="organizer.dashboard.subtitle"
            />

            <OrganizerSection.Body>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            border: (theme) => `1px solid ${theme.palette.divider}`,
                            borderRadius: 2,
                        }}
                    >
                        <DashboardDateRangePicker
                            fromDate={dateRange.fromDate}
                            toDate={dateRange.toDate}
                            onDateRangeChange={handleDateRangeChange}
                        />
                    </Paper>

                    {isLoading && (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                minHeight: 400,
                            }}
                        >
                            <CircularProgress size={60} />
                        </Box>
                    )}

                    {error && (
                        <Alert severity="error" sx={{ borderRadius: 2 }}>
                            {t("organizer.dashboard.error", { message: error.message })}
                        </Alert>
                    )}

                    {data && !isLoading && (
                        <>
                            <DashboardSummaryCards summary={data.summary} />

                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12 }}>
                                    <RegistrationsOverTimeChart
                                        data={data.registrationsOverTime}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <EventsByStatusChart data={data.eventsByStatus} />
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <EventsByModalityChart data={data.eventsByModality} />
                                </Grid>

                                <Grid size={{ xs: 12 }}>
                                    <EventsByCategoryChart data={data.eventsByCategory} />
                                </Grid>
                            </Grid>
                        </>
                    )}
                </Box>
            </OrganizerSection.Body>
        </OrganizerSection.Root>
    );
}
