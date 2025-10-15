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
import { useDeleteCampus } from "../hooks/useDeleteCampus";
import { CampusFormModal } from "./CampusFormModal";
import type { Campus } from "@/domain/campus/Campus";
import { useCampuses } from "../hooks/useCampuses";

export function CampusTable() {
    const { t } = useTranslation();

    const { updateQuery, data: spaceResource, isLoading, refetch } =
        useEntityTable<PaginationQuery, Campus>(useCampuses);

    const spaceResourceModal = useModalState<Campus>();
    const confirmDialog = useConfirmDialog<number>();
    const deleteCampus = useDeleteCampus();

    const reloadTable = () => refetch();

    const handleModalSuccess = () => {
        reloadTable();
        spaceResourceModal.closeModal();
    };

    const handleEdit = (spaceResource: Campus) => spaceResourceModal.openModal(spaceResource);
    const handleDelete = (id: number) => confirmDialog.openDialog(id);

    const handleConfirmDelete = () => {
        const id = confirmDialog.data;
        if (!id) return;

        deleteCampus.mutate(id, {
            onSuccess: () => {
                reloadTable();
                confirmDialog.closeDialog();
            },
        });
    };

    const columns = useMemo(
        () => [
            { key: "name", label: t("admin.campuses.fields.name"), sortable: true },
            { key: "address", label: t("admin.campuses.fields.address") },
            {
                key: "createdAt",
                label: t("common.fields.createdAt"),
                render: (row: Campus) =>
                    new Date(row.createdAt).toLocaleDateString("es-CO"),
            },
        ],
        [t]
    );

    const actions = useMemo<TableAction<Campus>[]>(
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
                onClick: (row: Campus) => handleDelete(row.id),
            },
        ],
        [t, handleEdit, handleDelete]
    );

    return (
        <>
            <BaseDataTable<Campus>
                data={spaceResource}
                loading={isLoading}
                columns={columns}
                actions={actions}
                onQueryChange={updateQuery}
            />

            <CampusFormModal
                open={spaceResourceModal.isOpen}
                initialData={spaceResourceModal.data}
                onClose={spaceResourceModal.closeModal}
                onSuccess={handleModalSuccess}
            />

            <ConfirmDialog
                open={confirmDialog.isOpen}
                title={t("admin.campuses.delete.title")}
                message={t("admin.campuses.delete.message")}
                confirmText={t("common.actions.delete")}
                onConfirm={handleConfirmDelete}
                onCancel={confirmDialog.closeDialog}
                isLoading={deleteCampus.isPending}
                severity="error"
            />
        </>
    );
}
