import { Box, Divider, Stack, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useTranslation } from "react-i18next";
import type { Event } from "@/domain/event/Event";
import { EventRecurrenceMode } from "@/domain/event/enums/EventRecurrenceMode";
import { SectionCard } from "./SectionCard";

interface EventDetailQuickInfoProps {
    event: Event;
    dateFormatter: Intl.DateTimeFormat;
    timeFormatter: Intl.DateTimeFormat;
}

export function EventDetailQuickInfo({ event, dateFormatter, timeFormatter }: EventDetailQuickInfoProps) {
    const { t } = useTranslation();
    const scheduleLabel = buildScheduleLabel(event, dateFormatter);
    const timeStartSource =
        event.recurrenceMode === EventRecurrenceMode.RECURRING ? event.startDate ?? event.date : event.date ?? event.startDate;
    const startDate = parseISODate(timeStartSource, event.startTime);
    const endDate = parseISODate(timeStartSource, event.endTime);
    const recurrenceLabel =
        event.recurrenceMode === EventRecurrenceMode.RECURRING ? buildRecurrenceLabel(event, dateFormatter) : null;
    const timeRange =
        startDate && endDate ? `${timeFormatter.format(startDate)} - ${timeFormatter.format(endDate)}` : t("events.detail.notAvailable");
    const scheduleValue = scheduleLabel ?? t("events.detail.notAvailable");
    const locationValue = event.virtualMeetingLink ? t("events.detail.virtual") : t("events.detail.physical");

    const infoItems = [
        {
            icon: <CalendarMonthIcon color="primary" />,
            label: t("events.detail.schedule"),
            value: scheduleValue,
        },
        {
            icon: <AccessTimeIcon color="primary" />,
            label: t("events.detail.time"),
            value: timeRange,
        },
        {
            icon: <EventRepeatIcon color="primary" />,
            label: t("events.detail.recurrence"),
            value: recurrenceLabel ?? t("events.detail.singleEvent"),
        },
        {
            icon: <LocationOnIcon color="primary" />,
            label: t("events.detail.location"),
            value: locationValue,
        },
    ];

    return (
        <SectionCard>
            <Stack spacing={2.5}>
                {infoItems.map((item, idx) => (
                    <Stack key={`${item.label}-${idx}`} spacing={1.2}>
                        <Stack direction="row" spacing={2} alignItems="center">
                            {item.icon}
                            <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: 0.5 }}>
                                    {item.label}
                                </Typography>
                                <Typography variant="body1" fontWeight={600}>
                                    {item.value}
                                </Typography>
                            </Box>
                        </Stack>
                        {idx < infoItems.length - 1 && <Divider flexItem sx={{ borderStyle: "dashed", opacity: 0.5 }} />}
                    </Stack>
                ))}
            </Stack>
        </SectionCard>
    );
}

function buildScheduleLabel(event: Event, dateFormatter: Intl.DateTimeFormat) {
    if (event.recurrenceMode === EventRecurrenceMode.RECURRING && event.startDate && event.endDate) {
        return `${dateFormatter.format(new Date(event.startDate))} - ${dateFormatter.format(new Date(event.endDate))}`;
    }

    if (event.date) {
        return dateFormatter.format(new Date(event.date));
    }

    return null;
}

function buildRecurrenceLabel(event: Event, dateFormatter: Intl.DateTimeFormat) {
    if (event.recurrenceMode !== EventRecurrenceMode.RECURRING || !event.startDate || !event.endDate) return null;
    return `${dateFormatter.format(new Date(event.startDate))} → ${dateFormatter.format(new Date(event.endDate))}`;
}

function parseISODate(dateValue?: string | null, timeValue?: string) {
    if (!dateValue) return null;
    const [datePart] = dateValue.split("T");
    const [year, month, day] = (datePart ?? "").split("-").map(Number);
    if ([year, month, day].some((value) => Number.isNaN(value))) {
        return null;
    }
    const [hours = 0, minutes = 0] = (timeValue ?? "0:0").split(":").map(Number);
    const safeHours = Number.isNaN(hours) ? 0 : hours;
    const safeMinutes = Number.isNaN(minutes) ? 0 : minutes;
    return new Date(year, (month ?? 1) - 1, day, safeHours, safeMinutes);
}
