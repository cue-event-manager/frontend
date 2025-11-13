import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Box,
    Stack,
    useTheme,
} from "@mui/material";
import { CalendarToday, VideoCall, AttachFile, People } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import type { Event } from "@/domain/event/Event";
import { formatEventDate } from "@/features/event/utils/date";

const CLOUDFRONT_BASE_URL = "https://d1z2jagk4z4o7g.cloudfront.net/";
const DEFAULT_IMAGE = "/common/no-image.png";

interface EventCardProps {
    event: Event;
    actions?: ReactNode;
}

export function EventCard({ event, actions }: EventCardProps) {
    const theme = useTheme();
    const { t } = useTranslation();

    const imageUrl = event.imagePath
        ? `${CLOUDFRONT_BASE_URL}${event.imagePath}`
        : DEFAULT_IMAGE;

    const formattedDate = formatEventDate(event.date, event.startTime);

    const isVirtual = Boolean(event.virtualMeetingLink);

    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: 4,
                overflow: "hidden",
                border: "1px solid",
                borderColor: "divider",
                transition: "0.25s ease",
                "&:hover": {
                    boxShadow: "0 4px 22px rgba(0,0,0,0.08)",
                    transform: "translateY(-3px)",
                },
                bgcolor: "white",
                width: 330,
            }}
        >
            <Box sx={{ position: "relative", height: 160 }}>
                <Box
                    component="img"
                    src={imageUrl}
                    alt={event.name}
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        userSelect:"none"
                    }}
                />

                <Box
                    sx={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        px: 1.2,
                        py: 0.5,
                        bgcolor: "rgba(0, 190, 160, 1)",
                        color: "white",
                        fontWeight: 700,
                        fontSize: "0.7rem",
                        borderRadius: 2,
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                    }}
                >
                    {event.modality.name}
                </Box>

                {isVirtual && (
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: 12,
                            right: 12,
                            width: 34,
                            height: 34,
                            borderRadius: "50%",
                            bgcolor: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: 1,
                        }}
                    >
                        <VideoCall sx={{ fontSize: 20, color: "primary.main" }} />
                    </Box>
                )}
            </Box>

            <CardContent sx={{ p: 2.4, pb: 1.6 }}>
                <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{
                        fontSize: "1.1rem",         
                        lineHeight: 1.35,
                        mb: 0.4,
                        overflow: "hidden",
                    }}
                >
                    {event.name}
                </Typography>

                <Typography
                    sx={{
                        fontSize: "0.95rem",
                        color: theme.palette.primary.main,
                        mb: 0.6,
                    }}
                >
                    {formattedDate}
                </Typography>

                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 1.4 }}
                >
                    <CalendarToday sx={{ fontSize: 15, color: "text.secondary" }} />
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            fontSize: "0.82rem",
                            fontWeight: 500,
                        }}
                    >
                        {event.category?.name}
                    </Typography>
                </Stack>

                <Stack direction="row" spacing={2} alignItems="center">
                    {event.capacity > 0 && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
                            <People sx={{ fontSize: 16, color: "text.secondary" }} />
                            <Typography
                                sx={{
                                    fontSize: "0.8rem",
                                    color: "text.secondary",
                                    fontWeight: 500,
                                }}
                            >
                                {`${t("events.labels.capacity")}: ${event.capacity}`}
                            </Typography>
                        </Box>
                    )}

                    {event.attachments?.length > 0 && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
                            <AttachFile sx={{ fontSize: 16, color: "text.secondary" }} />
                            <Typography
                                sx={{
                                    fontSize: "0.8rem",
                                    color: "text.secondary",
                                    fontWeight: 500,
                                }}
                            >
                                {`${t("events.fields.attachments")}: ${event.attachments.length}`}
                            </Typography>
                        </Box>
                    )}
                </Stack>
            </CardContent>

            {actions && (
                <CardActions
                    sx={{
                        px: 2.2,
                        pb: 2,
                        pt: 0.5,
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 1,
                    }}
                >
                    {actions}
                </CardActions>
            )}
        </Card>
    );
}
