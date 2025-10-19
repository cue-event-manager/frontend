import { Button } from "@mui/material";
import { AdminSection } from "@/features/admin/components/AdminSection";
import { useModalState } from "@/features/user/hooks/useModalState";
import { FacultyTableFilter } from "@/features/faculty/components/FacultyTableFilter";
import { FacultyTable } from "@/features/faculty/components/FacultyTable";
import { FacultyFormModal } from "@/features/faculty/components/FacultyFormModal";

export default function AdminFacultiesPage() {
    const createModal = useModalState();

    return (
        <>
            <AdminSection.Root>
                <AdminSection.Header
                    title="admin.faculties.title"
                    description="admin.faculties.description"
                    actions={
                        <Button variant="contained" onClick={() => createModal.openModal()}>
                            Crear Facultad
                        </Button>
                    }
                />
                <AdminSection.Body>
                    <FacultyTableFilter />
                    <FacultyTable />
                </AdminSection.Body>
            </AdminSection.Root>

            <FacultyFormModal
                open={createModal.isOpen}
                onClose={createModal.closeModal}
                onSuccess={createModal.closeModal}
            />
        </>
    );
}
