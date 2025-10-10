import { usePaginatedFilters } from "@/shared/hooks/usePaginatedFilters";
import { useUsers } from "../hooks/useUsers";
import type { UserPaginationQuery } from "@/domain/user/UserPaginationQuery";
import { BaseDataTable } from "@/components/organisms/DataTable";

export function UsersTable() {
    const { query, updateQuery } = usePaginatedFilters<UserPaginationQuery>();

    const { data, isLoading } = useUsers(query);

    return (
        <BaseDataTable
            data={
                data
            }
            loading={isLoading}
            columns={[
                { key: "firstName", label: "Nombre", sortable: true },
                { key: "email", label: "Correo Electrónico", sortable: true },
                { key: "identification", label: "Identificación" },
                {
                    key: "role", label: "Rol", render: (row) => row.role?.name ?? "Sin rol",
                },
            ]}
            actions={[]}
            onQueryChange={updateQuery}
        />
    );
}
