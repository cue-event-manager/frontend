import { Button } from "@mui/material";
import { AdminSection } from "@/features/admin/components/AdminSection";
import { useModalState } from "@/features/user/hooks/useModalState";
import { CampusTable } from "@/features/campus/components/CampusTable";
import { CampusTableFilter } from "@/features/campus/components/CampusTableFilter";
import { CampusFormModal } from "@/features/campus/components/CampusFormModal";

export default function AdminCampusPage() {
    const createModal = useModalState();

    return (
        <>
            <AdminSection.Root>
                <AdminSection.Header
                    title="admin.campuses.title"
                    description="admin.campuses.description"
                    actions={
                        <Button variant="contained" onClick={() => createModal.openModal()}>
                            Crear Sede
                        </Button>
                    }
                />
                <AdminSection.Body>
                    <CampusTableFilter />
                    <CampusTable />
                </AdminSection.Body>
            </AdminSection.Root>

            <CampusFormModal
                open={createModal.isOpen}
                onClose={createModal.closeModal}
                onSuccess={createModal.closeModal}
            />
        </>
    );
}
