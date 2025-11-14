import { useMemo, useCallback } from "react";
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
import type { EventWithAvailabilityResponseDto } from "@/domain/event/EventWithAvailabilityResponseDto";
import UpdateEventFormModal from "./UpdateEventForm/UpdateEventFormModal";

export function EventsTable() {
    const { t } = useTranslation();

    const { updateQuery, data: events, isLoading, refetch } =
        useEntityTable<PaginationQuery, EventWithAvailabilityResponseDto>(useEvents);

    const eventModal = useModalState<Event>();
    const confirmDialog = useConfirmDialog<number>();
    const deleteEvent = useDeleteEvent();

    const reloadTable = () => refetch();

    const handleModalSuccess = () => {
        reloadTable();
        eventModal.closeModal();
    };

    const handleEdit = useCallback((event: Event) => eventModal.openModal(event), [eventModal]);
    const handleDelete = useCallback((id: number) => confirmDialog.openDialog(id), [confirmDialog]);

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
            { key: "name", label: t("admin.events.fields.name"), sortable: true, render: (row: EventWithAvailabilityResponseDto) => row.event.name },
            {
                key: "categoryName",
                label: t("admin.events.fields.category"),
                render: (row: EventWithAvailabilityResponseDto) => row.event.category.name || "-"
            },
            {
                key: "modalityName",
                label: t("admin.events.fields.modality"),
                render: (row: EventWithAvailabilityResponseDto) => row.event.modality.name || "-"
            },
            {
                key: "date",
                label: t("admin.events.fields.date"),
                render: (row: EventWithAvailabilityResponseDto) =>
                    row.event.date ? new Date(row.event.date).toLocaleDateString("es-CO") : "-",
            },
            {
                key: "startTime",
                label: t("admin.events.fields.time"),
                render: (row: EventWithAvailabilityResponseDto) =>
                    row.event.startTime && row.event.endTime
                        ? `${row.event.startTime} - ${row.event.endTime}`
                        : "-",
            },
            {
                key: "status",
                label: t("admin.events.fields.status"),
                render: (row: EventWithAvailabilityResponseDto) => (
                    <Chip
                        label={getStatusLabel(row.event.status)}
                        color={getStatusColor(row.event.status) as any}
                        size="small"
                    />
                ),
            },
            {
                key: "createdAt",
                label: t("common.fields.createdAt"),
                render: (row: EventWithAvailabilityResponseDto) =>
                    new Date(row.event.createdAt).toLocaleDateString("es-CO"),
            },
        ],
        [t]
    );

    const actions = useMemo<TableAction<EventWithAvailabilityResponseDto>[]>(
        () => [
            {
                label: t("common.actions.edit"),
                icon: <Edit fontSize="small" />,
                color: "primary",
                onClick: (row) => handleEdit(row.event),
            },
            {
                label: t("common.actions.delete"),
                icon: <Delete fontSize="small" />,
                color: "error",
                onClick: (row) => handleDelete(row.event.id),
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
