import { Card, CardContent, Typography, Box, useTheme } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useTranslation } from "react-i18next";
import type { ModalityCountDto } from "@/domain/dashboard/GetOrganizerDashboardResponseDto";

interface EventsByModalityChartProps {
    data: ModalityCountDto[];
}

const MODALITY_COLORS = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
];

export default function EventsByModalityChart({ data }: EventsByModalityChartProps) {
    const theme = useTheme();
    const { t } = useTranslation();

    const chartData = data.map((item, index) => ({
        name: item.modality.name,
        value: item.count,
        color: MODALITY_COLORS[index % MODALITY_COLORS.length],
    }));

    return (
        <Card sx={{ height: "100%" }}>
            <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {t("organizer.dashboard.charts.eventsByModality")}
                </Typography>
                <Box sx={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                                label={({ name, percent }) =>
                                    `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`
                                }
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
