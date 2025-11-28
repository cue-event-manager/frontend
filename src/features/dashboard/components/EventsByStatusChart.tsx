import { Card, CardContent, Typography, Box, useTheme } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useTranslation } from "react-i18next";
import type { StatusCountDto } from "@/domain/dashboard/GetOrganizerDashboardResponseDto";

interface EventsByStatusChartProps {
    data: StatusCountDto[];
}

const STATUS_COLORS: Record<string, string> = {
    PUBLISHED: "#2196F3",
    IN_PROGRESS: "#4CAF50",
    FINISHED: "#FF9800",
    CANCELLED: "#F44336",
};

export default function EventsByStatusChart({ data }: EventsByStatusChartProps) {
    const theme = useTheme();
    const { t } = useTranslation();

    const getStatusTranslation = (status: string): string => {
        const statusMap: Record<string, string> = {
            PUBLISHED: t("events.status.PUBLISHED"),
            IN_PROGRESS: t("events.status.IN_PROGRESS"),
            FINISHED: t("events.status.FINISHED"),
            CANCELLED: t("events.status.CANCELLED"),
        };
        return statusMap[status] || status;
    };

    const chartData = data.map((item) => ({
        name: getStatusTranslation(item.status),
        value: item.count,
        color: STATUS_COLORS[item.status] || theme.palette.primary.main,
    }));

    return (
        <Card sx={{ height: "100%" }}>
            <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {t("organizer.dashboard.charts.eventsByStatus")}
                </Typography>
                <Box sx={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) =>
                                    `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`
                                }
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Box>
            </CardContent>
        </Card>
    );
}
