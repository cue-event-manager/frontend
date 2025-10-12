import { usePaginatedFilters } from "@/shared/hooks/usePaginatedFilters";
import { Edit, Delete } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useUsers } from "../hooks/useUsers";
import type { UserPaginationQuery } from "@/domain/user/UserPaginationQuery";
import { useModalState } from "../hooks/useModalState";
import { useConfirmDialog } from "@/shared/hooks/useConfirmDialog";
import type { User } from "@/domain/user/User";
import { useDeleteUser } from "../hooks/useUserDelete";
import { BaseDataTable } from "@/components/organisms/DataTable";
import { UserFormModal } from "./UserFormModal";
import type { TableAction } from "@/shared/types/DataTable";
import { ConfirmDialog } from "@/components/organisms/ConfirmDialog";

export function UsersTable() {
    const { t } = useTranslation();
    const { query, updateQuery } = usePaginatedFilters<UserPaginationQuery>();
    const { data: users, isLoading, refetch } = useUsers(query);

    const userModal = useModalState<User>();
    const confirmDialog = useConfirmDialog();
    const deleteUser = useDeleteUser();

    const refreshTable = () => refetch();

    const handleUserModalSuccess = () => {
        refreshTable();
        userModal.closeModal();
    };

    const handleDeleteConfirm = () => {
        confirmDialog.handleConfirm((userId) => {
            deleteUser.mutate(userId, {
                onSuccess: refreshTable,
            });
        });
    };

    const handleEditUser = (user: User) => userModal.openModal(user);
    const handleDeleteUser = (userId: number) => confirmDialog.openDialog(userId);

    const columns = [
        { key: "firstName", label: t("users.fields.firstName"), sortable: true },
        { key: "email", label: t("users.fields.email"), sortable: true },
        { key: "identification", label: t("users.fields.identification") },
        {
            key: "role",
            label: t("users.fields.role"),
            render: (user: User) => user.role?.name ?? t("users.noRole"),
        },
    ];

    const actions: TableAction<User>[] = [
        {
            label: t("common.actions.edit"),
            icon: <Edit fontSize="small" />,
            color: "primary",
            onClick: handleEditUser,
        },
        {
            label: t("common.actions.delete"),
            icon: <Delete fontSize="small" />,
            color: "error",
            onClick: (user: User) => handleDeleteUser(user.id),
        },
    ];

    return (
        <>
            <BaseDataTable
                data={users}
                loading={isLoading}
                columns={columns}
                actions={actions}
                onQueryChange={updateQuery}
            />

            <UserFormModal
                open={userModal.isOpen}
                initialData={userModal.data}
                onClose={userModal.closeModal}
                onSuccess={handleUserModalSuccess}
            />

            <ConfirmDialog
                open={confirmDialog.isOpen}
                title={t("users.delete.title")}
                message={t("users.delete.message")}
                confirmText={t("common.actions.delete")}
                onConfirm={handleDeleteConfirm}
                onCancel={confirmDialog.closeDialog}
                isLoading={deleteUser.isPending}
                severity="error"
            />
        </>
    );
}
