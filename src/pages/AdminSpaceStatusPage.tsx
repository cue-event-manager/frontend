import { Button } from "@mui/material";
import { AdminSection } from "@/features/admin/components/AdminSection";
import { useModalState } from "@/features/user/hooks/useModalState";
import { SpaceStatusTableFilter } from "@/features/spacestatus/components/SpaceStatusTableFilter";
import { SpaceStatusTable } from "@/features/spacestatus/components/SpaceStatusTable";
import { SpaceStatusFormModal } from "@/features/spacestatus/components/SpeceStatusFormModal";

export default function AdminSpaceStatusPage() {
    const createModal = useModalState();

    return (
        <>
            <AdminSection.Root>
                <AdminSection.Header
                    title="admin.spaceStatuses.title"
                    description="admin.spaceStatuses.description"
                    actions={
                        <Button variant="contained" onClick={() => createModal.openModal()}>
                            Crear Estado de Espacio
                        </Button>
                    }
                />
                <AdminSection.Body>
                    <SpaceStatusTableFilter />
                    <SpaceStatusTable />
                </AdminSection.Body>
            </AdminSection.Root>

            <SpaceStatusFormModal
                open={createModal.isOpen}
                onClose={createModal.closeModal}
                onSuccess={createModal.closeModal}
            />
        </>
    );
}
