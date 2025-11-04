import { Button } from "@mui/material";
import { AdminSection } from "@/features/admin/components/AdminSection";
import { useModalState } from "@/features/user/hooks/useModalState";
import { EventsTable } from "@/features/event/components/EventsTable";
import { useTranslation } from "react-i18next";
import CreateEventFormModal from "@/features/event/components/CreateEventForm/CreateEventFormModal";

export default function AdminEventsPage() {
    const { t } = useTranslation();
    const createModal = useModalState();

    return (
        <>
            <AdminSection.Root>
                <AdminSection.Header
                    title="admin.events.title"
                    description="admin.events.description"
                    actions={
                        <Button variant="contained" onClick={() => createModal.openModal()}>
                            {t("admin.events.create")}
                        </Button>
                    }
                />
                <AdminSection.Body>
                    <EventsTable />
                </AdminSection.Body>
            </AdminSection.Root>

            <CreateEventFormModal
                open={createModal.isOpen}
                onClose={createModal.closeModal}
                onSuccess={createModal.closeModal}
            />
        </>
    );
}
