import { useMemo } from "react";
import { Edit, Delete } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { BaseDataTable } from "@/components/organisms/DataTable";
import { ConfirmDialog } from "@/components/organisms/ConfirmDialog";
import { SpaceTypeFormModal } from "./SpeceTypeFormModal";
import { useModalState } from "@/features/user/hooks/useModalState";
import { useConfirmDialog } from "@/shared/hooks/useConfirmDialog";
import { useDeleteSpaceType } from "../hooks/useDeleteSpaceType";
import { useSpaceTypes } from "../hooks/useSpaceTypes";
import type { TableAction } from "@/shared/types/DataTable";
import type { SpaceType } from "@/domain/spacetype/SpaceType";
import type { PaginationQuery } from "@/domain/common/PaginationQuery";
import { useEntityTable } from "@/features/user/hooks/useEntityTable";

export function SpaceTypesTable() {
    const { t } = useTranslation();

    const { updateQuery, data: spaceTypes, isLoading, refetch } =
        useEntityTable<PaginationQuery, SpaceType>(useSpaceTypes);

    const spaceTypeModal = useModalState<SpaceType>();
    const confirmDialog = useConfirmDialog<number>();
    const deleteSpaceType = useDeleteSpaceType();

    const reloadTable = () => refetch();

    const handleModalSuccess = () => {
        reloadTable();
        spaceTypeModal.closeModal();
    };

    const handleEdit = (spaceType: SpaceType) => spaceTypeModal.openModal(spaceType);
    const handleDelete = (id: number) => confirmDialog.openDialog(id);

    const handleConfirmDelete = () => {
        const id = confirmDialog.data;
        if (!id) return;

        deleteSpaceType.mutate(id, {
            onSuccess: () => {
                reloadTable();
                confirmDialog.closeDialog();
            },
        });
    };

    const columns = useMemo(
        () => [
            { key: "name", label: t("admin.spaceTypes.fields.name"), sortable: true },
            { key: "description", label: t("admin.spaceTypes.fields.description") },
            {
                key: "createdAt",
                label: t("common.fields.createdAt"),
                render: (row: SpaceType) =>
                    new Date(row.createdAt).toLocaleDateString("es-CO"),
            },
        ],
        [t]
    );

    const actions = useMemo<TableAction<SpaceType>[]>(
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
                onClick: (row: SpaceType) => handleDelete(row.id),
            },
        ],
        [t, handleEdit, handleDelete]
    );

    return (
        <>
            <BaseDataTable<SpaceType>
                data={spaceTypes}
                loading={isLoading}
                columns={columns}
                actions={actions}
                onQueryChange={updateQuery}
            />

            <SpaceTypeFormModal
                open={spaceTypeModal.isOpen}
                initialData={spaceTypeModal.data}
                onClose={spaceTypeModal.closeModal}
                onSuccess={handleModalSuccess}
            />

            <ConfirmDialog
                open={confirmDialog.isOpen}
                title={t("admin.spaceTypes.delete.title")}
                message={t("admin.spaceTypes.delete.message")}
                confirmText={t("common.actions.delete")}
                onConfirm={handleConfirmDelete}
                onCancel={confirmDialog.closeDialog}
                isLoading={deleteSpaceType.isPending}
                severity="error"
            />
        </>
    );
}
