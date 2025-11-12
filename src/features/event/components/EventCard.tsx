import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Chip,
    Box,
    Stack,
    useTheme,
} from "@mui/material";
import {
    CalendarToday,
    AccessTime,
    VideoCall,
    AttachFile,
    People,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import type { Event } from "@/domain/event/Event";

const CLOUDFRONT_BASE_URL = "https://d1z2jagk4z4o7g.cloudfront.net/";
const DEFAULT_IMAGE = "/common/no-image.png";

interface EventCardProps {
    event: Event;
    actions?: React.ReactNode;
}

export function EventCard({ event, actions }: EventCardProps) {
    const { t } = useTranslation();
    const theme = useTheme();

    const imageUrl = event.imagePath
        ? `${CLOUDFRONT_BASE_URL}${event.imagePath}`
        : DEFAULT_IMAGE;

    const formattedDate = new Date(event.date).toLocaleDateString("es-CO", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    const formattedTime = `${event.startTime?.slice(0, 5)} - ${event.endTime?.slice(0, 5)}`;
    const isVirtual = Boolean(event.virtualMeetingLink);

    return (
        <Card
            elevation={3}
            sx={{
                borderRadius: 3,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.25s ease",
                width: { xs: "100%", sm: 300, md: 320 },
                height: "auto",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                },
            }}
        >
            <Box sx={{ position: "relative", height: 160, overflow: "hidden" }}>
                <Box
                    component="img"
                    src={imageUrl}
                    alt={event.name}
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.4s ease",
                        "&:hover": { transform: "scale(1.05)" },
                    }}
                />

                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))",
                    }}
                />

                <Chip
                    label={event.modality.name}
                    size="small"
                    sx={{
                        position: "absolute",
                        top: 10,
                        left: 10,
                        bgcolor: theme.palette.warning.light,
                        color: theme.palette.common.white,
                        fontWeight: 600,
                        fontSize: "0.7rem",
                    }}
                />

                {isVirtual && (
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: 10,
                            right: 10,
                            bgcolor: "primary.main",
                            borderRadius: "50%",
                            width: 32,
                            height: 32,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <VideoCall sx={{ fontSize: 18, color: "white" }} />
                    </Box>
                )}
            </Box>

            <CardContent
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    p: { xs: 2, sm: 2.5 },
                    gap: 1,
                }}
            >
                <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{
                        fontSize: "1rem",
                        lineHeight: 1.4,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        minHeight: 40,
                    }}
                    title={event.name}
                >
                    {event.name}
                </Typography>

                <Stack
                    direction="row"
                    flexWrap="wrap"
                    gap={0.75}
                    mb={1}
                    alignItems="center"
                >
                    <Chip
                        label={event.category.name}
                        size="small"
                        sx={{
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            bgcolor: theme.palette.primary.main,
                            color: theme.palette.common.white,
                        }}
                    />
                    <Chip
                        label={event.modality.name}
                        size="small"
                        sx={{
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            bgcolor: theme.palette.secondary.light,
                            color: theme.palette.common.black,
                        }}
                    />
                </Stack>

                <Stack spacing={0.75}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <CalendarToday sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2" fontWeight={500} fontSize="0.8rem">
                            {formattedDate}
                        </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <AccessTime sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2" fontWeight={500} fontSize="0.8rem">
                            {formattedTime}
                        </Typography>
                    </Stack>
                </Stack>

                <Box
                    sx={{
                        mt: "auto",
                        pt: 1.5,
                        borderTop: "1px solid",
                        borderColor: "divider",
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        flexWrap="wrap"
                        gap={1}
                    >
                        <Stack direction="row" spacing={1} alignItems="center">
                            {event.capacity > 0 && (
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={0.3}
                                    sx={{
                                        bgcolor: "action.hover",
                                        borderRadius: 1,
                                        px: 0.75,
                                        py: 0.25,
                                    }}
                                >
                                    <People sx={{ fontSize: 14, color: "text.secondary" }} />
                                    <Typography
                                        variant="caption"
                                        fontSize="0.7rem"
                                        fontWeight={600}
                                        color="text.secondary"
                                    >
                                        {event.capacity}
                                    </Typography>
                                </Stack>
                            )}

                            {event.attachments?.length > 0 && (
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={0.3}
                                    sx={{
                                        bgcolor: "action.hover",
                                        borderRadius: 1,
                                        px: 0.75,
                                        py: 0.25,
                                    }}
                                >
                                    <AttachFile sx={{ fontSize: 14, color: "text.secondary" }} />
                                    <Typography
                                        variant="caption"
                                        fontSize="0.7rem"
                                        fontWeight={600}
                                        color="text.secondary"
                                    >
                                        {event.attachments.length}
                                    </Typography>
                                </Stack>
                            )}
                        </Stack>
                    </Stack>
                </Box>
            </CardContent>

            {actions && (
                <CardActions
                    sx={{
                        px: 2,
                        pb: 2,
                        pt: 0,
                        justifyContent: "flex-end",
                        gap: 0.5,
                        flexWrap: "wrap",
                    }}
                >
                    {actions}
                </CardActions>
            )}
        </Card>
    );
}
