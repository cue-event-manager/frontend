import { useMemo } from "react";
import { Edit, Delete } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { BaseDataTable } from "@/components/organisms/DataTable";
import { ConfirmDialog } from "@/components/organisms/ConfirmDialog";
import { EventModalityFormModal } from "./EventModalityFormModal";
import { useModalState } from "@/features/user/hooks/useModalState";
import { useConfirmDialog } from "@/shared/hooks/useConfirmDialog";
import { useDeleteEventModality } from "../hooks/useDeleteEventModality";
import { useEventModalities } from "../hooks/useEventModalities";
import type { TableAction } from "@/shared/types/DataTable";
import type { EventModality } from "@/domain/eventmodality/EventModality";
import type { PaginationQuery } from "@/domain/common/PaginationQuery";
import { useEntityTable } from "@/features/user/hooks/useEntityTable";
import { Chip } from "@mui/material";

export function EventModalitiesTable() {
    const { t } = useTranslation();

    const { updateQuery, data: eventModalities, isLoading, refetch } =
        useEntityTable<PaginationQuery, EventModality>(useEventModalities);

    const eventModalityModal = useModalState<EventModality>();
    const confirmDialog = useConfirmDialog<number>();
    const deleteEventModality = useDeleteEventModality();

    const reloadTable = () => refetch();

    const handleModalSuccess = () => {
        reloadTable();
        eventModalityModal.closeModal();
    };

    const handleEdit = (eventModality: EventModality) => eventModalityModal.openModal(eventModality);
    const handleDelete = (id: number) => confirmDialog.openDialog(id);

    const handleConfirmDelete = () => {
        const id = confirmDialog.data;
        if (!id) return;

        deleteEventModality.mutate(id, {
            onSuccess: () => {
                reloadTable();
                confirmDialog.closeDialog();
            },
        });
    };

    const columns = useMemo(
        () => [
            { key: "name", label: t("admin.eventModalities.fields.name"), sortable: true },
            { key: "description", label: t("admin.eventModalities.fields.description") },
            {
                key: "requiresSpace",
                label: t("admin.eventModalities.fields.requiresSpace"),
                render: (row: EventModality) => (
                    <Chip
                        label={row.requiresSpace ? t("common.yes") : t("common.no")}
                        color={row.requiresSpace ? "success" : "default"}
                        size="small"
                    />
                ),
            },
            {
                key: "createdAt",
                label: t("common.fields.createdAt"),
                render: (row: EventModality) =>
                    new Date(row.createdAt).toLocaleDateString("es-CO"),
            },
        ],
        [t]
    );

    const actions = useMemo<TableAction<EventModality>[]>(
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
                onClick: (row: EventModality) => handleDelete(row.id),
            },
        ],
        [t, handleEdit, handleDelete]
    );

    return (
        <>
            <BaseDataTable<EventModality>
                data={eventModalities}
                loading={isLoading}
                columns={columns}
                actions={actions}
                onQueryChange={updateQuery}
            />

            <EventModalityFormModal
                open={eventModalityModal.isOpen}
                initialData={eventModalityModal.data}
                onClose={eventModalityModal.closeModal}
                onSuccess={handleModalSuccess}
            />

            <ConfirmDialog
                open={confirmDialog.isOpen}
                title={t("admin.eventModalities.delete.title")}
                message={t("admin.eventModalities.delete.message")}
                confirmText={t("common.actions.delete")}
                onConfirm={handleConfirmDelete}
                onCancel={confirmDialog.closeDialog}
                isLoading={deleteEventModality.isPending}
                severity="error"
            />
        </>
    );
}
