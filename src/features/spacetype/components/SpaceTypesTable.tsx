import { usePaginatedFilters } from "@/shared/hooks/usePaginatedFilters";
import { Edit, Delete } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useSpaceTypes } from "../hooks/useSpaceTypes";
import { useConfirmDialog } from "@/shared/hooks/useConfirmDialog";
import { useDeleteSpaceType } from "../hooks/useDeleteSpaceType";
import type { SpaceType } from "@/domain/spacetype/SpaceType";
import type { TableAction } from "@/shared/types/DataTable";
import { BaseDataTable } from "@/components/organisms/DataTable";
import { ConfirmDialog } from "@/components/organisms/ConfirmDialog";
import { useModalState } from "@/features/user/hooks/useModalState";
import { SpaceTypeFormModal } from "./SpeceTypeFormModal";

export function SpaceTypesTable() {
    const { t } = useTranslation();
    const { query, updateQuery } = usePaginatedFilters();
    const { data: spaceTypes, isLoading, refetch } = useSpaceTypes(query);

    const spaceTypeModal = useModalState<SpaceType>();
    const confirmDialog = useConfirmDialog();
    const deleteSpaceType = useDeleteSpaceType();

    const refreshTable = () => refetch();

    const handleModalSuccess = () => {
        refreshTable();
        spaceTypeModal.closeModal();
    };

    const handleDeleteConfirm = () => {
        confirmDialog.handleConfirm((id) => {
            deleteSpaceType.mutate(id, { onSuccess: refreshTable });
        });
    };

    const handleEdit = (spaceType: SpaceType) => spaceTypeModal.openModal(spaceType);
    const handleDelete = (id: number) => confirmDialog.openDialog(id);

    const columns = [
        { key: "name", label: t("admin.spaceTypes.fields.name"), sortable: true },
        { key: "description", label: t("admin.spaceTypes.fields.description") },
        {
            key: "createdAt",
            label: t("common.fields.createdAt"),
            render: (row: SpaceType) =>
                new Date(row.createdAt).toLocaleDateString("es-CO"),
        },
    ];

    const actions: TableAction<SpaceType>[] = [
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
    ];

    return (
        <>
            <BaseDataTable
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
                onConfirm={handleDeleteConfirm}
                onCancel={confirmDialog.closeDialog}
                isLoading={deleteSpaceType.isPending}
                severity="error"
            />
        </>
    );
}
