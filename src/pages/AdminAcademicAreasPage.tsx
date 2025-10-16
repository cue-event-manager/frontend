import { Button } from "@mui/material";
import { AdminSection } from "@/features/admin/components/AdminSection";
import { useModalState } from "@/features/user/hooks/useModalState";
import { AcademicAreasTableFilter } from "@/features/academicarea/components/AcademicAreaFilter";
import { AcademicAreaTable } from "@/features/academicarea/components/AcademicAreaTable";
import { AcademicAreaFormModal } from "@/features/academicarea/components/AcademicAreaFormModal";

export default function AdminAcademicAreasPage() {
    const createModal = useModalState();

    return (
        <>
            <AdminSection.Root>
                <AdminSection.Header
                    title="admin.spaceResources.title"
                    description="admin.spaceResources.description"
                    actions={
                        <Button variant="contained" onClick={() => createModal.openModal()}>
                            Crear Área Académica
                        </Button>
                    }
                />
                <AdminSection.Body>
                    <AcademicAreasTableFilter />
                    <AcademicAreaTable />
                </AdminSection.Body>
            </AdminSection.Root>

            <AcademicAreaFormModal
                open={createModal.isOpen}
                onClose={createModal.closeModal}
                onSuccess={createModal.closeModal}
            />
        </>
    );
}
