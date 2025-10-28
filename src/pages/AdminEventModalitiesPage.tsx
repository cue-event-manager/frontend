import { Button } from "@mui/material";
import { AdminSection } from "@/features/admin/components/AdminSection";
import { useModalState } from "@/features/user/hooks/useModalState";
import { EventModalitiesTable } from "@/features/eventmodality/components/EventModalitiesTable";
import { EventModalitiesTableFilter } from "@/features/eventmodality/components/EventModalitiesTableFilter";
import { EventModalityFormModal } from "@/features/eventmodality/components/EventModalityFormModal";
import { useTranslation } from "react-i18next";

export default function AdminEventModalitiesPage() {
    const { t } = useTranslation();
    const createModal = useModalState();

    return (
        <>
            <AdminSection.Root>
                <AdminSection.Header
                    title="admin.eventModalities.title"
                    description="admin.eventModalities.description"
                    actions={
                        <Button variant="contained" onClick={() => createModal.openModal()}>
                            {t("admin.eventModalities.create")}
                        </Button>
                    }
                />
                <AdminSection.Body>
                    <EventModalitiesTableFilter />
                    <EventModalitiesTable />
                </AdminSection.Body>
            </AdminSection.Root>

            <EventModalityFormModal
                open={createModal.isOpen}
                onClose={createModal.closeModal}
                onSuccess={createModal.closeModal}
            />
        </>
    );
}
