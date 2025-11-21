import { Divider, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useTranslation } from "react-i18next";
import type { EventAgendaItem } from "@/domain/event/EventAgendaItem";
import { SectionCard } from "./SectionCard";
import { Fragment } from "react";

export function EventDetailAgenda({ agenda }: { agenda: EventAgendaItem[] }) {
    if (!agenda || agenda.length === 0) return null;
    const { t } = useTranslation();

    return (
        <SectionCard>
            <Stack spacing={2}>
                <Typography variant="h6" fontWeight={700}>
                    {t("events.detail.agenda")}
                </Typography>
                <List disablePadding>
                    {agenda.map((item, idx) => (
                        <Fragment key={`${item.title}-${idx}`}>
                            <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                                <ListItemIcon sx={{ minWidth: 36 }}>
                                    <AccessTimeIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography fontWeight={600}>
                                            {item.startTime} - {item.endTime} · {item.title}
                                        </Typography>
                                    }
                                    secondary={<Typography color="text.secondary">{item.description}</Typography>}
                                />
                            </ListItem>
                            {idx < agenda.length - 1 && <Divider component="li" />}
                        </Fragment>
                    ))}
                </List>
            </Stack>
        </SectionCard>
    );
}
