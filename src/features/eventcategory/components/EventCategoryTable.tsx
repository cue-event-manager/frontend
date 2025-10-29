import { useMemo } from "react";
import { Edit, Delete } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { BaseDataTable } from "@/components/organisms/DataTable";
import { ConfirmDialog } from "@/components/organisms/ConfirmDialog";
import { useModalState } from "@/features/user/hooks/useModalState";
import { useConfirmDialog } from "@/shared/hooks/useConfirmDialog";
import type { TableAction } from "@/shared/types/DataTable";
import type { PaginationQuery } from "@/domain/common/PaginationQuery";
import { useEntityTable } from "@/features/user/hooks/useEntityTable";
import { useEventCategories } from "../hooks/useEventCategories";
import { useDeleteEventCategory } from "../hooks/useDeleteEventCategory";
import type { EventCategory } from "@/domain/eventcategory/EventCategory";
import { EventCategoryFormModal } from "./EventCategoryFormModal";

export function EventCategoryTable() {
    const { t } = useTranslation();

    const { updateQuery, data: eventCategory, isLoading, refetch } =
        useEntityTable<PaginationQuery, EventCategory>(useEventCategories);

    const eventCategoryModal = useModalState<EventCategory>();
    const confirmDialog = useConfirmDialog<number>();
    const deleteEventCategory = useDeleteEventCategory();

    const reloadTable = () => refetch();

    const handleModalSuccess = () => {
        reloadTable();
        eventCategoryModal.closeModal();
    };

    const handleEdit = (eventCategory: EventCategory) => eventCategoryModal.openModal(eventCategory);
    const handleDelete = (id: number) => confirmDialog.openDialog(id);

    const handleConfirmDelete = () => {
        const id = confirmDialog.data;
        if (!id) return;

        deleteEventCategory.mutate(id, {
            onSuccess: () => {
                reloadTable();
                confirmDialog.closeDialog();
            },
        });
    };

    const columns = useMemo(
        () => [
            { key: "name", label: t("admin.eventCategories.fields.name"), sortable: true },
            { key: "description", label: t("admin.eventCategories.fields.description") },
            {
                key: "createdAt",
                label: t("common.fields.createdAt"),
                render: (row: EventCategory) =>
                    new Date(row.createdAt).toLocaleDateString("es-CO"),
            },
        ],
        [t]
    );

    const actions = useMemo<TableAction<EventCategory>[]>(
        () => [
            {
                label: t("common.actions.edit"),
                icon: <Edit fontSize="small" />,
                color: "primary",
                onClick: handleEdit,
            },
            {
                label: t("common.actions.delete"),
                icon: <Delete fontSize="small" />,
                color: "error",
                onClick: (row: EventCategory) => handleDelete(row.id),
            },
        ],
        [t, handleEdit, handleDelete]
    );

    return (
        <>
            <BaseDataTable<EventCategory>
                data={eventCategory}
                loading={isLoading}
                columns={columns}
                actions={actions}
                onQueryChange={updateQuery}
            />

            <EventCategoryFormModal
                open={eventCategoryModal.isOpen}
                initialData={eventCategoryModal.data}
                onClose={eventCategoryModal.closeModal}
                onSuccess={handleModalSuccess}
            />

            <ConfirmDialog
                open={confirmDialog.isOpen}
                title={t("admin.eventCategories.delete.title")}
                message={t("admin.eventCategories.delete.message")}
                confirmText={t("common.actions.delete")}
                onConfirm={handleConfirmDelete}
                onCancel={confirmDialog.closeDialog}
                isLoading={deleteEventCategory.isPending}
                severity="error"
            />
        </>
    );
}
