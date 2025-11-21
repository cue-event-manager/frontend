import { Stack, Typography, Link as MuiLink } from "@mui/material";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { useTranslation } from "react-i18next";
import type { Event } from "@/domain/event/Event";
import { SectionCard } from "./SectionCard";

export function EventDetailVirtualInfo({ event }: { event: Event }) {
    const { t } = useTranslation();

    return (
        <SectionCard>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {t("events.detail.virtualInfo")}
            </Typography>
            {event.virtualMeetingLink ? (
                <Stack direction="row" spacing={1.5} alignItems="center">
                    <VideoCallIcon color="primary" />
                    <MuiLink href={event.virtualMeetingLink} target="_blank" rel="noopener" underline="hover">
                        {event.virtualMeetingLink}
                    </MuiLink>
                </Stack>
            ) : (
                <Typography color="text.secondary">
                    {t("events.detail.noVirtualInfo")}
                </Typography>
            )}
        </SectionCard>
    );
}
