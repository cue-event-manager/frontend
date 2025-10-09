import RecoverPasswordForm from "@/features/auth/components/RecoverPasswordForm";
import { Paper } from "@mui/material";

export default function RecoverPasswordPage() {
    return (

        <Paper
            elevation={3}
            sx={{
                p: 4,
                borderRadius: 3,
                width: "100%",
            }}
        >
            <RecoverPasswordForm />
        </Paper>
    );
}
