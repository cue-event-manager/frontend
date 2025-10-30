import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Typography,
    Grid,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BarChartIcon from "@mui/icons-material/BarChart";
import { useNavigate } from "react-router-dom";

const quickActions = [
    {
        title: "Crear nuevo evento",
        description: "Inicia la planeación de un nuevo evento",
        icon: <EventIcon fontSize="large" color="primary" />,
        path: "/organizer/events/create",
    },
    {
        title: "Ver mis eventos",
        description: "Consulta y edita tus eventos activos",
        icon: <CalendarMonthIcon fontSize="large" color="primary" />,
        path: "/organizer/events",
    },
    {
        title: "Ver estadísticas",
        description: "Analiza la participación y desempeño de tus eventos",
        icon: <BarChartIcon fontSize="large" color="primary" />,
        path: "/organizer/reports",
    },
];

export default function OrganizerQuickActions() {
    const navigate = useNavigate();

    return (
        <Box>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                Accesos rápidos
            </Typography>

            <Grid container spacing={3}>
                {quickActions.map((action) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={action.title}>
                        <Card
                            elevation={2}
                            sx={{
                                borderRadius: 3,
                                transition: "transform 0.2s, box-shadow 0.2s",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: 6,
                                },
                            }}
                        >
                            <CardActionArea onClick={() => navigate(action.path)}>
                                <CardContent
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        gap: 1.5,
                                        p: 3,
                                    }}
                                >
                                    {action.icon}
                                    <Typography variant="subtitle1" fontWeight={700}>
                                        {action.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ color: "text.secondary", lineHeight: 1.4 }}
                                    >
                                        {action.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
