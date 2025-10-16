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
import { useAcademicAreas } from "../hooks/useAcademicAreas";
import { useDeleteAcademicArea } from "../hooks/useDeleteAcademicArea";
import type { AcademicArea } from "@/domain/academicarea/AcademicArea";
import { AcademicAreaFormModal } from "./AcademicAreaFormModal";

export function AcademicAreaTable() {
    const { t } = useTranslation();

    const { updateQuery, data: spaceResource, isLoading, refetch } =
        useEntityTable<PaginationQuery, AcademicArea>(useAcademicAreas);

    const spaceResourceModal = useModalState<AcademicArea>();
    const confirmDialog = useConfirmDialog<number>();
    const deleteAcademicArea = useDeleteAcademicArea();

    const reloadTable = () => refetch();

    const handleModalSuccess = () => {
        reloadTable();
        spaceResourceModal.closeModal();
    };

    const handleEdit = (spaceResource: AcademicArea) => spaceResourceModal.openModal(spaceResource);
    const handleDelete = (id: number) => confirmDialog.openDialog(id);

    const handleConfirmDelete = () => {
        const id = confirmDialog.data;
        if (!id) return;

        deleteAcademicArea.mutate(id, {
            onSuccess: () => {
                reloadTable();
                confirmDialog.closeDialog();
            },
        });
    };

    const columns = useMemo(
        () => [
            { key: "name", label: t("admin.academicAreas.fields.name"), sortable: true },
            { key: "description", label: t("admin.academicAreas.fields.description") },
            {
                key: "createdAt",
                label: t("common.fields.createdAt"),
                render: (row: AcademicArea) =>
                    new Date(row.createdAt).toLocaleDateString("es-CO"),
            },
        ],
        [t]
    );

    const actions = useMemo<TableAction<AcademicArea>[]>(
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
                onClick: (row: AcademicArea) => handleDelete(row.id),
            },
        ],
        [t, handleEdit, handleDelete]
    );

    return (
        <>
            <BaseDataTable<AcademicArea>
                data={spaceResource}
                loading={isLoading}
                columns={columns}
                actions={actions}
                onQueryChange={updateQuery}
            />

            <AcademicAreaFormModal
                open={spaceResourceModal.isOpen}
                initialData={spaceResourceModal.data}
                onClose={spaceResourceModal.closeModal}
                onSuccess={handleModalSuccess}
            />

            <ConfirmDialog
                open={confirmDialog.isOpen}
                title={t("admin.academicAreas.delete.title")}
                message={t("admin.academicAreas.delete.message")}
                confirmText={t("common.actions.delete")}
                onConfirm={handleConfirmDelete}
                onCancel={confirmDialog.closeDialog}
                isLoading={deleteAcademicArea.isPending}
                severity="error"
            />
        </>
    );
}
