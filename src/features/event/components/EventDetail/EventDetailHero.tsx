import { Box, Chip, Stack, Typography, Paper, Link as MuiLink } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import PeopleIcon from "@mui/icons-material/People";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { useTranslation } from "react-i18next";
import type { Event } from "@/domain/event/Event";
import type { EventWithAvailabilityResponseDto } from "@/domain/event/EventWithAvailabilityResponseDto";

interface EventDetailHeroProps {
    event: Event;
    availability: EventWithAvailabilityResponseDto["availability"];
    imageUrl: string;
}

export function EventDetailHero({ event, availability, imageUrl }: EventDetailHeroProps) {
    const { t } = useTranslation();
    const theme = useTheme();

    const totalCapacity = availability.totalCapacity ?? event.capacity ?? 0;
    const availableSpots = availability.availableSpots ?? 0;
    const overlayGradient =
        theme.palette.mode === "dark"
            ? `linear-gradient(180deg, rgba(0,0,0,0.75) 0%, ${alpha(theme.palette.background.default, 0.9)} 90%)`
            : `linear-gradient(180deg, rgba(0,0,0,0.35) 0%, ${alpha(theme.palette.common.black, 0.9)} 90%)`;

    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: { xs: 3, md: 4 },
                overflow: "hidden",
                position: "relative",
            }}
        >
            <Box
                component="img"
                src={imageUrl}
                alt={event.name}
                sx={{
                    width: "100%",
                    height: { xs: 220, md: 360 },
                    objectFit: "cover",
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    background: overlayGradient,
                    color: theme.palette.common.white,
                    display: "flex",
                    alignItems: "flex-end",
                }}
            >
                <Box sx={{ p: { xs: 3, md: 4 }, width: "100%" }}>
                    <Stack spacing={{ xs: 1.5, md: 2.5 }}>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                            <Chip
                                label={event.category.name}
                                color="primary"
                                size="small"
                            />
                            <Chip label={event.modality.name} size="small" color="secondary" variant="filled" />
                        </Stack>
                        <Typography
                            variant="h4"
                            fontWeight={800}
                            sx={{ color: theme.palette.common.white, fontSize: { xs: "1.8rem", md: "2.4rem" } }}
                        >
                            {event.name}
                        </Typography>
                        <Typography  sx={{ color: theme.palette.common.white}}>
                            {event.description || t("events.detail.noDescription")}
                        </Typography>
                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ xs: "flex-start", sm: "center" }}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <PeopleIcon />
                                <Typography  sx={{ color: theme.palette.common.white}}>
                                    {t("events.detail.heroAvailability", {
                                        available: availableSpots,
                                        capacity: totalCapacity,
                                    })}
                                </Typography>
                            </Stack>
                            {event.virtualMeetingLink && (
                                <Stack direction="row" spacing={1.5} alignItems="center">
                                    <VideoCallIcon />
                                    <MuiLink
                                        href={event.virtualMeetingLink}
                                        target="_blank"
                                        rel="noopener"
                                        underline="hover"
                                        color="inherit"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        {event.virtualMeetingLink}
                                    </MuiLink>
                                </Stack>
                            )}
                        </Stack>
                    </Stack>
                </Box>
            </Box>
        </Paper>
    );
}
