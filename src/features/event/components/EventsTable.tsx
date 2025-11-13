import { useMemo } from "react";
import { Edit, Delete } from "@mui/icons-material";
import { Chip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { BaseDataTable } from "@/components/organisms/DataTable";
import { ConfirmDialog } from "@/components/organisms/ConfirmDialog";
import { useModalState } from "@/features/user/hooks/useModalState";
import { useConfirmDialog } from "@/shared/hooks/useConfirmDialog";
import type { TableAction } from "@/shared/types/DataTable";
import type { PaginationQuery } from "@/domain/common/PaginationQuery";
import { useEntityTable } from "@/features/user/hooks/useEntityTable";
import { useEvents } from "../hooks/useEvents";
import { useDeleteEvent } from "../hooks/useDeleteEvent";
import type { Event } from "@/domain/event/Event";
import UpdateEventFormModal from "./UpdateEventForm/UpdateEventFormModal";

export function EventsTable() {
    const { t } = useTranslation();

    const { updateQuery, data: events, isLoading, refetch } =
        useEntityTable<PaginationQuery, Event>(useEvents);

    const eventModal = useModalState<Event>();
    const confirmDialog = useConfirmDialog<number>();
    const deleteEvent = useDeleteEvent();

    const reloadTable = () => refetch();

    const handleModalSuccess = () => {
        reloadTable();
        eventModal.closeModal();
    };

    const handleEdit = (event: Event) => eventModal.openModal(event);
    const handleDelete = (id: number) => confirmDialog.openDialog(id);

    const handleConfirmDelete = () => {
        const id = confirmDialog.data;
        if (!id) return;

        deleteEvent.mutate(id, {
            onSuccess: () => {
                reloadTable();
                confirmDialog.closeDialog();
            },
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "PUBLISHED":
                return "success";
            case "IN_PROGRESS":
                return "info";
            case "FINISHED":
                return "default";
            case "CANCELLED":
                return "error";
            default:
                return "default";
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case "PUBLISHED":
                return t("admin.events.status.published");
            case "IN_PROGRESS":
                return t("admin.events.status.inProgress");
            case "FINISHED":
                return t("admin.events.status.finished");
            case "CANCELLED":
                return t("admin.events.status.cancelled");
            default:
                return status;
        }
    };

    const columns = useMemo(
        () => [
            { key: "name", label: t("admin.events.fields.name"), sortable: true },
            {
                key: "categoryName",
                label: t("admin.events.fields.category"),
                render: (row: Event) => row.category.name || "-"
            },
            {
                key: "modalityName",
                label: t("admin.events.fields.modality"),
                render: (row: Event) => row.modality.name || "-"
            },
            {
                key: "date",
                label: t("admin.events.fields.date"),
                render: (row: Event) =>
                    row.date ? new Date(row.date).toLocaleDateString("es-CO") : "-",
            },
            {
                key: "startTime",
                label: t("admin.events.fields.time"),
                render: (row: Event) =>
                    row.startTime && row.endTime
                        ? `${row.startTime} - ${row.endTime}`
                        : "-",
            },
            {
                key: "status",
                label: t("admin.events.fields.status"),
                render: (row: Event) => (
                    <Chip
                        label={getStatusLabel(row.status)}
                        color={getStatusColor(row.status) as any}
                        size="small"
                    />
                ),
            },
            {
                key: "createdAt",
                label: t("common.fields.createdAt"),
                render: (row: Event) =>
                    new Date(row.createdAt).toLocaleDateString("es-CO"),
            },
        ],
        [t]
    );

    const actions = useMemo<TableAction<Event>[]>(
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
                onClick: (row: Event) => handleDelete(row.id),
            },
        ],
        [t, handleEdit, handleDelete]
    );

    return (
        <>
            <BaseDataTable
                data={events}
                loading={isLoading}
                columns={columns}
                actions={actions}
                onQueryChange={updateQuery}
            />

            <UpdateEventFormModal
                open={eventModal.isOpen}
                event={eventModal.data ?? null}
                onClose={eventModal.closeModal}
                onSuccess={handleModalSuccess}
            />

            <ConfirmDialog
                open={confirmDialog.isOpen}
                title={t("admin.events.delete.title")}
                message={t("admin.events.delete.message")}
                onConfirm={handleConfirmDelete}
                onCancel={confirmDialog.closeDialog}
                isLoading={deleteEvent.isPending}
            />
        </>
    );
}
