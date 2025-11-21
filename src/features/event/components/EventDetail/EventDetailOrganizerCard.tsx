import { Avatar, Chip, IconButton, Stack, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
import { useTranslation } from "react-i18next";
import type { Event } from "@/domain/event/Event";
import { SectionCard } from "./SectionCard";

export function EventDetailOrganizerCard({ event }: { event: Event }) {
    const { t } = useTranslation();

    return (
        <SectionCard>
            <Stack spacing={2}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar sx={{ bgcolor: "primary.soft", width: 52, height: 52 }}>
                        <BusinessIcon color="primary" />
                    </Avatar>
                    <Stack spacing={0.5}>
                        <Typography variant="subtitle2" color="text.secondary">
                            {t("events.detail.organizer")}
                        </Typography>
                        <Typography variant="h6" fontWeight={800}>
                            {event.organizer.name}
                        </Typography>
                    </Stack>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                    <IconButton
                        size="small"
                        color="primary"
                        disabled={!event.organizer.email}
                        component="a"
                        href={event.organizer.email ? `mailto:${event.organizer.email}` : undefined}
                    >
                        <EmailIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        color="primary"
                        disabled={!event.organizer.phone}
                        component="a"
                        href={event.organizer.phone ? `tel:${event.organizer.phone}` : undefined}
                    >
                        <PhoneIcon fontSize="small" />
                    </IconButton>
                </Stack>

                <Stack spacing={0.25}>
                    <Typography variant="body2" color="text.secondary">
                        {event.organizer.email || t("events.detail.noEmail")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {event.organizer.phone || t("events.detail.noPhone")}
                    </Typography>
                </Stack>
            </Stack>
        </SectionCard>
    );
}
