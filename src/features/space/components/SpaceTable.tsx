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
import { useSpaces } from "../hooks/useSpaces";
import { useDeleteSpace } from "../hooks/useDeleteSpace";
import { SpaceFormModal } from "./SpaceFormModal";
import type { Space } from "@/domain/space/Space";
import type { SpacePaginationRequestDto } from "@/domain/space/SpacePaginationRequestDto";

export function SpaceTable() {
    const { t } = useTranslation();

    const { updateQuery, data: spaces, isLoading, refetch } = useEntityTable<PaginationQuery & SpacePaginationRequestDto, Space>(useSpaces);

    const spaceModal = useModalState<Space>();
    const confirmDialog = useConfirmDialog<number>();
    const deleteSpace = useDeleteSpace();

    const reloadTable = () => refetch();

    const handleModalSuccess = () => {
        reloadTable();
        spaceModal.closeModal();
    };

    const handleEdit = (space: Space) => spaceModal.openModal(space);
    const handleDelete = (id: number) => confirmDialog.openDialog(id);

    const handleConfirmDelete = () => {
        const id = confirmDialog.data;
        if (!id) return;

        deleteSpace.mutate(id, {
            onSuccess: () => {
                reloadTable();
                confirmDialog.closeDialog();
            },
        });
    };

    const columns = useMemo(
        () => [
            { key: "name", label: t("admin.spaces.fields.name"), sortable: true },
            {
                key: "campus",
                label: t("admin.spaces.fields.campus"),
                render: (row: Space) => row.campus?.name ?? "—",
            },
            {
                key: "type",
                label: t("admin.spaces.fields.type"),
                render: (row: Space) => row.type?.name ?? "—",
            },
            {
                key: "status",
                label: t("admin.spaces.fields.status"),
                render: (row: Space) => row.status?.name ?? "—",
            },
            {
                key: "capacity",
                label: t("admin.spaces.fields.capacity"),
                render: (row: Space) => row.capacity ?? "—",
            },
            {
                key: "createdAt",
                label: t("common.fields.createdAt"),
                render: (row: Space) =>
                    new Date(row.createdAt).toLocaleDateString("es-CO"),
            },
        ],
        [t]
    );

    const actions = useMemo<TableAction<Space>[]>(
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
                onClick: (row: Space) => handleDelete(row.id),
            },
        ],
        [t, handleEdit, handleDelete]
    );

    return (
        <>
            <BaseDataTable<Space>
                data={spaces}
                loading={isLoading}
                columns={columns}
                actions={actions}
                onQueryChange={updateQuery}
            />

            <SpaceFormModal
                open={spaceModal.isOpen}
                initialData={spaceModal.data}
                onClose={spaceModal.closeModal}
                onSuccess={handleModalSuccess}
            />

            <ConfirmDialog
                open={confirmDialog.isOpen}
                title={t("admin.spaces.delete.title")}
                message={t("admin.spaces.delete.message")}
                confirmText={t("common.actions.delete")}
                onConfirm={handleConfirmDelete}
                onCancel={confirmDialog.closeDialog}
                isLoading={deleteSpace.isPending}
                severity="error"
            />
        </>
    );
}
