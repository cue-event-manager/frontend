import { Card, CardContent, Typography, Box, useTheme } from "@mui/material";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useTranslation } from "react-i18next";
import type { DailyRegistrationsDto } from "@/domain/dashboard/GetOrganizerDashboardResponseDto";
import { format, parseISO } from "date-fns";

interface RegistrationsOverTimeChartProps {
    data: DailyRegistrationsDto[];
}

export default function RegistrationsOverTimeChart({
    data,
}: RegistrationsOverTimeChartProps) {
    const theme = useTheme();
    const { t } = useTranslation();

    const chartData = data.map((item) => ({
        date: format(parseISO(item.date), "MMM dd"),
        registrations: item.registrations,
    }));

    return (
        <Card sx={{ height: "100%" }}>
            <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {t("organizer.dashboard.charts.registrationsOverTime")}
                </Typography>
                <Box sx={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                        <AreaChart
                            data={chartData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorRegistrations" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="5%"
                                        stopColor={theme.palette.primary.main}
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor={theme.palette.primary.main}
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip
                                formatter={(value: number) => [value, t("organizer.dashboard.charts.registrations")]}
                            />
                            <Area
                                type="monotone"
                                dataKey="registrations"
                                stroke={theme.palette.primary.main}
                                fillOpacity={1}
                                fill="url(#colorRegistrations)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </Box>
            </CardContent>
        </Card>
    );
}
