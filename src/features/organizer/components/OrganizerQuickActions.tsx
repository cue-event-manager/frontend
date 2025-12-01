import { useState } from "react";
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
import CreateEventFormModal from "@/features/event/components/CreateEventForm/CreateEventFormModal";

const quickActions = [
    {
        title: "Crear nuevo evento",
        description: "Inicia la planeación de un nuevo evento",
        icon: <EventIcon fontSize="large" color="primary" />,
        action: "createEvent",
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
    const [openEventModal, setOpenEventModal] = useState(false);

    const handleActionClick = (action: (typeof quickActions)[0]) => {
        if (action.action === "createEvent") {
            setOpenEventModal(true);
        } else if (action.path) {
            navigate(action.path);
        }
    };

    const handleCloseModal = () => setOpenEventModal(false);

    return (
        <Box>
            <Typography
                variant="h6"
                fontWeight={700}
                sx={{
                    mb: { xs: 2, md: 3 },
                    fontSize: { xs: '1.1rem', sm: '1.25rem' }
                }}
            >
                Accesos rápidos
            </Typography>

            <Grid container spacing={{ xs: 2, sm: 3 }}>
                {quickActions.map((action) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={action.title}>
                        <Card
                            elevation={2}
                            sx={{
                                borderRadius: 3,
                                height: '100%',
                                transition: "transform 0.2s, box-shadow 0.2s",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: 6,
                                },
                            }}
                        >
                            <CardActionArea
                                onClick={() => handleActionClick(action)}
                                sx={{ height: '100%' }}
                            >
                                <CardContent
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        gap: { xs: 1, sm: 1.5 },
                                        p: { xs: 2, sm: 2.5, md: 3 },
                                        height: '100%',
                                    }}
                                >
                                    <Box sx={{
                                        '& svg': {
                                            fontSize: { xs: '2rem', sm: '2.5rem' }
                                        }
                                    }}>
                                        {action.icon}
                                    </Box>
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight={700}
                                        sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
                                    >
                                        {action.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: "text.secondary",
                                            lineHeight: 1.4,
                                            fontSize: { xs: '0.875rem', sm: '0.875rem' }
                                        }}
                                    >
                                        {action.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <CreateEventFormModal open={openEventModal} onClose={handleCloseModal} />
        </Box>
    );
}
