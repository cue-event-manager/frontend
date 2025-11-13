import CreateEventFormModal from "@/features/event/components/CreateEventForm/CreateEventFormModal";
import { EventList } from "@/features/event/components/EventsList";
import { EventsTableFilter } from "@/features/event/components/EventsTableFilter";
import { OrganizerSection } from "@/features/organizer/components/OrganizerSection";
import { useModalState } from "@/features/user/hooks/useModalState";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function OrganizerEventsPage() {
    const { t } = useTranslation();
    const createModal = useModalState();

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
                    <EventList />
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