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
import { useSpaceStatuss } from "../hooks/useSpaceStatuses";
import { useDeleteSpaceStatus } from "../hooks/useDeleteSpaceStatus";
import type { SpaceStatus } from "@/domain/spacestatus/SpaceStatus";
import { SpaceStatusFormModal } from "./SpeceStatusFormModal";

export function SpaceStatusTable() {
    const { t } = useTranslation();

    const { updateQuery, data: spaceStatus, isLoading, refetch } =
        useEntityTable<PaginationQuery, SpaceStatus>(useSpaceStatuss);

    const spaceStatusModal = useModalState<SpaceStatus>();
    const confirmDialog = useConfirmDialog<number>();
    const deleteSpaceStatus = useDeleteSpaceStatus();

    const reloadTable = () => refetch();

    const handleModalSuccess = () => {
        reloadTable();
        spaceStatusModal.closeModal();
    };

    const handleEdit = (spaceStatus: SpaceStatus) => spaceStatusModal.openModal(spaceStatus);
    const handleDelete = (id: number) => confirmDialog.openDialog(id);

    const handleConfirmDelete = () => {
        const id = confirmDialog.data;
        if (!id) return;

        deleteSpaceStatus.mutate(id, {
            onSuccess: () => {
                reloadTable();
                confirmDialog.closeDialog();
            },
        });
    };

    const columns = useMemo(
        () => [
            { key: "name", label: t("admin.spaceStatuses.fields.name"), sortable: true },
            { key: "description", label: t("admin.spaceStatuses.fields.description") },
            { 
                key: "canBeReserved", 
                label: t("admin.spaceStatuses.fields.canBeReserved"),
                render: (row:SpaceStatus) => row.canBeReserved ? t("common.yes") : t("common.no") 
            },
            {
                key: "createdAt",
                label: t("common.fields.createdAt"),
                render: (row: SpaceStatus) =>
                    new Date(row.createdAt).toLocaleDateString("es-CO"),
            },
        ],
        [t]
    );

    const actions = useMemo<TableAction<SpaceStatus>[]>(
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
                onClick: (row: SpaceStatus) => handleDelete(row.id),
            },
        ],
        [t, handleEdit, handleDelete]
    );

    return (
        <>
            <BaseDataTable<SpaceStatus>
                data={spaceStatus}
                loading={isLoading}
                columns={columns}
                actions={actions}
                onQueryChange={updateQuery}
            />

            <SpaceStatusFormModal
                open={spaceStatusModal.isOpen}
                initialData={spaceStatusModal.data}
                onClose={spaceStatusModal.closeModal}
                onSuccess={handleModalSuccess}
            />

            <ConfirmDialog
                open={confirmDialog.isOpen}
                title={t("admin.spaceStatuses.delete.title")}
                message={t("admin.spaceStatuses.delete.message")}
                confirmText={t("common.actions.delete")}
                onConfirm={handleConfirmDelete}
                onCancel={confirmDialog.closeDialog}
                isLoading={deleteSpaceStatus.isPending}
                severity="error"
            />
        </>
    );
}
