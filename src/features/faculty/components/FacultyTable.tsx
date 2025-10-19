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
import { useDeleteFaculty } from "../hooks/useDeleteFaculty";
import { FacultyFormModal } from "./FacultyFormModal";
import type { Faculty } from "@/domain/faculty/Faculty";
import { useFaculties } from "../hooks/useFaculties";

export function FacultyTable() {
    const { t } = useTranslation();

    const { updateQuery, data: faculty, isLoading, refetch } =
        useEntityTable<PaginationQuery, Faculty>(useFaculties);

    const facultyModal = useModalState<Faculty>();
    const confirmDialog = useConfirmDialog<number>();
    const deleteFaculty = useDeleteFaculty();

    const reloadTable = () => refetch();

    const handleModalSuccess = () => {
        reloadTable();
        facultyModal.closeModal();
    };

    const handleEdit = (faculty: Faculty) => facultyModal.openModal(faculty);
    const handleDelete = (id: number) => confirmDialog.openDialog(id);

    const handleConfirmDelete = () => {
        const id = confirmDialog.data;
        if (!id) return;

        deleteFaculty.mutate(id, {
            onSuccess: () => {
                reloadTable();
                confirmDialog.closeDialog();
            },
        });
    };

    const columns = useMemo(
        () => [
            { key: "name", label: t("admin.faculties.fields.name"), sortable: true },
            { key: "description", label: t("admin.faculties.fields.description") },
            {
                key: "createdAt",
                label: t("common.fields.createdAt"),
                render: (row: Faculty) =>
                    new Date(row.createdAt).toLocaleDateString("es-CO"),
            },
        ],
        [t]
    );

    const actions = useMemo<TableAction<Faculty>[]>(
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
                onClick: (row: Faculty) => handleDelete(row.id),
            },
        ],
        [t, handleEdit, handleDelete]
    );

    return (
        <>
            <BaseDataTable<Faculty>
                data={faculty}
                loading={isLoading}
                columns={columns}
                actions={actions}
                onQueryChange={updateQuery}
            />

            <FacultyFormModal
                open={facultyModal.isOpen}
                initialData={facultyModal.data}
                onClose={facultyModal.closeModal}
                onSuccess={handleModalSuccess}
            />

            <ConfirmDialog
                open={confirmDialog.isOpen}
                title={t("admin.faculties.delete.title")}
                message={t("admin.faculties.delete.message")}
                confirmText={t("common.actions.delete")}
                onConfirm={handleConfirmDelete}
                onCancel={confirmDialog.closeDialog}
                isLoading={deleteFaculty.isPending}
                severity="error"
            />
        </>
    );
}
