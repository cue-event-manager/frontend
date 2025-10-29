import { Button } from "@mui/material";
import { AdminSection } from "@/features/admin/components/AdminSection";
import { useModalState } from "@/features/user/hooks/useModalState";
import { EventCategoriesTableFilter } from "@/features/eventcategory/components/EventCategoryFilter";
import { EventCategoryTable } from "@/features/eventcategory/components/EventCategoryTable";
import { EventCategoryFormModal } from "@/features/eventcategory/components/EventCategoryFormModal";
import { useTranslation } from "react-i18next";

export default function AdminEventCategoriesPage() {
    const { t } = useTranslation();
    const createModal = useModalState();

    return (
        <>
            <AdminSection.Root>
                <AdminSection.Header
                    title="admin.eventCategories.title"
                    description="admin.eventCategories.description"
                    actions={
                        <Button variant="contained" onClick={() => createModal.openModal()}>
                            {t("admin.eventCategories.create")}
                        </Button>
                    }
                />
                <AdminSection.Body>
                    <EventCategoriesTableFilter />
                    <EventCategoryTable />
                </AdminSection.Body>
            </AdminSection.Root>

            <EventCategoryFormModal
                open={createModal.isOpen}
                onClose={createModal.closeModal}
                onSuccess={createModal.closeModal}
            />
        </>
    );
}
