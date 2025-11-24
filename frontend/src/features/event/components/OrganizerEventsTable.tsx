import { useMemo } from "react";
import { Edit, Delete, ContentCopy, Visibility, Cancel } from "@mui/icons-material";
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
import { useCancelEvent } from "../hooks/useCancelEvent";
import type { Event } from "@/domain/event/Event";
import UpdateEventFormModal from "./UpdateEventForm/UpdateEventFormModal";

export function OrganizerEventsTable() {
    const { t } = useTranslation();

    const { updateQuery, data: events, isLoading, refetch } =
        useEntityTable<PaginationQuery, Event>(useEvents);

    const eventModal = useModalState<Event>();
    const confirmDialog = useConfirmDialog<number>();
    const confirmCancelDialog = useConfirmDialog<number>();
    const deleteEvent = useDeleteEvent();
    const cancelEvent = useCancelEvent();

    const reloadTable = () => refetch();

    const handleModalSuccess = () => {
        reloadTable();
        eventModal.closeModal();
    };

    const handleEdit = (event: Event) => eventModal.openModal(event);
    const handleDelete = (id: number) => confirmDialog.openDialog(id);
    const handleCancel = (id: number) => confirmCancelDialog.openDialog(id);

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

    const handleConfirmCancel = () => {
        const id = confirmCancelDialog.data;
        if (!id) return;

        cancelEvent.mutate(id, {
            onSuccess: () => {
                reloadTable();
                confirmCancelDialog.closeDialog();
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
                return t("organizer.events.status.published");
            case "IN_PROGRESS":
                return t("organizer.events.status.inProgress");
            case "FINISHED":
                return t("organizer.events.status.finished");
            case "CANCELLED":
                return t("organizer.events.status.cancelled");
            default:
                return status;
        }
    };

    const getRecurrenceModeLabel = (mode: string) => {
        switch (mode) {
            case "SINGLE":
                return t("organizer.events.recurrence.single");
            case "RECURRING":
                return t("organizer.events.recurrence.recurring");
            default:
                return mode;
        }
    };

    const columns = useMemo(
        () => [
            { key: "name", label: t("organizer.events.fields.name"), sortable: true },
            {
                key: "categoryName",
                label: t("organizer.events.fields.category"),
                render: (row: Event) => row.categoryName || "-"
            },
            {
                key: "modalityName",
                label: t("organizer.events.fields.modality"),
                render: (row: Event) => row.modalityName || "-"
            },
            {
                key: "date",
                label: t("organizer.events.fields.date"),
                render: (row: Event) =>
                    row.date ? new Date(row.date).toLocaleDateString("es-CO") : "-",
            },
            {
                key: "startTime",
                label: t("organizer.events.fields.time"),
                render: (row: Event) =>
                    row.startTime && row.endTime
                        ? `${row.startTime} - ${row.endTime}`
                        : "-",
            },
            {
                key: "recurrenceMode",
                label: t("organizer.events.fields.recurrence"),
                render: (row: Event) => (
                    <Chip
                        label={getRecurrenceModeLabel(row.recurrenceMode)}
                        size="small"
                        variant="outlined"
                    />
                ),
            },
            {
                key: "status",
                label: t("organizer.events.fields.status"),
                render: (row: Event) => (
                    <Chip
                        label={getStatusLabel(row.status)}
                        color={getStatusColor(row.status) as any}
                        size="small"
                    />
                ),
            },
        ],
        [t]
    );

    const actions = useMemo<TableAction<Event>[]>(
        () => [
            {
                label: t("common.actions.view"),
                icon: <Visibility fontSize="small" />,
                color: "info",
                onClick: (row: Event) => {
                    // TODO: Navigate to event details page
                    console.log("View event:", row.id);
                },
            },
            {
                label: t("common.actions.edit"),
                icon: <Edit fontSize="small" />,
                color: "primary",
                onClick: handleEdit,
            },
            {
                label: t("organizer.events.cancel.button"),
                icon: <Cancel fontSize="small" />,
                color: "warning",
                onClick: (row: Event) => handleCancel(row.id),
                hidden: (row: Event) => row.status === "CANCELLED" || row.status === "FINISHED",
            },
            {
                label: t("common.actions.delete"),
                icon: <Delete fontSize="small" />,
                color: "error",
                onClick: (row: Event) => handleDelete(row.id),
            },
        ],
        [t, handleEdit, handleCancel, handleDelete]
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
                event={eventModal.data}
                onClose={eventModal.closeModal}
                onSuccess={handleModalSuccess}
            />

            <ConfirmDialog
                open={confirmDialog.isOpen}
                title={t("organizer.events.delete.title")}
                message={t("organizer.events.delete.message")}
                onConfirm={handleConfirmDelete}
                onCancel={confirmDialog.closeDialog}
                isLoading={deleteEvent.isPending}
            />

            <ConfirmDialog
                open={confirmCancelDialog.isOpen}
                title={t("organizer.events.cancel.title")}
                message={t("organizer.events.cancel.message")}
                onConfirm={handleConfirmCancel}
                onCancel={confirmCancelDialog.closeDialog}
                isLoading={cancelEvent.isPending}
                severity="warning"
            />
        </>
    );
}
