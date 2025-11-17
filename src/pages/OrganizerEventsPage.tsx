import CreateEventFormModal from "@/features/event/components/CreateEventForm/CreateEventFormModal";
import { EventsTableFilter } from "@/features/event/components/EventsTableFilter";
import { EventCard, EventCardSkeleton } from "@/features/event/components/EventCard";
import { OrganizerSection } from "@/features/organizer/components/OrganizerSection";
import { BaseEntityList } from "@/components/molecules/List";
import { useModalState } from "@/features/user/hooks/useModalState";
import { useEntityTable } from "@/features/user/hooks/useEntityTable";
import { useMyEvents } from "@/features/event/hooks/useMyEvents";
import type { PaginationQuery } from "@/domain/common/PaginationQuery";
import type { EventWithAvailabilityResponseDto } from "@/domain/event/EventWithAvailabilityResponseDto";
import { Add } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function OrganizerEventsPage() {
    const { t } = useTranslation();
    const createModal = useModalState();
    const {
        updateQuery,
        data: events,
        isLoading,
        isFetching,
        refetch,
    } = useEntityTable<PaginationQuery, EventWithAvailabilityResponseDto>(useMyEvents);

    return (
        <>
            <OrganizerSection.Root withPaper={false}>
                <OrganizerSection.Header
                    title="organizer.events.title"
                    description="organizer.events.description"
                    actions={
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={() => createModal.openModal()}
                        >
                            {t("organizer.events.create")}
                        </Button>
                    }
                />
                <OrganizerSection.Body>
                    <EventsTableFilter />
                    <BaseEntityList<EventWithAvailabilityResponseDto>
                        data={events}
                        loading={isLoading || isFetching}
                        onReload={refetch}
                        onQueryChange={updateQuery}
                        skeleton={(idx) => <EventCardSkeleton key={idx} />}
                        skeletonCount={6}
                        renderItem={(item) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <EventCard data={item} />
                            </Grid>
                        )}
                    />
                </OrganizerSection.Body>
            </OrganizerSection.Root>

            <CreateEventFormModal
                open={createModal.isOpen}
                onClose={createModal.closeModal}
                onSuccess={createModal.closeModal}
            />
        </>
    );
}
