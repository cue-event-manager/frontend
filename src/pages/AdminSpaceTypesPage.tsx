import { Button } from "@mui/material";
import { AdminSection } from "@/features/admin/components/AdminSection";
import { useModalState } from "@/features/user/hooks/useModalState";
import { SpaceTypesTable } from "@/features/spacetype/components/SpaceTypesTable";
import { SpaceTypesTableFilter } from "@/features/spacetype/components/SpaceTypesTableFilter";
import { SpaceTypeFormModal } from "@/features/spacetype/components/SpeceTypeFormModal";

export default function AdminSpaceTypesPage() {
    const createModal = useModalState();

    return (
        <>
            <AdminSection.Root>
                <AdminSection.Header
                    title="admin.spaceTypes.title"
                    description="admin.spaceTypes.description"
                    actions={
                        <Button variant="contained" onClick={() => createModal.openModal()}>
                            Crear Tipo de Espacio
                        </Button>
                    }
                />
                <AdminSection.Body>
                    <SpaceTypesTableFilter />
                    <SpaceTypesTable />
                </AdminSection.Body>
            </AdminSection.Root>

            <SpaceTypeFormModal
                open={createModal.isOpen}
                onClose={createModal.closeModal}
                onSuccess={createModal.closeModal}
            />
        </>
    );
}
