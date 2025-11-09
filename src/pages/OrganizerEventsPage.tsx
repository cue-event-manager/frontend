import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { OrganizerSection } from "@/features/organizer/components/OrganizerSection";
import { useModalState } from "@/features/user/hooks/useModalState";
import { OrganizerEventsTable } from "@/features/event/components/OrganizerEventsTable";
import CreateEventFormModal from "@/features/event/components/CreateEventForm/CreateEventFormModal";

export default function OrganizerEventsPage() {
    const { t } = useTranslation();
    const createModal = useModalState();

    return (
        <>
            <OrganizerSection.Root>
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
                    <OrganizerEventsTable />
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
