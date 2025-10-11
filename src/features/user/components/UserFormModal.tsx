import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { UserForm } from "./UserForm";
import type { User } from "@/domain/user/User";

interface UserFormModalProps {
  open: boolean;
  initialData?: User;
  onClose: () => void;
  onSuccess?: () => void;
}

export function UserFormModal({
  open,
  initialData,
  onClose,
  onSuccess,
}: UserFormModalProps) {
  const { t } = useTranslation();
  const isEditing = !!initialData;

  const handleSuccess = () => {
    onSuccess?.();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: "visible",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pb: 1,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          {t(
            isEditing
              ? "admin.users.editTitle"
              : "admin.users.createTitle"
          )}
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ py: 4 }}>
        <UserForm initialData={initialData} onSuccess={handleSuccess} />
      </DialogContent>

    </Dialog>
  );
}
