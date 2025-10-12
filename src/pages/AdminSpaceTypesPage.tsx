import { Button } from "@mui/material";
import { AdminSection } from "@/features/admin/components/AdminSection";
import { useModalState } from "@/features/user/hooks/useModalState";
import { SpaceTypeFormModal } from "@/features/spacetype/components/SpeceTypeFormModal";
import { SpaceTypesTable } from "@/features/spacetype/components/SpaceTypesTable";
import { SpaceTypesTableFilter } from "@/features/spacetype/components/SpaceTypesTableFilter";

export default function AdminSpaceTypesPage() {
    const createSpaceTypeModal = useModalState();

    return (
        <>
            <AdminSection
                title="admin.spaceTypes.title"
                description="admin.spaceTypes.description"
                actions={
                    <Button
                        variant="contained"
                        onClick={() => createSpaceTypeModal.openModal()}
                    >
                        Crear Tipo de Espacio
                    </Button>
                }
            >
                <SpaceTypesTableFilter />
                <SpaceTypesTable />
            </AdminSection>

            <SpaceTypeFormModal
                open={createSpaceTypeModal.isOpen}
                onClose={createSpaceTypeModal.closeModal}
                onSuccess={createSpaceTypeModal.closeModal}
            />
        </>
    );
}
