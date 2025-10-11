import { Edit, Delete } from "@mui/icons-material";
import { usePaginatedFilters } from "@/shared/hooks/usePaginatedFilters";
import { useUsers } from "../hooks/useUsers";
import { BaseDataTable } from "@/components/organisms/DataTable";
import { UserFormModal } from "./UserFormModal";
import type { UserPaginationQuery } from "@/domain/user/UserPaginationQuery";
import { useModalState } from "../hooks/useModalState";
import type { User } from "@/domain/user/User";

export function UsersTable() {
    const { query, updateQuery } = usePaginatedFilters<UserPaginationQuery>();
    const { data, isLoading, refetch } = useUsers(query);

    const userModal = useModalState<User>();

    const handleSuccess = () => {
        refetch();
        userModal.closeModal();
    };

    return (
        <>
            <BaseDataTable
                data={data}
                loading={isLoading}
                onQueryChange={updateQuery}
                columns={[
                    { key: "firstName", label: "Nombre", sortable: true },
                    { key: "email", label: "Correo Electrónico", sortable: true },
                    { key: "identification", label: "Identificación" },
                    {
                        key: "role",
                        label: "Rol",
                        render: (row) => row.role?.name ?? "Sin rol",
                    },
                ]}
                actions={[
                    {
                        label: "Editar",
                        icon: <Edit fontSize="small" />,
                        color: "primary",
                        onClick: (row) => userModal.openModal(row),
                    },
                    {
                        label: "Eliminar",
                        icon: <Delete fontSize="small" />,
                        color: "error",
                        onClick: (row) => console.log("Eliminar usuario", row),
                    },
                ]}
            />

            <UserFormModal
                open={userModal.isOpen}
                initialData={userModal.data}
                onClose={userModal.closeModal}
                onSuccess={handleSuccess}
            />
        </>
    );
}
