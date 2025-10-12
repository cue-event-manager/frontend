import { Button } from "@mui/material";
import { AdminSection } from "@/features/admin/components/AdminSection";
import { useModalState } from "@/features/user/hooks/useModalState";
import { SpaceResourcesTableFilter } from "@/features/spaceresource/components/SpaceResourceTableFilter";
import { SpaceResourceFormModal } from "@/features/spaceresource/components/SpeceResourceFormModal";
import { SpaceResourceTable } from "@/features/spaceresource/components/SpaceResourceTable";

export default function AdminSpaceResourcesPage() {
    const createModal = useModalState();

    return (
        <>
            <AdminSection.Root>
                <AdminSection.Header
                    title="admin.spaceResources.title"
                    description="admin.spaceResources.description"
                    actions={
                        <Button variant="contained" onClick={() => createModal.openModal()}>
                            Crear Recurso de Espacio
                        </Button>
                    }
                />
                <AdminSection.Body>
                    <SpaceResourcesTableFilter />
                    <SpaceResourceTable />
                </AdminSection.Body>
            </AdminSection.Root>

            <SpaceResourceFormModal
                open={createModal.isOpen}
                onClose={createModal.closeModal}
                onSuccess={createModal.closeModal}
            />
        </>
    );
}
