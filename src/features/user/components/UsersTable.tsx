import { useMemo } from "react";
import { Edit, Delete } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { BaseDataTable } from "@/components/organisms/DataTable";
import { ConfirmDialog } from "@/components/organisms/ConfirmDialog";
import { UserFormModal } from "./UserFormModal";
import { useUsers } from "../hooks/useUsers";
import { useDeleteUser } from "../hooks/useUserDelete";
import { useModalState } from "../hooks/useModalState";
import { useConfirmDialog } from "@/shared/hooks/useConfirmDialog";
import type { TableAction } from "@/shared/types/DataTable";
import type { UserPaginationQuery } from "@/domain/user/UserPaginationQuery";
import type { User } from "@/domain/user/User";
import { useEntityTable } from "../hooks/useEntityTable";
import { ROLES } from "../constants/userRoles.constant";

export function UsersTable() {
    const { t } = useTranslation();

    const { updateQuery, data: users, isLoading, refetch } =
        useEntityTable<UserPaginationQuery, User>(useUsers);

    const userModal = useModalState<User>();
    const confirmDialog = useConfirmDialog<number>();
    const deleteUser = useDeleteUser();

    const reloadUsers = () => refetch();

    const handleUserModalSuccess = () => {
        reloadUsers();
        userModal.closeModal();
    };

    const handleEditUser = (user: User) => userModal.openModal(user);
    const handleDeleteUser = (userId: number) => confirmDialog.openDialog(userId);

    const handleConfirmDelete = async () => {
        const userId = confirmDialog.data;
        if (!userId) return;

        await deleteUser.mutate(userId, {
            onSuccess: () => {
                reloadUsers();
                confirmDialog.closeDialog();
            },
        });
    };

    const columns = useMemo(
        () => [
            { key: "firstName", label: t("users.fields.firstName"), sortable: true },
            { key: "email", label: t("users.fields.email"), sortable: true },
            { key: "identification", label: t("users.fields.identification") },
            {
                key: "role",
                label: t("users.fields.role"),
                render: (user: User) => ROLES.find(role => user.role.name == role.name)?.label ?? t("users.noRole"),
            },
        ],
        [t]
    );

    const actions = useMemo<TableAction<User>[]>(
        () => [
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
        ],
        [t, handleEditUser, handleDeleteUser]
    );


    return (
        <>
            <BaseDataTable<User>
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
                onConfirm={handleConfirmDelete}
                onCancel={confirmDialog.closeDialog}
                isLoading={deleteUser.isPending}
                severity="error"
            />
        </>
    );
}
