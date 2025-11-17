import { useEffect } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { BaseEntityList } from "@/components/molecules/List";
import { EventCard, EventCardSkeleton } from "@/features/event/components/EventCard";
import { useEntityTable } from "@/features/user/hooks/useEntityTable";
import { useEvents } from "@/features/event/hooks/useEvents";
import type { EventWithAvailabilityResponseDto } from "@/domain/event/EventWithAvailabilityResponseDto";
import type { EventPaginationRequestDto } from "@/domain/event/EventPaginationRequestDto";
import { EventFiltersSidebar } from "@/features/event/components/EventFiltersSidebar";

export default function EventsPage() {
    const { t } = useTranslation();

    const {
        query,
        updateQuery,
        resetQuery,
        data: events,
        isLoading,
        isFetching,
        refetch,
    } = useEntityTable<EventPaginationRequestDto, EventWithAvailabilityResponseDto>(useEvents);

    useEffect(() => {
        refetch();
    }, [query, refetch]);

    return (
        <Box
            component="section"
            sx={(theme) => ({
                py: { xs: 6, md: 8 },
                background: `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
            })}
        >
            <Container maxWidth="xl">
                <Stack spacing={{ xs: 4, md: 5 }} alignItems="center">
                    <Box
                        sx={{
                            textAlign: "center",

                        }}
                    >
                        <Typography variant="h3" fontWeight={800} gutterBottom>
                            {t("publicEvents.title")}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {t("publicEvents.subtitle")}
                        </Typography>
                    </Box>

                    <Box width="100%">
                        <Stack
                            direction={{ xs: "column", md: "row" }}
                            spacing={{ xs: 4, md: 6 }}
                            alignItems={{ xs: "stretch", md: "flex-start" }}
                        >
                            <Box width={{ xs: "100%", md: 320 }} flexShrink={0}>
                                <EventFiltersSidebar
                                    query={query}
                                    onUpdateQuery={updateQuery}
                                    onResetQuery={resetQuery}
                                />
                            </Box>

                            <Box flexGrow={1} width="100%">
                                <BaseEntityList<EventWithAvailabilityResponseDto>
                                    data={events}
                                    loading={isLoading || isFetching}
                                    onReload={refetch}
                                    onQueryChange={updateQuery}
                                    skeleton={(idx) => <EventCardSkeleton key={idx} />}
                                    skeletonCount={6} renderItem={(item) => (
                                        <Box display="flex" justifyContent="center">
                                            <EventCard data={item} />
                                        </Box>
                                    )}
                                />
                            </Box>
                        </Stack>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
}
