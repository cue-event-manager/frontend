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
import { useAcademicPrograms } from "../hooks/useAcademicPrograms";
import { useDeleteAcademicProgram } from "../hooks/useDeleteAcademicProgram";
import { AcademicProgramFormModal } from "./AcademicProgramFormModal";
import type { AcademicProgram } from "@/domain/academicprogram/AcademicProgram";

export function AcademicProgramTable() {
    const { t } = useTranslation();

    const { updateQuery, data: spaceResource, isLoading, refetch } =
        useEntityTable<PaginationQuery, AcademicProgram>(useAcademicPrograms);

    const spaceResourceModal = useModalState<AcademicProgram>();
    const confirmDialog = useConfirmDialog<number>();
    const deleteAcademicProgram = useDeleteAcademicProgram();

    const reloadTable = () => refetch();

    const handleModalSuccess = () => {
        reloadTable();
        spaceResourceModal.closeModal();
    };

    const handleEdit = (spaceResource: AcademicProgram) => spaceResourceModal.openModal(spaceResource);
    const handleDelete = (id: number) => confirmDialog.openDialog(id);

    const handleConfirmDelete = () => {
        const id = confirmDialog.data;
        if (!id) return;

        deleteAcademicProgram.mutate(id, {
            onSuccess: () => {
                reloadTable();
                confirmDialog.closeDialog();
            },
        });
    };

    const columns = useMemo(
        () => [
            { key: "name", label: t("admin.academicPrograms.fields.name"), sortable: true },
            { key: "description", label: t("admin.academicPrograms.fields.description") },
            { key: "faculty", label: t("admin.academicPrograms.fields.faculty"), render: (row: AcademicProgram) => row.faculty.name },
            {
                key: "createdAt",
                label: t("common.fields.createdAt"),
                render: (row: AcademicProgram) =>
                    new Date(row.createdAt).toLocaleDateString("es-CO"),
            },
        ],
        [t]
    );

    const actions = useMemo<TableAction<AcademicProgram>[]>(
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
                onClick: (row: AcademicProgram) => handleDelete(row.id),
            },
        ],
        [t, handleEdit, handleDelete]
    );

    return (
        <>
            <BaseDataTable<AcademicProgram>
                data={spaceResource}
                loading={isLoading}
                columns={columns}
                actions={actions}
                onQueryChange={updateQuery}
            />

            <AcademicProgramFormModal
                open={spaceResourceModal.isOpen}
                initialData={spaceResourceModal.data}
                onClose={spaceResourceModal.closeModal}
                onSuccess={handleModalSuccess}
            />

            <ConfirmDialog
                open={confirmDialog.isOpen}
                title={t("admin.academicPrograms.delete.title")}
                message={t("admin.academicPrograms.delete.message")}
                confirmText={t("common.actions.delete")}
                onConfirm={handleConfirmDelete}
                onCancel={confirmDialog.closeDialog}
                isLoading={deleteAcademicProgram.isPending}
                severity="error"
            />
        </>
    );
}
