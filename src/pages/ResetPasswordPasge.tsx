import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";
import { Paper } from "@mui/material";

export default function ResetPasswordPage() {
    return (

        <Paper
            elevation={3}
            sx={{
                p: 4,
                borderRadius: 3,
            }}
        >
            <ResetPasswordForm />
        </Paper>

    );
}
