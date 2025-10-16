import { Button } from "@mui/material";
import { AdminSection } from "@/features/admin/components/AdminSection";
import { useModalState } from "@/features/user/hooks/useModalState";
import { SpacesTableFilter } from "@/features/space/components/SpaceTableFilter";
import { SpaceTable } from "@/features/space/components/SpaceTable";
import { SpaceFormModal } from "@/features/space/components/SpaceFormModal";

export default function AdminSpacesPage() {
    const createModal = useModalState();

    return (
        <>
            <AdminSection.Root>
                <AdminSection.Header
                    title="admin.spaces.title"
                    description="admin.spaces.description"
                    actions={
                        <Button variant="contained" onClick={() => createModal.openModal()}>
                            Crear Espacio
                        </Button>
                    }
                />
                <AdminSection.Body>
                    <SpacesTableFilter />
                    <SpaceTable />
                </AdminSection.Body>
            </AdminSection.Root>

            <SpaceFormModal
                open={createModal.isOpen}
                onClose={createModal.closeModal}
                onSuccess={createModal.closeModal}
            />
        </>
    );
}
