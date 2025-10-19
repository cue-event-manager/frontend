import { Button } from "@mui/material";
import { AdminSection } from "@/features/admin/components/AdminSection";
import { useModalState } from "@/features/user/hooks/useModalState";
import { AcademicProgramsTableFilter } from "@/features/academicprogram/components/AcademicProgramFilter";
import { AcademicProgramTable } from "@/features/academicprogram/components/AcademicProgramTable";
import { AcademicProgramFormModal } from "@/features/academicprogram/components/AcademicProgramFormModal";

export default function AdminAcademicProgramsPage() {
    const createModal = useModalState();

    return (
        <>
            <AdminSection.Root>
                <AdminSection.Header
                    title="admin.academicPrograms.title"
                    description="admin.academicPrograms.description"
                    actions={
                        <Button variant="contained" onClick={() => createModal.openModal()}>
                            Crear Programa Académico
                        </Button>
                    }
                />
                <AdminSection.Body>
                    <AcademicProgramsTableFilter />
                    <AcademicProgramTable />
                </AdminSection.Body>
            </AdminSection.Root>

            <AcademicProgramFormModal
                open={createModal.isOpen}
                onClose={createModal.closeModal}
                onSuccess={createModal.closeModal}
            />
        </>
    );
}
