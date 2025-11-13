import { Box, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { PaginationQuery } from "@/domain/common/PaginationQuery";
import type { Event } from "@/domain/event/Event";
import { useEvents } from "../hooks/useEvents";
import { useEntityTable } from "@/features/user/hooks/useEntityTable";
import { BaseEntityList } from "@/components/molecules/List";
import { EventCard } from "./EventCard";
import { useEventActions } from "../hooks/useEventActions";

export function EventList() {
    const {
        updateQuery,
        data: events,
        isLoading,
        refetch,
    } = useEntityTable<PaginationQuery, Event>(useEvents);

    const actions = useEventActions();


    return (
        <BaseEntityList<Event>
            data={events}
            loading={isLoading}
            onReload={refetch}
            onQueryChange={updateQuery}
            renderItem={(event) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <EventCard event={event} actions={actions?.getActions(event)} />
                </Grid>
            )}
        />
    );
}
