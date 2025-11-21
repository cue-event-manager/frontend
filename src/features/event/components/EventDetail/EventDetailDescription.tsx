import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { Event } from "@/domain/event/Event";
import { SectionCard } from "./SectionCard";

export function EventDetailDescription({ event }: { event: Event }) {
    const { t } = useTranslation();

    return (
        <SectionCard>
            <Stack spacing={1.5}>
                <Typography variant="subtitle2" color="text.secondary">
                    {t("events.detail.description")}
                </Typography>
                <Typography variant="h5" fontWeight={700}>
                    {event.name}
                </Typography>
                <Typography color="text.secondary">
                    {event.description || t("events.detail.noDescription")}
                </Typography>
            </Stack>
        </SectionCard>
    );
}
