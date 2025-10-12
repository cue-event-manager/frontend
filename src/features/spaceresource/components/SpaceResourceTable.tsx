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
import { useSpaceResources } from "../hooks/useSpaceResources";
import { useDeleteSpaceResource } from "../hooks/useDeleteSpaceResource";
import { SpaceResourceFormModal } from "./SpeceResourceFormModal";
import type { SpaceResource } from "@/domain/spaceresource/SpaceResource";

export function SpaceResourceTable() {
    const { t } = useTranslation();

    const { updateQuery, data: spaceResource, isLoading, refetch } =
        useEntityTable<PaginationQuery, SpaceResource>(useSpaceResources);

    const spaceResourceModal = useModalState<SpaceResource>();
    const confirmDialog = useConfirmDialog<number>();
    const deleteSpaceResource = useDeleteSpaceResource();

    const reloadTable = () => refetch();

    const handleModalSuccess = () => {
        reloadTable();
        spaceResourceModal.closeModal();
    };

    const handleEdit = (spaceResource: SpaceResource) => spaceResourceModal.openModal(spaceResource);
    const handleDelete = (id: number) => confirmDialog.openDialog(id);

    const handleConfirmDelete = () => {
        const id = confirmDialog.data;
        if (!id) return;

        deleteSpaceResource.mutate(id, {
            onSuccess: () => {
                reloadTable();
                confirmDialog.closeDialog();
            },
        });
    };

    const columns = useMemo(
        () => [
            { key: "name", label: t("admin.spaceResources.fields.name"), sortable: true },
            { key: "description", label: t("admin.spaceResources.fields.description") },
            {
                key: "createdAt",
                label: t("common.fields.createdAt"),
                render: (row: SpaceResource) =>
                    new Date(row.createdAt).toLocaleDateString("es-CO"),
            },
        ],
        [t]
    );

    const actions = useMemo<TableAction<SpaceResource>[]>(
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
                onClick: (row: SpaceResource) => handleDelete(row.id),
            },
        ],
        [t, handleEdit, handleDelete]
    );

    return (
        <>
            <BaseDataTable<SpaceResource>
                data={spaceResource}
                loading={isLoading}
                columns={columns}
                actions={actions}
                onQueryChange={updateQuery}
            />

            <SpaceResourceFormModal
                open={spaceResourceModal.isOpen}
                initialData={spaceResourceModal.data}
                onClose={spaceResourceModal.closeModal}
                onSuccess={handleModalSuccess}
            />

            <ConfirmDialog
                open={confirmDialog.isOpen}
                title={t("admin.spaceResources.delete.title")}
                message={t("admin.spaceResources.delete.message")}
                confirmText={t("common.actions.delete")}
                onConfirm={handleConfirmDelete}
                onCancel={confirmDialog.closeDialog}
                isLoading={deleteSpaceResource.isPending}
                severity="error"
            />
        </>
    );
}
