import { Button } from "@mui/material";
import { AdminSection } from "@/features/admin/components/AdminSection";
import { UsersTable } from "@/features/user/components/UsersTable";
import { UsersTableFilter } from "@/features/user/components/UsersTableFilter";
import { UserFormModal } from "@/features/user/components/UserFormModal";
import { useModalState } from "@/features/user/hooks/useModalState";

export default function AdminUsersPage() {
    const createUserModal = useModalState();

    return (
        <>
            <AdminSection
                title="admin.users.title"
                description="admin.users.description"
                actions={
                    <Button
                        variant="contained"
                        onClick={() => createUserModal.openModal()}
                    >
                        Crear usuario
                    </Button>
                }
            >
                <UsersTableFilter />
                <UsersTable />
            </AdminSection>

            <UserFormModal
                open={createUserModal.isOpen}
                onClose={createUserModal.closeModal}
                onSuccess={createUserModal.closeModal}
            />
        </>
    );
}
