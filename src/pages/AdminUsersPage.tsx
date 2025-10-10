import { AdminSection } from "@/features/admin/components/AdminSection";
import { UsersTable } from "@/features/user/components/UsersTable";
import { UsersTableFilter } from "@/features/user/components/UsersTableFilter";

export default function AdminUsersPage() {

    return (
        <AdminSection
            title="admin.users.title"
            description="admin.users.description"
        >
            <UsersTableFilter />
            <UsersTable />
        </AdminSection>
    );

}