import { Card, CardContent, Typography, Box, useTheme } from "@mui/material";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { useTranslation } from "react-i18next";
import type { CategoryCountDto } from "@/domain/dashboard/GetOrganizerDashboardResponseDto";

interface EventsByCategoryChartProps {
    data: CategoryCountDto[];
}

export default function EventsByCategoryChart({ data }: EventsByCategoryChartProps) {
    const theme = useTheme();
    const { t } = useTranslation();

    const chartData = data.map((item) => ({
        name: item.category.name,
        events: item.count,
    }));

    return (
        <Card sx={{ height: "100%" }}>
            <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {t("organizer.dashboard.charts.eventsByCategory")}
                </Typography>
                <Box sx={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                        <BarChart
                            data={chartData}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis dataKey="name" type="category" width={120} />
                            <Tooltip />
                            <Legend formatter={() => t("organizer.dashboard.charts.events")} />
                            <Bar
                                dataKey="events"
                                fill={theme.palette.primary.main}
                                radius={[0, 8, 8, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </Box>
            </CardContent>
        </Card>
    );
}
